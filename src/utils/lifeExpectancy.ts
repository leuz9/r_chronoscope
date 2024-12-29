interface LifestyleFactors {
  exerciseHoursPerWeek: number;
  sleepHoursPerDay: number;
  socialHoursPerWeek: number;
}

// Scientific constants based on research
const BASELINE_LIFE_EXPECTANCY = 72.0;
const EXERCISE_IMPACT = 0.1;
const SLEEP_OPTIMAL = 7.5;
const SLEEP_IMPACT = 0.05;
const SOCIAL_IMPACT = 0.05;

// Add randomization within reasonable bounds for time prediction
function getRandomHour(): number {
  return Math.floor(Math.random() * 24);
}

function getRandomMinute(): number {
  return Math.floor(Math.random() * 60);
}

export function calculateLifeExpectancy(
  birthDate: string | undefined,
  lifestyle: LifestyleFactors
): { 
  predictedAge: number;
  deathDate: Date | null;
  formattedDeathDateTime: string | null;
} {
  if (!birthDate) {
    return {
      predictedAge: 0,
      deathDate: null,
      formattedDeathDateTime: null
    };
  }

  let adjustment = 0;

  // Calculate lifestyle impacts
  adjustment += lifestyle.exerciseHoursPerWeek * EXERCISE_IMPACT;
  adjustment -= Math.abs(SLEEP_OPTIMAL - lifestyle.sleepHoursPerDay) * SLEEP_IMPACT;
  adjustment += lifestyle.socialHoursPerWeek * SOCIAL_IMPACT;

  const predictedAge = Math.round(BASELINE_LIFE_EXPECTANCY + adjustment);
  
  // Calculate death date and time
  const birthDateTime = new Date(birthDate);
  const deathDate = new Date(birthDateTime);
  deathDate.setFullYear(birthDateTime.getFullYear() + predictedAge);
  deathDate.setHours(getRandomHour(), getRandomMinute());

  const formattedDeathDateTime = deathDate.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return {
    predictedAge,
    deathDate,
    formattedDeathDateTime
  };
}