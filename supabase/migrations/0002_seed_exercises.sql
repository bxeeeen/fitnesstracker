-- Vorgegebene, globale Übungsliste (owner_id = null, is_custom = false).
-- Wird per Migration geseedet statt clientseitig, damit RLS keine Lücke für
-- das Anlegen "globaler" Einträge durch Nutzer öffnen muss.

insert into exercises (name, muscle_group, owner_id, is_custom) values
  ('Bankdrücken', 'Brust', null, false),
  ('Schrägbankdrücken', 'Brust', null, false),
  ('Butterfly / Pec-Deck', 'Brust', null, false),
  ('Kabelzug Fliegende', 'Brust', null, false),
  ('Dips', 'Brust', null, false),

  ('Latzug', 'Rücken', null, false),
  ('Rudern am Kabel (sitzend)', 'Rücken', null, false),
  ('Klimmzug', 'Rücken', null, false),
  ('Langhantelrudern', 'Rücken', null, false),
  ('T-Bar-Rudern', 'Rücken', null, false),
  ('Rückenstrecker', 'Rücken', null, false),

  ('Beinpresse', 'Beine', null, false),
  ('Kniebeuge', 'Beine', null, false),
  ('Beinstrecker', 'Beine', null, false),
  ('Beinbeuger', 'Beine', null, false),
  ('Wadenheben', 'Beine', null, false),
  ('Ausfallschritte', 'Beine', null, false),
  ('Hüftabduktion', 'Beine', null, false),
  ('Hüftadduktion', 'Beine', null, false),

  ('Schulterdrücken', 'Schultern', null, false),
  ('Seitheben', 'Schultern', null, false),
  ('Frontheben', 'Schultern', null, false),
  ('Face Pulls', 'Schultern', null, false),
  ('Reverse Butterfly', 'Schultern', null, false),

  ('Bizepscurls', 'Arme', null, false),
  ('Hammercurls', 'Arme', null, false),
  ('Trizepsdrücken (Kabel)', 'Arme', null, false),
  ('Trizepsdrücken über Kopf', 'Arme', null, false),

  ('Crunches', 'Bauch', null, false),
  ('Sit-ups', 'Bauch', null, false),
  ('Unterarmstütz (Plank)', 'Bauch', null, false),
  ('Beinheben hängend', 'Bauch', null, false),
  ('Kabelrotation', 'Bauch', null, false),

  ('Kreuzheben', 'Ganzkörper', null, false),
  ('Rudergerät', 'Ganzkörper', null, false),
  ('Kettlebell Swing', 'Ganzkörper', null, false)
on conflict do nothing;
