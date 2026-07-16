const BUCKETS = [
  {
    key: 'nacht',
    greeting: 'Noch wach',
    test: (h) => h >= 22 || h < 5,
    subtitles: [
      'Late-Night-Workout?',
      'Nachteule beim Training?',
      'Die Nacht ist jung, die Hanteln auch.',
      'Noch wach für einen letzten Satz?',
    ],
  },
  {
    key: 'morgen',
    greeting: 'Guten Morgen',
    test: (h) => h >= 5 && h < 11,
    subtitles: [
      'Bereit für den ersten Satz?',
      'Frühsport oder Kaffee zuerst?',
      'Der frühe Vogel hebt schwerer.',
      'Schon so früh dran? Respekt.',
    ],
  },
  {
    key: 'tag',
    greeting: 'Guten Tag',
    test: (h) => h >= 11 && h < 17,
    subtitles: [
      'Zeit für eine Trainingspause?',
      'Mittagspause optimal genutzt.',
      "Auf geht's, der Tag ruft.",
      'Ein paar Wiederholungen gefällig?',
    ],
  },
  {
    key: 'abend',
    greeting: 'Guten Abend',
    test: (h) => h >= 17 && h < 22,
    subtitles: [
      'Feierabend-Pump gefällig?',
      'Der Tag ist fast geschafft — noch eine Einheit?',
      'Zeit, die Gewichte sprechen zu lassen.',
      'Abendtraining macht den Unterschied.',
    ],
  },
]

export function getTimeBucket(date = new Date()) {
  const hour = date.getHours()
  return BUCKETS.find((b) => b.test(hour)) ?? BUCKETS[2]
}

export function getGreeting(name, date = new Date()) {
  const bucket = getTimeBucket(date)
  const subtitle = bucket.subtitles[Math.floor(Math.random() * bucket.subtitles.length)]
  return {
    greeting: name ? `${bucket.greeting}, ${name}` : bucket.greeting,
    subtitle,
  }
}
