DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY, 
  username VARCHAR (50) UNIQUE NOT NULL, 
  password VARCHAR (100) NOT NULL,
  read_posts TEXT
);



DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL, 
  username VARCHAR (50) NOT NULL, 
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);