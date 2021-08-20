CREATE TABLE cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year TEXT NOT NULL,
  kms TEXT NOT NULL,
  color TEXT NOT NULL,
  air_conditioning TEXT NOT NULL,
  number_passengers TEXT NOT NULL,
  transmission TEXT NOT NULL,
  car_img_url TEXT NOT NULL
);