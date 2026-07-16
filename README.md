# Fitnesstracker

Web-App zum Loggen von Kraftraining im Fitnessstudio. Wähle deine Geräte aus einem
vorgegebenen Übungskatalog (oder lege eigene Übungen an) und logge fortlaufend dein
trainiertes Gewicht, um deinen Fortschritt über die Zeit zu verfolgen.

## Tech-Stack

- React + Vite
- [Supabase](https://supabase.com) (Postgres-Datenbank, Auth, Row Level Security)
- Deployment über Netlify

## Setup

### 1. Supabase-Projekt anlegen

1. Auf [supabase.com](https://supabase.com) ein neues Projekt erstellen.
2. Im SQL-Editor nacheinander die Dateien aus `supabase/migrations/` ausführen:
   - `0001_init_schema.sql` (Tabellen + Row Level Security)
   - `0002_seed_exercises.sql` (vorgegebene Übungsliste)
3. Unter **Authentication → Providers → Email** die Option "Confirm email"
   deaktivieren (für ein privates Soloprojekt unnötige Reibung).
4. Unter **Project Settings → API** die `Project URL` und den `anon public` Key kopieren.

### 2. Lokale Entwicklung

```bash
npm install
cp .env.example .env.local
# .env.local mit den Werten aus Supabase befüllen
npm run dev
```

### 3. Deployment auf Netlify

1. Repository mit Netlify verbinden (Build command: `npm run build`, Publish
   directory: `dist` — bereits in `netlify.toml` hinterlegt).
2. In den Netlify **Site settings → Environment variables** die Variablen
   `VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY` setzen (gleiche Werte wie in
   `.env.local`).
3. Deploy auslösen.

## Hinweis zum anon key

Der Supabase `anon` Key ist bewusst clientseitig sichtbar — er gehört nicht committed,
aber ist unbedenklich in der gebauten App enthalten. Die eigentliche Zugriffskontrolle
übernimmt Row Level Security in der Datenbank: jeder Nutzer sieht nur den gemeinsamen
Übungskatalog sowie seine eigenen Geräte und Trainingseinträge.
