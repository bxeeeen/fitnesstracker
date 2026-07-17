import { getIsoWeekday } from './dates'

export function getTodaysSplit(trainingDays, date = new Date()) {
  const todayIso = getIsoWeekday(date)
  return trainingDays?.find((d) => d.weekday === todayIso) ?? null
}

export function getNextTrainingDay(trainingDays, date = new Date()) {
  if (!trainingDays || trainingDays.length === 0) return null
  const todayIso = getIsoWeekday(date)
  const byWeekday = new Map(trainingDays.map((d) => [d.weekday, d]))
  for (let offset = 1; offset <= 7; offset++) {
    const candidate = ((todayIso - 1 + offset) % 7) + 1
    if (byWeekday.has(candidate)) {
      return { ...byWeekday.get(candidate), weekday: candidate }
    }
  }
  return null
}
