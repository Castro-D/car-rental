CREATE TABLE cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  kms INTEGER NOT NULL,
  color TEXT NOT NULL,
  air_conditioning TEXT NOT NULL,
  number_passengers INTEGER NOT NULL,
  transmission TEXT NOT NULL,
  car_img_url TEXT NOT NULL,
  created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
  updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);