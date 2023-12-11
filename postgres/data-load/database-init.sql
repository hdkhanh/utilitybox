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
        'Regular Expression Tester',
        'Perfect your regular expressions effortlessly with our tester. Quickly validate and fine-tune patterns, visualize matches, and troubleshoot with ease. Real-time feedback, match highlighting, and group extraction make crafting and debugging a breeze. Simplify your regex workflow with UtilityBox''s intuitive Regular Expression Tester.',
        null,
        null,
        null
    ),
    (
        'Date and Time Utilities',
        'Effortlessly manage date and time in your projects with UtilityBox''s Date and Time Utilities. Format, parse, and calculate dates with precision. Simplify time-related operations, handle different time zones, and ensure your applications run seamlessly with these essential tools. Streamline your date and time handling tasks efficiently in one central hub.',
        null,
        null,
        null
    ),
    (
        'HTTP Request Tester',
        'Swiftly test and inspect HTTP requests with UtilityBox''s HTTP Request Tester. Easily make requests, examine responses, and debug your API interactions. Fine-tune headers, parameters, and payloads with a user-friendly interface. Accelerate your development workflow by ensuring seamless communication with servers using this essential tool.',
        null,
        null,
        null
    ),
    (
        'URL Encoder/Decoder',
        'Simplify URL manipulation with UtilityBox''s URL Encoder/Decoder. Encode and decode URLs effortlessly, ensuring data integrity and compatibility. Easily handle special characters, query parameters, and ensure seamless communication between web applications. Streamline your URL-related tasks with this straightforward and efficient utility.',
        null,
        null,
        null
    ),
    (
        'Base64 Encoder/Decoder',
        'Effortlessly encode and decode data with UtilityBox''s Base64 Encoder/Decoder. Convert text, images, or files to Base64 format and vice versa. This essential tool ensures data integrity and facilitates secure data transmission. Streamline your encoding and decoding tasks with this straightforward utility.',
        null,
        null,
        null
    ),
    (
        'IP Address Checker',
        'Verify and analyze IP addresses effortlessly with UtilityBox''s IP Address Checker. Quickly determine the location, network provider, and other relevant details of a given IP address. Simplify network troubleshooting, security assessments, and geolocation tasks with this essential tool. Stay informed about the IPs interacting with your systems in real-time.',
        null,
        null,
        null
    );
