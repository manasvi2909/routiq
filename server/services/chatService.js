const { pool } = require('../database/init');
const { getPlantById } = require('./plantCatalog');

/**
 * Gather a complete snapshot of a user's habit data for AI context.
 * This is the single source of truth the Oracle uses to personalise every response.
 */
async function getUserContext(userId) {
  // ── 1. User profile ──────────────────────────────────────────────
  const userRes = await pool.query(
    `SELECT id, username, created_at, plants_fully_grown
     FROM users WHERE id = $1`,
    [userId]
  );
  const user = userRes.rows[0];
  if (!user) throw new Error('User not found');

  const daysSinceJoined = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / 86400000
  );

  // ── 2. All habits (active + inactive) ────────────────────────────
  const habitsRes = await pool.query(
    `SELECT id, name, description, is_active, consecutive_days,
            total_completions, growth_stage, milestones_achieved,
            is_inconsistent, selected_plant_type, current_goal,
            current_reward, habit_time, when_specifically,
            what_motivating, what_hindering, created_at,
            fully_grown_count
     FROM habits WHERE user_id = $1
     ORDER BY is_active DESC, created_at DESC`,
    [userId]
  );
  const habits = habitsRes.rows;
  const activeHabits = habits.filter(h => h.is_active);
  const inactiveHabits = habits.filter(h => !h.is_active);

  // ── 3. Logs from the last 30 days ────────────────────────────────
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const logsRes = await pool.query(
    `SELECT hl.habit_id, hl.log_date, hl.completion_percentage,
            hl.mood, hl.stress_level, hl.notes, h.name AS habit_name
     FROM habit_logs hl
     JOIN habits h ON hl.habit_id = h.id
     WHERE hl.user_id = $1 AND hl.log_date >= $2
     ORDER BY hl.log_date DESC`,
    [userId, thirtyDaysAgo.toISOString().split('T')[0]]
  );
  const logs = logsRes.rows || [];

  // ── 4. Per-habit stats (last 14 days) ────────────────────────────
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  const recentLogs = logs.filter(
    l => new Date(l.log_date) >= fourteenDaysAgo
  );

  const habitStats = {};
  for (const h of activeHabits) {
    const hLogs = recentLogs.filter(l => l.habit_id === h.id);
    const completions = hLogs.filter(l => l.completion_percentage > 0).length;
    const fullCompletions = hLogs.filter(l => l.completion_percentage === 3).length;
    const moods = hLogs.filter(l => l.mood).map(l => l.mood);
    const stressLevels = hLogs.filter(l => l.stress_level).map(l => l.stress_level);

    habitStats[h.id] = {
      name: h.name,
      loggedDays: hLogs.length,
      completions,
      fullCompletions,
      completionRate: hLogs.length > 0
        ? Math.round((completions / 14) * 100)
        : 0,
      moods,
      avgStress: stressLevels.length > 0
        ? +(stressLevels.reduce((a, b) => a + b, 0) / stressLevels.length).toFixed(1)
        : null,
      mostCommonMood: modeMood(moods),
    };
  }

  // ── 5. Overall mood & stress distribution ────────────────────────
  const allMoods = logs.filter(l => l.mood).map(l => l.mood);
  const allStress = logs.filter(l => l.stress_level).map(l => l.stress_level);
  const moodDistribution = {};
  allMoods.forEach(m => { moodDistribution[m] = (moodDistribution[m] || 0) + 1; });

  // ── 6. Day-of-week patterns ──────────────────────────────────────
  const dayOfWeekCompletions = [0, 0, 0, 0, 0, 0, 0];
  const dayOfWeekLogs = [0, 0, 0, 0, 0, 0, 0];
  logs.forEach(l => {
    const dow = new Date(l.log_date).getDay();
    dayOfWeekLogs[dow]++;
    if (l.completion_percentage > 0) dayOfWeekCompletions[dow]++;
  });
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekRates = dayNames.map((name, i) => ({
    day: name,
    rate: dayOfWeekLogs[i] > 0 ? Math.round((dayOfWeekCompletions[i] / dayOfWeekLogs[i]) * 100) : null,
  }));

  // ── 7. Stress-to-completion correlation ──────────────────────────
  const stressCompletionBuckets = { low: { completed: 0, total: 0 }, medium: { completed: 0, total: 0 }, high: { completed: 0, total: 0 } };
  logs.forEach(l => {
    if (!l.stress_level) return;
    const bucket = l.stress_level <= 2 ? 'low' : l.stress_level <= 3 ? 'medium' : 'high';
    stressCompletionBuckets[bucket].total++;
    if (l.completion_percentage > 0) stressCompletionBuckets[bucket].completed++;
  });

  // ── 8. Garden ────────────────────────────────────────────────────
  const gardenRes = await pool.query(
    `SELECT plant_type, habit_name, milestone_number, grown_at
     FROM garden_plants WHERE user_id = $1
     ORDER BY grown_at DESC`,
    [userId]
  );

  // ── 9. Build the formatted context string ────────────────────────
  return buildContextString({
    user,
    daysSinceJoined,
    activeHabits,
    inactiveHabits,
    habitStats,
    moodDistribution,
    avgStress: allStress.length > 0
      ? +(allStress.reduce((a, b) => a + b, 0) / allStress.length).toFixed(1)
      : null,
    dayOfWeekRates,
    stressCompletionBuckets,
    gardenPlants: gardenRes.rows,
    totalLogs: logs.length,
  });
}

function modeMood(moods) {
  if (moods.length === 0) return null;
  const counts = {};
  moods.forEach(m => { counts[m] = (counts[m] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function buildContextString(ctx) {
  const lines = [];

  lines.push(`=== USER PROFILE ===`);
  lines.push(`Username: ${ctx.user.username}`);
  lines.push(`Member for: ${ctx.daysSinceJoined} days`);
  lines.push(`Plants fully grown (lifetime): ${ctx.user.plants_fully_grown || 0}`);
  lines.push(`Garden collection: ${ctx.gardenPlants.length} plants`);
  lines.push(`Total log entries (last 30 days): ${ctx.totalLogs}`);
  lines.push('');

  lines.push(`=== ACTIVE HABITS (${ctx.activeHabits.length}) ===`);
  ctx.activeHabits.forEach(h => {
    const stats = ctx.habitStats[h.id] || {};
    lines.push(`- ${h.name}`);
    lines.push(`  Streak: ${h.consecutive_days || 0} consecutive days`);
    lines.push(`  Total completions: ${h.total_completions || 0}`);
    lines.push(`  14-day completion rate: ${stats.completionRate || 0}%`);
    lines.push(`  Growth stage: ${h.growth_stage || 0}, Milestones: ${h.milestones_achieved || 0}`);
    lines.push(`  Plant: ${h.selected_plant_type || 'fern'}`);
    lines.push(`  Flagged inconsistent: ${h.is_inconsistent ? 'YES' : 'no'}`);
    if (h.current_goal) lines.push(`  Current goal: ${h.current_goal}`);
    if (h.habit_time) lines.push(`  Scheduled time: ${h.habit_time}`);
    if (h.what_motivating) lines.push(`  Motivation: ${h.what_motivating}`);
    if (h.what_hindering) lines.push(`  Hindrances: ${h.what_hindering}`);
    if (stats.mostCommonMood) lines.push(`  Most common mood while logging: ${stats.mostCommonMood}`);
    if (stats.avgStress !== null) lines.push(`  Avg stress while logging: ${stats.avgStress}/5`);
  });
  lines.push('');

  if (ctx.inactiveHabits.length > 0) {
    lines.push(`=== INACTIVE / PAUSED HABITS (${ctx.inactiveHabits.length}) ===`);
    ctx.inactiveHabits.forEach(h => {
      lines.push(`- ${h.name} (total completions: ${h.total_completions || 0})`);
    });
    lines.push('');
  }

  lines.push(`=== MOOD DISTRIBUTION (last 30 days) ===`);
  Object.entries(ctx.moodDistribution).forEach(([mood, count]) => {
    lines.push(`  ${mood}: ${count} logs`);
  });
  if (ctx.avgStress !== null) {
    lines.push(`  Average stress level: ${ctx.avgStress}/5`);
  }
  lines.push('');

  lines.push(`=== DAY-OF-WEEK PATTERNS ===`);
  ctx.dayOfWeekRates.forEach(d => {
    lines.push(`  ${d.day}: ${d.rate !== null ? d.rate + '%' : 'no data'}`);
  });
  lines.push('');

  lines.push(`=== STRESS-COMPLETION CORRELATION ===`);
  Object.entries(ctx.stressCompletionBuckets).forEach(([level, data]) => {
    const rate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : null;
    lines.push(`  ${level} stress: ${rate !== null ? rate + '% completion' : 'no data'} (${data.total} logs)`);
  });
  lines.push('');

  if (ctx.gardenPlants.length > 0) {
    lines.push(`=== GARDEN COLLECTION ===`);
    ctx.gardenPlants.slice(0, 10).forEach(p => {
      lines.push(`  ${p.plant_type} from "${p.habit_name}" (milestone #${p.milestone_number})`);
    });
  }

  return lines.join('\n');
}

/**
 * Generate AI Insight Cards by analysing the user's data.
 * Icons are returned as string identifiers that the client maps to lucide icons.
 */
async function generateInsights(userId) {
  const userRes = await pool.query(
    `SELECT id, username, created_at, plants_fully_grown FROM users WHERE id = $1`,
    [userId]
  );
  const user = userRes.rows[0];
  if (!user) return [];

  const habitsRes = await pool.query(
    `SELECT * FROM habits WHERE user_id = $1 ORDER BY is_active DESC`,
    [userId]
  );
  const habits = habitsRes.rows;
  const activeHabits = habits.filter(h => h.is_active);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const logsRes = await pool.query(
    `SELECT hl.*, h.name AS habit_name
     FROM habit_logs hl
     JOIN habits h ON hl.habit_id = h.id
     WHERE hl.user_id = $1 AND hl.log_date >= $2
     ORDER BY hl.log_date DESC`,
    [userId, thirtyDaysAgo.toISOString().split('T')[0]]
  );
  const logs = logsRes.rows;

  const insights = [];

  // ── Streak champion ──────────────────────────────────────────────
  const bestStreak = [...activeHabits].sort(
    (a, b) => (b.consecutive_days || 0) - (a.consecutive_days || 0)
  )[0];
  if (bestStreak && (bestStreak.consecutive_days || 0) >= 3) {
    insights.push({
      type: 'streak',
      iconName: 'flame',
      title: 'Streak Champion',
      body: `"${bestStreak.name}" is on a ${bestStreak.consecutive_days}-day streak. This level of consistency rewires neural pathways — keep the chain alive.`,
      priority: bestStreak.consecutive_days >= 7 ? 'high' : 'medium',
    });
  }

  // ── Burnout signal ───────────────────────────────────────────────
  const recentWeekLogs = logs.filter(l => {
    const d = new Date(l.log_date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return d >= weekAgo;
  });
  const highStressLogs = recentWeekLogs.filter(l => l.stress_level >= 4);
  if (highStressLogs.length >= 3) {
    insights.push({
      type: 'burnout',
      iconName: 'alert-triangle',
      title: 'Burnout Signal Detected',
      body: `You've logged high stress (4-5) on ${highStressLogs.length} of the last 7 days. Consider reducing habit difficulty or shortening your routine temporarily.`,
      priority: 'high',
    });
  }

  // ── Stress-completion correlation ────────────────────────────────
  const lowStressLogs = logs.filter(l => l.stress_level && l.stress_level <= 2);
  const highStressAll = logs.filter(l => l.stress_level && l.stress_level >= 4);
  const lowStressCompletionRate = lowStressLogs.length > 0
    ? lowStressLogs.filter(l => l.completion_percentage > 0).length / lowStressLogs.length
    : 0;
  const highStressCompletionRate = highStressAll.length > 0
    ? highStressAll.filter(l => l.completion_percentage > 0).length / highStressAll.length
    : 0;
  if (lowStressLogs.length >= 3 && highStressAll.length >= 3) {
    const diff = Math.round((lowStressCompletionRate - highStressCompletionRate) * 100);
    if (diff > 15) {
      insights.push({
        type: 'pattern',
        iconName: 'brain',
        title: 'Stress-Performance Pattern',
        body: `Your consistency is ${diff}% higher on low-stress days. On calmer days, your habits nearly run themselves.`,
        priority: 'medium',
      });
    }
  }

  // ── Best/worst day of the week ───────────────────────────────────
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];
  const dayCompletions = [0, 0, 0, 0, 0, 0, 0];
  logs.forEach(l => {
    const dow = new Date(l.log_date).getDay();
    dayCounts[dow]++;
    if (l.completion_percentage > 0) dayCompletions[dow]++;
  });
  let bestDay = -1;
  let bestDayRate = 0;
  let worstDay = -1;
  let worstDayRate = 101;
  dayCounts.forEach((count, i) => {
    if (count >= 2) {
      const rate = dayCompletions[i] / count;
      if (rate > bestDayRate) { bestDayRate = rate; bestDay = i; }
      if (rate < worstDayRate) { worstDayRate = rate; worstDay = i; }
    }
  });
  if (bestDay >= 0) {
    insights.push({
      type: 'timing',
      iconName: 'calendar-check',
      title: 'Peak Day',
      body: `${dayNames[bestDay]}s are your most productive day at ${Math.round(bestDayRate * 100)}% completion. Plan challenging habits here.`,
      priority: 'low',
    });
  }
  if (worstDay >= 0 && worstDay !== bestDay) {
    insights.push({
      type: 'timing',
      iconName: 'moon',
      title: 'Dip Day',
      body: `${dayNames[worstDay]}s dip to ${Math.round(worstDayRate * 100)}% completion. Consider lighter routines or rest days.`,
      priority: 'low',
    });
  }

  // ── Inconsistent habit warning ───────────────────────────────────
  const inconsistentHabits = activeHabits.filter(h => h.is_inconsistent);
  if (inconsistentHabits.length > 0) {
    const names = inconsistentHabits.map(h => `"${h.name}"`).join(', ');
    insights.push({
      type: 'consistency',
      iconName: 'trending-down',
      title: 'Consistency Watch',
      body: `${names} ${inconsistentHabits.length === 1 ? 'has' : 'have'} been flagged as inconsistent. Small, daily micro-actions can rebuild momentum.`,
      priority: 'medium',
    });
  }

  // ── Emotional pattern ────────────────────────────────────────────
  const moodCounts = {};
  logs.filter(l => l.mood).forEach(l => { moodCounts[l.mood] = (moodCounts[l.mood] || 0) + 1; });
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
  if (topMood && topMood[1] >= 4) {
    insights.push({
      type: 'emotional',
      iconName: 'heart-pulse',
      title: 'Emotional Landscape',
      body: `Your dominant mood recently is "${topMood[0]}" (${topMood[1]} logs). ${topMood[0] === 'happy' || topMood[0] === 'motivated' ? 'Ride this wave — momentum is on your side.' : 'Be gentle with yourself. Consistency matters more than perfection.'}`,
      priority: 'medium',
    });
  }

  // ── Growth milestone approaching ─────────────────────────────────
  for (const h of activeHabits) {
    const growthTarget = getPlantById(h.selected_plant_type || 'fern').growthTarget || 12;
    const progress = ((h.growth_stage || 0) / growthTarget) * 100;
    if (progress >= 70 && progress < 100) {
      insights.push({
        type: 'milestone',
        iconName: 'sprout',
        title: 'Almost Bloomed',
        body: `"${h.name}" is at ${Math.round(progress)}% growth. A few more consistent days and your ${h.selected_plant_type || 'fern'} will be fully grown.`,
        priority: 'medium',
      });
    }
  }

  // ── New user nudge ───────────────────────────────────────────────
  const daysSinceJoined = Math.max(1, Math.ceil((Date.now() - new Date(user.created_at).getTime()) / 86400000));
  if (activeHabits.length === 0) {
    insights.push({
      type: 'onboarding',
      iconName: 'leaf',
      title: 'Plant Your First Seed',
      body: 'Start with one small habit — something so easy you can\'t say no. Consistency with one is worth more than ambition with five.',
      priority: 'high',
    });
  } else if (daysSinceJoined <= 7 && activeHabits.length <= 2) {
    insights.push({
      type: 'onboarding',
      iconName: 'sunrise',
      title: 'Early Days',
      body: `You're on day ${daysSinceJoined} with ${activeHabits.length} habit${activeHabits.length > 1 ? 's' : ''}. The first two weeks matter most — focus on showing up, not being perfect.`,
      priority: 'medium',
    });
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  insights.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return insights.slice(0, 6);
}

/**
 * Local Reflection Engine
 * Parses user input and responds using actual user data without an LLM.
 */
async function generateLocalResponse(userId, message, history) {
  const msg = message.toLowerCase();

  // Fetch base user data
  const habitsRes = await pool.query(
    `SELECT * FROM habits WHERE user_id = $1 ORDER BY is_active DESC`,
    [userId]
  );
  const habits = habitsRes.rows;
  const activeHabits = habits.filter(h => h.is_active);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const logsRes = await pool.query(
    `SELECT hl.*, h.name AS habit_name
     FROM habit_logs hl
     JOIN habits h ON hl.habit_id = h.id
     WHERE hl.user_id = $1 AND hl.log_date >= $2
     ORDER BY hl.log_date DESC`,
    [userId, thirtyDaysAgo.toISOString().split('T')[0]]
  );
  const logs = logsRes.rows;

  // Base conversation history analysis to track follow-ups and all previously suggested habits
  let recommendedTypesInConversation = new Set();
  let lastAssistantMessageTopic = null;

  if (Array.isArray(history)) {
    history.forEach(msg => {
      if (msg.role === 'assistant') {
        const content = msg.content.toLowerCase();
        
        // Track absolutely all recommended categories given so far in the conversation
        if (content.includes('drinking water first thing') || (content.includes('hydration') && !content.includes('discussed hydration') && !content.includes('discussed water'))) {
          recommendedTypesInConversation.add('hydration');
        }
        if (content.includes('journaling or breathing') || (content.includes('mindfulness') && !content.includes('discussed mindfulness') && !content.includes('discussed journal'))) {
          recommendedTypesInConversation.add('mindfulness');
        }
        if (content.includes('10-minute walk') || (content.includes('movement') && !content.includes('discussed movement') && !content.includes('discussed walk'))) {
          recommendedTypesInConversation.add('movement');
        }
        if (content.includes('evening reflection')) {
          recommendedTypesInConversation.add('reflection');
        }

        // Identify last assistant message topic
        if (content.includes('burnout') || content.includes('stress') || content.includes('exhausted')) {
          lastAssistantMessageTopic = 'burnout';
        } else if (content.includes('productive') || content.includes('peak') || content.includes('completion rate')) {
          lastAssistantMessageTopic = 'timing';
        } else if (content.includes('consistency') || content.includes('struggling') || content.includes('falling off')) {
          lastAssistantMessageTopic = 'consistency';
        } else if (content.includes('mood') || content.includes('emotion') || content.includes('feeling')) {
          lastAssistantMessageTopic = 'mood';
        } else if (content.includes('benefit from adding') || content.includes('new habit') || content.includes('recommendation') || content.includes('add') || content.includes('complements') || content.includes('excellent addition')) {
          lastAssistantMessageTopic = 'recommend';
        } else if (content.includes('garden') || content.includes('plant') || content.includes('bloom')) {
          lastAssistantMessageTopic = 'garden';
        }
      }
    });
  }

  // 0. DETECT "ANYTHING ELSE" OR "OTHER THAN..." FOLLOW-UPS
  const isFollowUp = msg.match(/(anything else|other|another|else|more|something else|recommend something)/);

  if (isFollowUp) {
    const names = activeHabits.map(h => h.name.toLowerCase());
    
    // Build possible suggestions
    const suggestions = [];
    suggestions.push({
      type: 'hydration',
      text: 'a hydration habit (like drinking water first thing in the morning)'
    });
    suggestions.push({
      type: 'mindfulness',
      text: 'a mindfulness habit (like 2 minutes of journaling or breathing)'
    });
    suggestions.push({
      type: 'movement',
      text: 'a light movement habit (like a 10-minute walk or morning stretch)'
    });
    suggestions.push({
      type: 'reflection',
      text: 'a brief evening reflection to close out your day'
    });

    // Determine context
    if (lastAssistantMessageTopic === 'recommend' || msg.match(/(habit|add|complement)/)) {
      let filteredSuggestions = suggestions.filter(s => {
        if (s.type === 'hydration') return !names.some(n => n.includes('water') || n.includes('hydrate'));
        if (s.type === 'mindfulness') return !names.some(n => n.includes('journal') || n.includes('meditate') || n.includes('breath') || n.includes('mindful'));
        if (s.type === 'movement') return !names.some(n => n.includes('walk') || n.includes('move') || n.includes('stretch') || n.includes('workout'));
        return true; // reflection
      });

      // Exclude anything we have ALREADY recommended anywhere in this conversation
      filteredSuggestions = filteredSuggestions.filter(s => !recommendedTypesInConversation.has(s.type));

      // Exclude based on explicit negation (e.g. "other than hydration")
      if (msg.includes('hydration') || msg.includes('water')) {
        filteredSuggestions = filteredSuggestions.filter(s => s.type !== 'hydration');
      }
      if (msg.includes('mindfulness') || msg.includes('journal') || msg.includes('breath') || msg.includes('meditat')) {
        filteredSuggestions = filteredSuggestions.filter(s => s.type !== 'mindfulness');
      }
      if (msg.includes('movement') || msg.includes('walk') || msg.includes('stretch') || msg.includes('workout')) {
        filteredSuggestions = filteredSuggestions.filter(s => s.type !== 'movement');
      }

      if (filteredSuggestions.length === 0) {
        // Fall back to any suggestion not recommended in the very last step
        const lastRecommended = Array.from(recommendedTypesInConversation).pop();
        filteredSuggestions = suggestions.filter(s => s.type !== lastRecommended);
      }

      const selectedSuggestion = filteredSuggestions[0] || suggestions[3];

      // Build a friendly text listing what we already discussed
      let discussedList = Array.from(recommendedTypesInConversation).map(t => {
        if (t === 'hydration') return 'hydration';
        if (t === 'mindfulness') return 'mindfulness';
        if (t === 'movement') return 'movement';
        return 'reflection';
      }).join(' and ');

      const discussedText = discussedList ? `we already discussed ${discussedList}` : 'that';
      return `Certainly! Since ${discussedText}, another excellent addition would be **${selectedSuggestion.text}**.\n\nAdding habits sequentially ensures they stick. Try doing this for just a few days before scaling it up!`;
    }

    if (lastAssistantMessageTopic === 'timing') {
      return `To build on your schedule patterns: try keeping your habits pinned to a "time anchor" rather than a strict clock time. For example, doing your morning stretch "immediately after pouring coffee" is much more reliable than trying to do it at exactly "08:00 AM".`;
    }

    if (lastAssistantMessageTopic === 'burnout') {
      return `In addition to reducing habit difficulty, another key burnout prevention technique is **intentional rest days**. You can pause your habit sequence in the settings without breaking your vine streak, giving your mind a guilt-free space to recover.`;
    }

    if (lastAssistantMessageTopic === 'consistency') {
      return `Besides reducing habit size, you can also leverage **habit tracking visibility**. Keep a physical journal, place a sticky note on your mirror, or check your RoutiQ garden daily. The visual progress of seeing your plants grow reinforces your neural identity of being a consistent person.`;
    }
  }

  // 1. BURNOUT / STRESS
  if (msg.match(/(burnout|stress|exhausted|tired|overwhelmed|too much)/)) {
    const recentWeekLogs = logs.filter(l => new Date(l.log_date) >= new Date(Date.now() - 7 * 86400000));
    const highStressLogs = recentWeekLogs.filter(l => l.stress_level >= 4);
    
    if (highStressLogs.length >= 3) {
      return `I notice you've logged high stress (4 or 5) on ${highStressLogs.length} days this past week.\n\n*Burnout isn't a failure of willpower, it's a signal from your body.* When stress is this high, your consistency naturally drops. I strongly suggest scaling back your habits right now. Can you reduce the difficulty or time commitment of your hardest habit just for the next few days?`;
    } else if (highStressLogs.length > 0) {
      return `You've had a few high-stress days recently, but you aren't showing severe signs of burnout yet.\n\nHowever, it's good you're checking in. If you feel overwhelmed, remember that showing up for 2 minutes is better than skipping entirely. How are you feeling today?`;
    } else {
      return `Your recent logs don't show prolonged high stress, which is wonderful.\n\nHowever, if you are feeling exhausted, please listen to your body. Routines should support you, not drain you. It's perfectly okay to take a rest day to recharge.`;
    }
  }

  // 2. TIMING / PRODUCTIVITY / PEAK
  if (msg.match(/(when|time|productive|peak|best day|worst day|dip)/)) {
    if (logs.length < 5) return `I need a few more days of data before I can find reliable patterns in your schedule. Keep logging, and ask me again next week!`;
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    const dayCompletions = [0, 0, 0, 0, 0, 0, 0];
    logs.forEach(l => {
      const dow = new Date(l.log_date).getDay();
      dayCounts[dow]++;
      if (l.completion_percentage > 0) dayCompletions[dow]++;
    });
    
    let bestDay = -1; let bestDayRate = 0;
    let worstDay = -1; let worstDayRate = 101;
    dayCounts.forEach((count, i) => {
      if (count >= 2) {
        const rate = dayCompletions[i] / count;
        if (rate > bestDayRate) { bestDayRate = rate; bestDay = i; }
        if (rate < worstDayRate) { worstDayRate = rate; worstDay = i; }
      }
    });

    if (bestDay >= 0) {
      let res = `Based on your logs over the last 30 days, **${dayNames[bestDay]}s** are your most productive days, with a ${Math.round(bestDayRate * 100)}% completion rate.\n\nIf you want to tackle a difficult habit, plan it for ${dayNames[bestDay]}.`;
      if (worstDay >= 0 && worstDay !== bestDay && worstDayRate < 0.6) {
        res += `\n\nOn the flip side, your consistency drops to ${Math.round(worstDayRate * 100)}% on **${dayNames[worstDay]}s**. You might want to schedule lighter routines or rest days then.`;
      }
      return res;
    } else {
      return `Your completions are fairly balanced across the week right now. No extreme peaks or dips. Keep logging, and patterns will start to emerge.`;
    }
  }

  // 3. CONSISTENCY / FALLING OFF
  if (msg.match(/(consistency|consistent|lose consistency|inconsistent|falling off|off track|struggling)/)) {
    const inconsistent = activeHabits.filter(h => h.is_inconsistent);
    
    let response = `Losing consistency usually happens when a habit's difficulty exceeds our motivation on a given day. We rely too much on feeling "ready" instead of making the action effortless.\n\n`;
    
    if (inconsistent.length > 0) {
      response += `I notice you've been struggling specifically with **${inconsistent.map(h => h.name).join(', ')}**.\n\n`;
      response += `Instead of trying to force it tomorrow, try scaling it down drastically. If it's reading for 30 minutes, change it to reading 1 page. Can you make it so easy you can't say no?`;
    } else {
      response += `Right now, none of your active habits are critically inconsistent. You're actually doing quite well! But if you feel like you're slipping, remember to focus on *starting* rather than finishing.`;
    }
    
    // Check stress correlation
    const lowStressLogs = logs.filter(l => l.stress_level && l.stress_level <= 2);
    const highStressAll = logs.filter(l => l.stress_level && l.stress_level >= 4);
    if (lowStressLogs.length > 0 && highStressAll.length > 0) {
      const lRate = lowStressLogs.filter(l => l.completion_percentage > 0).length / lowStressLogs.length;
      const hRate = highStressAll.filter(l => l.completion_percentage > 0).length / highStressAll.length;
      if (lRate - hRate > 0.2) {
        response += `\n\nAlso, your data shows your consistency drops by ${Math.round((lRate - hRate) * 100)}% on high-stress days. Protect your energy when you're stressed.`;
      }
    }
    return response;
  }

  // 4. MOOD / EMOTION / PATTERNS
  if (msg.match(/(mood|emotion|feeling|pattern|notice)/)) {
    const moodCounts = {};
    logs.filter(l => l.mood).forEach(l => { moodCounts[l.mood] = (moodCounts[l.mood] || 0) + 1; });
    const sortedMoods = Object.entries(moodCounts).sort((a, b) => b[1] - a[1]);
    const topMood = sortedMoods[0];

    if (!topMood) return `You haven't logged enough mood data yet. When you complete habits, try selecting an emotion so I can track how your routines affect your headspace.`;

    let response = `Your dominant mood recently is **"${topMood[0]}"** (${topMood[1]} logs in the last 30 days).\n\n`;
    
    if (topMood[0] === 'happy' || topMood[0] === 'motivated' || topMood[0] === 'calm') {
      response += `Your routines seem to be grounding you and providing positive momentum. This is a great time to lean into your practice.`;
    } else {
      response += `Since you've been feeling ${topMood[0]} frequently, be gentle with yourself. Focus on small, grounding routines rather than ambitious goals right now. Consistency matters more than perfection.`;
    }
    return response;
  }

  // 5. NEW HABIT / ADD / COMPLEMENT
  if (msg.match(/(complement|next|add|new habit|what should i do|recommend)/)) {
    if (activeHabits.length === 0) {
      return `You don't have any active habits yet! I'd recommend starting with something foundational and small, like **Drinking a glass of water every morning** or **2 minutes of deep breathing**.`;
    } else if (activeHabits.length >= 5) {
      return `You already have ${activeHabits.length} active habits. Adding more right now might dilute your focus. I'd recommend solidifying your current routine until your plants are fully grown before adding anything new.`;
    } else {
      const names = activeHabits.map(h => h.name.toLowerCase());
      let suggestion = '';
      
      // Basic heuristic complementarity
      if (!names.some(n => n.includes('water') || n.includes('hydrate'))) {
        suggestion = "a hydration habit (like drinking water first thing in the morning)";
      } else if (!names.some(n => n.includes('journal') || n.includes('meditate') || n.includes('breath'))) {
        suggestion = "a mindfulness habit (like 2 minutes of journaling or breathing)";
      } else if (!names.some(n => n.includes('walk') || n.includes('move') || n.includes('stretch') || n.includes('workout'))) {
        suggestion = "a light movement habit (like a 10-minute walk or morning stretch)";
      } else {
        suggestion = "a brief evening reflection to close out your day";
      }

      return `Looking at your current routine, you might benefit from adding **${suggestion}**.\n\nHowever, only add it if you feel completely confident you can do it on your worst days. Stack it directly onto one of your existing habits so it's easier to remember.`;
    }
  }

  // 6. GARDEN / PLANTS / GROWTH
  if (msg.match(/(plant|garden|grow|seed|bloom)/)) {
    const growing = activeHabits.filter(h => h.growth_stage > 0);
    if (growing.length === 0) return `You don't have any plants actively growing right now. Start logging your habits consistently to see your seeds sprout!`;
    
    const closest = [...growing].sort((a, b) => b.growth_stage - a.growth_stage)[0];
    const progress = Math.round((closest.growth_stage / 12) * 100);
    
    return `Your garden is responding to your consistency.\n\nYour habit **"${closest.name}"** is at ${progress}% growth. A few more consistent days and your ${closest.selected_plant_type || 'fern'} will fully bloom. Keep nourishing it with your daily logs.`;
  }

  // 9. HABIT STACKING & CUES
  if (msg.match(/(stack|anchor|combine|link|cue|trigger)/)) {
    return `**Habit Stacking** is one of the most powerful ways to build consistency. The formula is simple:\n\n> *\"After [Current Habit], I will [New Habit].\"*\n\nInstead of tying your habits to a strict clock time (which is easily derailed), anchor them to a highly reliable time-independent cue that already happens without fail. For example:\n- *\"After I pour my morning coffee, I will open my book and read 1 page.\"*\n- *\"After I close my laptop for the day, I will put on my sneakers and stretch.\"*\n\nWhat is a daily anchor you can use to trigger your current routines?`;
  }

  // 10. HABIT LOOP (CUE, CRAVING, RESPONSE, REWARD)
  if (msg.match(/(loop|craving|response|reward|behavior|james clear|atomic)/)) {
    return `The science of behavior change relies on the **4-Stage Habit Loop**:\n\n1. **Cue**: Make it obvious. (e.g. Leave your journal directly on your pillow).\n2. **Craving**: Make it attractive. (e.g. Pair a difficult habit with something you love, like listening to your favorite podcast only while walking).\n3. **Response**: Make it easy. (e.g. Scale your goals down to a "2-Minute Version").\n4. **Reward**: Make it satisfying. (e.g. Watching your RoutiQ plants grow stage-by-stage is a built-in visual dopamine hit!).\n\nWhich stage of the loop do you feel is currently the weakest in your routine?`;
  }

  // 11. IDENTITY-BASED HABITS
  if (msg.match(/(identity|who i am|self-image|mindset|vibe|believe|person)/)) {
    return `Most people focus on *outcomes* (e.g. \"I want to read 20 books\"). Successful people focus on **Identity** (e.g. \"I want to become a reader\").\n\nYour habits are how you embody your identity. Every single time you log a habit on RoutiQ, you aren't just checking off a chore—you are **casting a vote** for the type of person you want to become. One page of reading casts a vote for being a reader. 2 minutes of stretching casts a vote for being a healthy person.\n\nWho is the person you are casting votes for today?`;
  }

  // 12. FRICTION & ENVIRONMENT DESIGN
  if (msg.match(/(environment|friction|easy|hard|room|setup|obstacle|space)/)) {
    return `In habit formation, **environment design beats willpower every time**.\n\nYour brain is wired to conserve energy, meaning it naturally takes the path of least resistance. To succeed:\n- **Reduce friction for good habits**: Lay out your exercise clothes the night before, fill your water bottle and put it on your desk, or leave your book open.\n- **Increase friction for bad habits**: Unplug the TV after use, put your phone in another room while working, or delete distracting apps.\n\nHow can you design your physical room or workspace to make your habits effortless?`;
  }

  // 13. KEYSTONE HABITS
  if (msg.match(/(keystone|foundational|core habit|anchor habit)/)) {
    return `A **Keystone Habit** is a foundational routine that naturally triggers a positive domino effect in other areas of your life. They don't just change one behavior; they shift your entire daily energy.\n\nCommon keystone habits include:\n- **Regular exercise**: Naturally leads to better eating habits, improved sleep, and less stress.\n- **Daily journaling**: Boosts self-awareness, reduces anxiety, and keeps you focused.\n- **Sleep routine**: Directly increases your emotional resilience and next-day willpower.\n\nAre there any keystone habits you are currently cultivating?`;
  }

  // 14. MOTIVATION VS DISCIPLINE
  if (msg.match(/(motivation|discipline|willpower|lazy|don't feel like|cannot start|procrastinate)/)) {
    return `Relying on motivation is a trap. Motivation is an emotion—it rises and falls with your mood, energy, and stress level. If you only practice your habits when you \"feel motivated\", your consistency will be erratic.\n\n**Discipline is what carries you when motivation fails.** To build discipline:\n- **Build systems, not goals**: *\"You do not rise to the level of your goals. You fall to the level of your systems.\"*\n- **The 2-Minute Rule**: When you don't feel like doing it, promise yourself to do it for just 120 seconds. Once you start, momentum usually takes over.\n\nLet's keep showing up, even for 2 minutes, to nourish your plants!`;
  }

  // 15. BREAKING BAD HABITS
  if (msg.match(/(bad habit|break|stop|quit|remove|eliminate|distract|drinking|alcohol|beer|wine|liquor|doomscroll|scroll|phone|screen|social media|instagram|tiktok|procrastinat|lazy|postpone|delay|overeat|junk food|sugar|eating|snack|binge|nail|bite|biting|pick|smoking|nicotine|vape|vaping|cigarette|sleeping late|late night|sleep|midnight|stay up|caffeine|coffee)/)) {
    let specificAdvice = '';
    
    if (msg.match(/(doomscroll|scroll|phone|screen|social media|instagram|tiktok)/)) {
      specificAdvice = `### 📱 Action Plan for Doomscrolling & Screen Addiction:\n` +
        `- **Make it Invisible**: Charge your phone in another room overnight. Do not touch it for the first 30 minutes after waking up.\n` +
        `- **Make it Difficult**: Turn your screen to **Grayscale mode**. Removing the bright, dopamine-inducing colors instantly makes apps like Instagram or TikTok incredibly boring.\n` +
        `- **Make it Unsatisfying**: Set strict app timers, or have a friend set a passcode you don't know for social media access.`;
    } else if (msg.match(/(procrastinat|lazy|postpone|delay)/)) {
      specificAdvice = `### ⏳ Action Plan for Procrastination & Delay:\n` +
        `- **Make it Easy**: Use the **2-Minute Rule**. If you are procrastinating on a task, commit to doing just 2 minutes of it (e.g. open the file and write 1 sentence). Starting is 90% of the battle.\n` +
        `- **Make it Obvious**: Lay out your work materials or open your browser tabs the night before so there is zero friction when you sit down.\n` +
        `- **Make it Satisfying**: Pair the task with an immediate micro-reward, or log your progress visually here on RoutiQ.`;
    } else if (msg.match(/(overeat|junk food|sugar|eating|snack|binge)/)) {
      specificAdvice = `### 🍩 Action Plan for Overeating & Sugar Cravings:\n` +
        `- **Make it Invisible**: Out of sight, out of mind. Do not buy junk food or keep snacks on your desk. Put healthy alternatives (like fruit or nuts) in plain sight.\n` +
        `- **Make it Difficult**: Never eat directly out of the box or bag. Pre-portion snacks into small bowls and store the rest back in the pantry.\n` +
        `- **Make it Unattractive**: Drink a large glass of water first. Often, our brain confuses thirst or mild boredom with a craving for sugar.`;
    } else if (msg.match(/(nail|bite|biting|pick)/)) {
      specificAdvice = `### 💅 Action Plan for Biting Nails & Skin Picking:\n` +
        `- **Make it Invisible/Difficult**: Apply bitter-tasting nail polish, or wear thin gloves/bandages on your target fingers to block the physical trigger.\n` +
        `- **Make it Obvious**: Track when you do it. Place a rubber band on your wrist and gently snap it when you find yourself biting to bring awareness to the subconscious act.\n` +
        `- **Make it Easy**: Keep a fidget toy, worry stone, or stress ball in your hands when sitting idle or watching TV.`;
    } else if (msg.match(/(smoking|nicotine|vape|vaping|cigarette)/)) {
      specificAdvice = `### 🚬 Action Plan for Smoking & Vaping:\n` +
        `- **Make it Invisible**: Throw away all lighters, ashtrays, and vape chargers. Avoid your usual "smoking spots" entirely.\n` +
        `- **Make it Difficult**: Increase the friction. Make your car or room a strict smoke-free zone so you have to walk far outside to do it.\n` +
        `- **Make it Easy (Alternative)**: Keep mints, sugar-free gum, or cinnamon toothpicks nearby to satisfy the oral fixation when a craving hits.`;
    } else if (msg.match(/(drinking|alcohol|beer|wine|liquor)/)) {
      specificAdvice = `### 🍷 Action Plan for Drinking Alcohol:\n` +
        `- **Make it Invisible**: Remove all alcohol from your home cabinet. Put sparkling water or premium non-alcoholic sodas at eye-level in your fridge.\n` +
        `- **Make it Difficult**: When going out, make a commitment to order a club soda with lime *first* before ordering any alcohol. Often, holding a glass satisfies the social cue.\n` +
        `- **Make it Unattractive**: Calculate how much money and deep sleep you save by skipping alcohol for a week, and read that list when cravings hit.`;
    } else if (msg.match(/(sleeping late|late night|sleep|midnight|stay up)/)) {
      specificAdvice = `### 🌙 Action Plan for Sleeping Late & Stay-Up Habits:\n` +
        `- **Make it Obvious**: Set a "Wind-Down Alarm" 1 hour before bed. When it goes off, it is your cue to turn off all screens and put on dim lighting.\n` +
        `- **Make it Invisible**: Leave your phone charger across the room. Do not allow screens in the bed.\n` +
        `- **Make it Easy**: Pick a relaxing, low-energy activity (like reading a physical book or stretching) to bridge the gap between screens and sleep.`;
    } else if (msg.match(/(caffeine|coffee|energy drink)/)) {
      specificAdvice = `### ☕ Action Plan for Excess Caffeine Consumption:\n` +
        `- **Make it Difficult**: Set a strict "Caffeine Curfew" at 12:00 PM. After noon, only decaf, herbal teas, or water are allowed.\n` +
        `- **Make it Easy**: Switch the morning second-cup routine to a high-quality decaf coffee or mushroom elixir that tastes identical but has zero jittery crashes.\n` +
        `- **Make it Satisfying**: Notice how much better and deeper your sleep is on days you respect your caffeine curfew.`;
    }

    let response = `To break an unwanted or **bad habit**, we invert the 4 stages of behavior change:\n\n` +
      `1. **Invert the Cue**: Make it *invisible*. (Remove triggers from sight).\n` +
      `2. **Invert the Craving**: Make it *unattractive*. (Reframe your mindset; focus on the cost of the habit).\n` +
      `3. **Invert the Response**: Make it *difficult*. (Increase friction, e.g. put timers on apps, hide temptations).\n` +
      `4. **Invert the Reward**: Make it *unsatisfying*. (Create a habit contract or accountability metric).\n\n`;

    if (specificAdvice) {
      response += specificAdvice + `\n\nRemember: **You don't eliminate a bad habit, you replace it.** Try substituting the craving's trigger with one of your healthy RoutiQ habits!`;
    } else {
      response += `What is one bad habit you are currently trying to weed out of your daily routine? Let me know, and I will give you a highly specific action plan for it!`;
    }
    
    return response;
  }

  // 16. HABIT TRACKING & VISUAL STREAKS
  if (msg.match(/(track|view|visual|calendar|streak|chart|history)/)) {
    return `**Visual habit tracking** is highly effective because it leverages three psychological triggers:\n\n1. **It is Obvious**: Looking at your RoutiQ garden or registry makes your progress immediately clear.\n2. **It is Attractive**: Watching your plants transition from tiny seeds to full blooms is intrinsically motivating.\n3. **It is Satisfying**: Seeing your streak counter (the *Longest Vine*) increment feels like a rewarding win.\n\nYour only job on tough days is simple: **Don't break the chain!** Even if you complete a habit late or scale it down, logging it keeps the chain alive.`;
  }

  // 7. GREETINGS
  if (msg.match(/^(hi|hello|hey|greetings|morning|evening)$/)) {
    return `Hello. I am the Oracle, your reflection companion.\n\nI'm observing your habit patterns, stress levels, and consistency. How are you feeling about your routines today?`;
  }

  // 8. ONBOARDING / EARLY DAYS
  if (msg.match(/(early days|first seed|onboarding|start|beginning)/)) {
    const daysSinceJoined = Math.max(1, Math.ceil((Date.now() - new Date(user.created_at).getTime()) / 86400000));
    return `You are currently on Day ${daysSinceJoined} of your journey with RoutIQ.\n\nIn these early days, the most important metric is simply *showing up*. Don't worry about being perfect, and don't worry if your plant growth seems slow. The roots are forming beneath the surface.\n\nHow is your current routine feeling? Is there anything you'd like to adjust to make it easier?`;
  }

  // FALLBACK
  return `I am focused specifically on analyzing your habit data, stress patterns, and consistency.\n\nCould you rephrase your question? Try asking me about:\n- Your consistency patterns\n- Signs of burnout\n- Your most productive days\n- What habit to add next`;
}

module.exports = { getUserContext, generateInsights, generateLocalResponse };
