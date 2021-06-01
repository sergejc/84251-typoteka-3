CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,    
    email varchar(255) UNIQUE NOT NULL,
    password_hash varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    avatar varchar(50)
);

CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title varchar(250) NOT NULL,
    full_text varchar(1000),
    created_at timestamp DEFAULT current_timestamp,
    user_id integer NOT NULL,
    picture varchar(50),
    ads varchar(250) NOT NULL,    
    FOREIGN KEY (user_id) REFERENCES users(id)    
);

CREATE INDEX IF NOT EXISTS ON articles (title);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    category varchar(50) NOT NULL    
);

CREATE TABLE IF NOT EXISTS articles_categories (
    article_id integer,
    category_id integer,
    PRIMARY KEY (article_id, category_id),
    FOREIGN KEY (article_id) REFERENCES articles(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    full_text text NOT NULL,
    article_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    FOREIGN KEY (article_id) REFERENCES articles(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);