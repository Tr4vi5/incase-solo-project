CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    profile_img_src VARCHAR (2083) default "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
);

CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title VARCHAR (512),
	author VARCHAR (512),
	release_year VARCHAR (10),
	genre VARCHAR (512),
	cover_src VARCHAR (2083),
	isbn VARCHAR(512),
	synopsis VARCHAR(512),
	pending BOOLEAN default FALSE,
	bookcases_id INT REFERENCES "bookcases"
);
	
CREATE TABLE bookcases (
	id SERIAL PRIMARY KEY,
	users_id INT REFERENCES "users",
	latitude NUMERIC,
	longitude NUMERIC
);

CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	to_users_id INT REFERENCES "users",
	from_users_id INT REFERENCES "users",
	books_id INT REFERENCES "books",
	body VARCHAR(512), 
	date TIMESTAMP not null default CURRENT_TIMESTAMP,
	resolved BOOLEAN default FALSE
);

-- Adding a bookcase

INSERT INTO "bookcases" ("users_id", "latitude", "longitude") VALUES (2, 44.9553567, -93.2777734);

-- Adding a book to a bookcase

SELECT "bookcases"."id" FROM "users" JOIN "bookcases" ON "users"."id" = "bookcases"."users_id" WHERE "user"."id" = req.user.id;

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('For Whom the Bell Tolls', 'Ernest Hemingway', '1940', 'War Novel', 'https://images-na.ssl-images-amazon.com/images/I/51ITaxhiA8L._SX326_BO1,204,203,200_.jpg', '978-0684803357', 'The story of Robert Jordan, a young American in the International Brigades attached to an antifascist guerilla unit in the mountains of Spain, it tells of loyalty and courage, love and defeat, and the tragic death of an ideal.', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Slaughterhouse Five', 'Kurt Vonnegut', '1969', 'Black Comedy', 'https://images-na.ssl-images-amazon.com/images/I/41-D%2Bw0DPxL._SX324_BO1,204,203,200_.jpg', '978-0812988529', 'Slaughterhouse-Five, an American classic, is one of the world’s great antiwar books. Centering on the infamous firebombing of Dresden, Billy Pilgrim’s odyssey through time reflects the mythic journey of our own fractured lives as we search for meaning in what we fear most.', 2);

-- Get all books for all users

SELECT * FROM "bookcases" JOIN "books" ON "bookcases"."id" = "books"."bookcases_id";

-- Get all books for current user

SELECT * FROM "bookcases" JOIN "books" ON "bookcases"."id" = "books"."bookcases_id" WHERE "users_id" = 1;

-- Send message

INSERT INTO "messages" ("to_users_id", "from_users_id", "books_id", "body") VALUES (2, 1, 3, 'Yeah, sure! Where do you want to meet up?');

-- Get all messages for current user

SELECT * FROM "messages" WHERE ("to_users_id" = 1 OR "from_users_id" = 1);



