\c utilitybox;

DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "refresh_tokens";

-- create user table and admin account
CREATE TABLE "users"
(
    id       SERIAL PRIMARY KEY,
    email    varchar(50),
    username varchar(50),
    password varchar(512)
);
INSERT INTO "users" (email, username, password)
VALUES ('demo@utilitybox.com', 'demo', '$2a$10$YvbTo4JgHfM8WkFVoIZffOPoLKoMDFbBWKFXGUZRxjm/Ad39xFRdi');

-- create refresh token table
CREATE TABLE "refresh_tokens"
(
    id          SERIAL PRIMARY KEY,
    user_id     int,
    token       varchar(256),
    expiry_date timestamp
);
ALTER TABLE refresh_tokens
    ADD CONSTRAINT fk_refresh_tokens_to_users FOREIGN KEY (user_id) REFERENCES users (id);

-- create application table
CREATE TABLE "applications"
(
    id            SERIAL PRIMARY KEY,
    name          varchar(50),
    description   varchar(1024),
    create_date   timestamp,
    remote_url    varchar(256),
    remote_scope  varchar(256),
    remote_module varchar(256)
);
INSERT INTO "applications" (name, description, remote_url, remote_scope, remote_module)
VALUES
    (
        'Json Formatter',
        'Easily format and compare JSON. Input, beautify, and compare two JSON snippets. Cross-platform integration, history storage, result sharing. Streamlining JSON work for quick and convenient handling',
        'https://s3.amazonaws.com/utinitybox.bucket/remote-apps/json-formatter/dist',
        'jsonFormatter',
        './App'
   ),
   (
        'Video Downloader',
        'Effortlessly download your favorite videos from various online platforms with the Video Downloader app. Seamlessly navigate through a user-friendly interface that supports a wide range of video formats. Simply paste the video URL, choose your preferred quality, and let the application handle the rest. Enjoy the convenience of offline viewing by saving videos directly to your device. Stay organized with built-in history storage and easily manage your downloaded content. The Video Downloader is your go-to tool for hassle-free video access, providing a streamlined and efficient way to build your offline video library.',
        null,
        null,
        null
   );

