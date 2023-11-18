\c tech-practice;

DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "refresh_tokens";

CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    email varchar(50),
    username varchar(50),
    password varchar(512)
);

CREATE TABLE "refresh_tokens" (
    id SERIAL PRIMARY KEY,
    user_id int,
    token varchar(256),
    expiry_date timestamp
);

ALTER TABLE refresh_tokens ADD CONSTRAINT fk_refresh_tokens_to_users FOREIGN KEY (user_id) REFERENCES users (id);

INSERT INTO "users" (email, username, password)
VALUES ('demo@nimble.com', 'demo', '$2a$10$YvbTo4JgHfM8WkFVoIZffOPoLKoMDFbBWKFXGUZRxjm/Ad39xFRdi');