export function formatDateShort(isoDate) {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year.slice(2)}`
}

export function formatTimeShort(date = new Date()) {
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

// ISO-8601 Wochentag: 1 = Montag ... 7 = Sonntag (JS Date.getDay() ist 0=Sonntag..6=Samstag).
export function getIsoWeekday(date = new Date()) {
  return ((date.getDay() + 6) % 7) + 1
}

export const WEEKDAY_LABELS_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
export const WEEKDAY_LABELS_FULL = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag',
]
