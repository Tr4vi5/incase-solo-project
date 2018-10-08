-- Create a new database called incase, then run these PostgreSQL create tables
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

CREATE TABLE requests (
	id SERIAL PRIMARY KEY,
	to_users_id INT REFERENCES "users",
	from_users_id INT REFERENCES "users",
	books_id INT REFERENCES "books",
	date TIMESTAMP not null default CURRENT_TIMESTAMP,
	active BOOLEAN default TRUE,
	seen BOOLEAN default FALSE
);
	

CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	to_users_id INT REFERENCES "users",
	from_users_id INT REFERENCES "users",
	requests_id INT REFERENCES "requests",
	body VARCHAR(5000), 
	date TIMESTAMP not null default CURRENT_TIMESTAMP
);

-- Please Create Five Users and give them each a bookcase location in the application before inserting this mock data for books.
-- Otherwise, change the last value in the inserts to the bookcase ID for the users that you create.

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('For Whom the Bell Tolls', 'Ernest Hemingway', '1940', 'War Novel', 'https://images-na.ssl-images-amazon.com/images/I/51ITaxhiA8L._SX326_BO1,204,203,200_.jpg', '978-0684803357', 'The story of Robert Jordan, a young American in the International Brigades attached to an antifascist guerilla unit in the mountains of Spain, it tells of loyalty and courage, love and defeat, and the tragic death of an ideal.', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Slaughterhouse Five', 'Kurt Vonnegut', '1969', 'Black Comedy', 'https://images-na.ssl-images-amazon.com/images/I/41-D%2Bw0DPxL._SX324_BO1,204,203,200_.jpg', '978-0812988529', 'Slaughterhouse-Five, an American classic, is one of the world’s great antiwar books. Centering on the infamous firebombing of Dresden, Billy Pilgrim’s odyssey through time reflects the mythic journey of our own fractured lives as we search for meaning in what we fear most.', 2);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('The Republic', 'Plato', '381 BC', 'Political Philosophy', 'https://images-na.ssl-images-amazon.com/images/I/61bsm5jD7mL._SX326_BO1,204,203,200_.jpg', '978-1420931693', 'A fictional dialogue between Socrates and other various Athenians and foreigners which examines the meaning of justice. Written in approximately 380 BC, "The Republic" also discusses Plato''s "Theory of Forms", the nature of the philosopher, the conflict between philosophy and poetry, and the immortality of the soul.', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Meditations', 'Marcus Aurelius', 'Unknown', 'Philosophy', 'https://images-na.ssl-images-amazon.com/images/I/51i9cZv%2B6KL._SX323_BO1,204,203,200_.jpg', '978-0140449334', 'A series of spiritual exercises filled with wisdom, practical guidance, and profound understanding of human behavior, Marcus Aurelius''s "Meditations remains one of the greatest works of spiritual and ethical reflection ever written. Marcus''s insights and advice--on everything from living in the world to coping with adversity and interacting with others--have made the Meditations required reading for statesmen and philosophers alike, while generations of ordinary readers have responded to the straightforward intimacy of his style. ', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('The Art of War', 'Sun Tzu', '5th century BC', 'Philosophy', 'https://images-na.ssl-images-amazon.com/images/I/51i9cZv%2B6KL._SX323_BO1,204,203,200_.jpg', '978-0140449334', 'A series of spiritual exercises filled with wisdom, practical guidance, and profound understanding of human behavior, Marcus Aurelius''s "Meditations remains one of the greatest works of spiritual and ethical reflection ever written. Marcus''s insights and advice--on everything from living in the world to coping with adversity and interacting with others--have made the Meditations required reading for statesmen and philosophers alike, while generations of ordinary readers have responded to the straightforward intimacy of his style. ', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Don Quixote', 'Miguel De Cervantes Saavedra', '1615', 'Comedy', 'https://images-na.ssl-images-amazon.com/images/I/51nBHIQv6zL._SX332_BO1,204,203,200_.jpg', '978-0142437230', 'Don Quixote has become so entranced reading tales of chivalry that he decides to turn knight errant himself. In the company of his faithful squire, Sancho Panza, these exploits blossom in all sorts of wonderful ways. While Quixote''s fancy often leads him astray—he tilts at windmills, imagining them to be giants—Sancho acquires cunning and a certain sagacity.', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Cat''s Cradle', 'Kurt Vonnegut', '1963', 'Satire', 'https://images-na.ssl-images-amazon.com/images/I/51hdynbk8UL._SX326_BO1,204,203,200_.jpg', '978-0385333481', 'Cat’s Cradle is Kurt Vonnegut’s satirical commentary on modern man and his madness. An apocalyptic tale of this planet’s ultimate fate, it features a midget as the protagonist, a complete, original theology created by a calypso singer, and a vision of the future that is at once blackly fatalistic and hilariously funny.', 3);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Catch-22', 'Joseph Heller', '1961', 'Comedy', 'https://images-na.ssl-images-amazon.com/images/I/51kqbC3YKvL._SX322_BO1,204,203,200_.jpg', '978-1451626650', 'Set in Italy during World War II, this is the story of the incomparable, malingering bombardier, Yossarian, a hero who is furious because thousands of people he has never met are trying to kill him. But his real problem is not the enemy—it is his own army, which keeps increasing the number of missions the men must fly to complete their service. Yet if Yossarian makes any attempt to excuse himself from the perilous missions he’s assigned, he’ll be in violation of Catch-22, a hilariously sinister bureaucratic rule: a man is considered insane if he willingly continues to fly dangerous combat missions, but if he makes a formal request to be removed from duty, he is proven sane and therefore ineligible to be relieved.', 3);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Fahrenheit 451', 'Ray Bradbury', '1953', 'Science Fiction', 'https://images-na.ssl-images-amazon.com/images/I/41qI9quGIdL._SX324_BO1,204,203,200_.jpg', '978-1451673319', 'Guy Montag is a fireman. In his world, where television rules and literature is on the brink of extinction, firemen start fires rather than put them out. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden.', 3);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('To Kill a Mockingbird', 'Harper Lee', '1964', 'Southern Gothic', 'https://images-na.ssl-images-amazon.com/images/I/51t88XArQeL._SX330_BO1,204,203,200_.jpg', '978-0060935467', ' A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father—a crusading local lawyer—risks everything to defend a black man unjustly accused of a terrible crime.', 2);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('A Tree Grows in Brooklyn', 'Betty Smith', '1943', 'Bildungsroman', 'https://images-na.ssl-images-amazon.com/images/I/51wNikqr4BL._SX332_BO1,204,203,200_.jpg', '978-0061120077', 'From the moment she entered the world, Francie needed to be made of stern stuff, for the often harsh life of Williamsburg demanded fortitude, precocity, and strength of spirit. Often scorned by neighbors for her family’s erratic and eccentric behavior—such as her father Johnny’s taste for alcohol and Aunt Sissy’s habit of marrying serially without the formality of divorce—no one, least of all Francie, could say that the Nolans’ life lacked drama.', 2);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('House of Leaves', 'Mark Z. Danielewski', '2000', 'Horror', 'https://images-na.ssl-images-amazon.com/images/I/41jpemUkbEL._SX369_BO1,204,203,200_.jpg', '978-0375703768', 'Years ago, when House of Leaves was first being passed around, it was nothing more than a badly bundled heap of paper, parts of which would occasionally surface on the Internet. No one could have anticipated the small but devoted following this terrifying story would soon command.', 4);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('I Know Why the Caged Bird Sings', 'Maya Angelou', '1969', 'Autobiography', 'https://images-na.ssl-images-amazon.com/images/I/41SKsBaGXRL._SX301_BO1,204,203,200_.jpg', '978-0345514400', 'Here is a book as joyous and painful, as mysterious and memorable, as childhood itself. I Know Why the Caged Bird Sings captures the longing of lonely children, the brute insult of bigotry, and the wonder of words that can make the world right. Maya Angelou’s debut memoir is a modern American classic beloved worldwide.', 4);


INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Invisible Man', 'Ralph Ellison', '1952', 'Bildungsroman', 'https://images-na.ssl-images-amazon.com/images/I/51NIZqFLvJL._SX322_BO1,204,203,200_.jpg', ' 978-0679732761', 'The nameless narrator of the novel describes growing up in a black community in the South, attending a Negro college from which he is expelled, moving to New York and becoming the chief spokesman of the Harlem branch of "the Brotherhood", and retreating amid violence and confusion to the basement lair of the Invisible Man he imagines himself to be.', 5);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('One Flew Over the Cuckoo''s Nest', 'Ken Kesey', '1962', 'Drama', 'https://images-na.ssl-images-amazon.com/images/I/41Orbum-I%2BL._SX315_BO1,204,203,200_.jpg', '9780451163967', 'In this classic novel, Ken Kesey’s hero is Randle Patrick McMurphy, a boisterous, brawling, fun-loving rebel who swaggers into the world of a mental hospital and takes over. A lusty, life-affirming fighter, McMurphy rallies the other patients around him by challenging the dictatorship of Nurse Ratched. He promotes gambling in the ward, smuggles in wine and women, and openly defies the rules at every turn. But this defiance, which starts as a sport, soon develops into a grim struggle, an all-out war between two relentless opponents: Nurse Ratched, backed by the full power of authority, and McMurphy, who has only his own indomitable will. What happens when Nurse Ratched uses her ultimate weapon against McMurphy provides the story’s shocking climax.
', 5);


INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Death of a Salesman', 'Arthur Miller', '1949', 'Tragedy', 'https://images-na.ssl-images-amazon.com/images/I/41TPutq5FRL._SX322_BO1,204,203,200_.jpg', '978-0140481341', 'In the person of Willy Loman, the aging, failing salesman who makes his living riding on a smile and a shoeshine, Arthur Miller redefined the tragic hero as a man whose dreams are at once insupportably vast and dangerously insubstantial. He has given us a figure whose name has become a symbol for a kind of majestic grandiosity—and a play that compresses epic extremes of humor and anguish, promise and loss, between the four walls of an American living room.', 4);


INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('All Quiet on the Western Front', 'Erich Maria Remarque', '1928', 'War', 'https://images-na.ssl-images-amazon.com/images/I/51UVVOhk1sL._SX302_BO1,204,203,200_.jpg', '978-0449213940', 'Paul Baumer enlisted with his classmates in the German army of World War I. Youthful, enthusiastic, they become soldiers. But despite what they have learned, they break into pieces under the first bombardment in the trenches. And as horrible war plods on year after year, Paul holds fast to a single vow: to fight against the principles of hate that meaninglessly pits young men of the same generation but different uniforms against each other--if only he can come out of the war alive.', 4);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('The Sun Also Rises', 'Ernest Hemingway', '1926', 'Fiction', 'https://images-na.ssl-images-amazon.com/images/I/51lmTfDL9fL._SX326_BO1,204,203,200_.jpg', '978-0743297332', 'The Sun Also Rises is one of Ernest Hemingway''s masterpieces and a classic example of his spare but powerful writing style. A poignant look at the disillusionment and angst of the post-World War I generation, the novel introduces two of Hemingway''s most unforgettable characters: Jake Barnes and Lady Brett Ashley. The story follows the flamboyant Brett and the hapless Jake as they journey from the wild nightlife of 1920s Paris to the brutal bullfighting rings of Spain with a motley group of expatriates. It is an age of moral bankruptcy, spiritual dissolution, unrealized love, and vanishing illusions.', 5);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Something Wicked This Way Comes', 'Ray Bradbury', '1962', 'Horror Fantasy', 'https://images-na.ssl-images-amazon.com/images/I/51oPi59x5VL._SX327_BO1,204,203,200_.jpg', '978-1501167713', 'For those who still dream and remember, for those yet to experience the hypnotic power of its dark poetry, step inside. The show is about to begin. Cooger & Dark’s Pandemonium Shadow Show has come to Green Town, Illinois, to destroy every life touched by its strange and sinister mystery.', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('The Martian Chronicles', 'Ray Bradbury', '1950', 'Science Fiction', 'https://images-na.ssl-images-amazon.com/images/I/51YjAGbzefL._SX307_BO1,204,203,200_.jpg', '978-1451678192', 'In The Martian Chronicles, Ray Bradbury, America’s preeminent storyteller, imagines a place of hope, dreams, and metaphor— of crystal pillars and fossil seas—where a fine dust settles on the great empty cities of a vanished, devastated civilization. Earthmen conquer Mars and then are conquered by it, lulled by dangerous lies of comfort and familiarity, and enchanted by the lingering glamour of an ancient, mysterious native race. In this classic work of fiction, Bradbury exposes our ambitions, weaknesses, and ignorance in a strange and breathtaking world where man does not belong.', 5);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('The Illustrated Man', 'Ray Bradbury', '1951', 'Science Fiction', 'https://images-na.ssl-images-amazon.com/images/I/51HgWYJWo2L._SX308_BO1,204,203,200_.jpg', '978-1451678185', ' Provocative and powerful, The Illustrated Man is a kaleidoscopic blending of magic, imagination, and truth—as exhilarating as interplanetary travel, as maddening as a walk in a million-year rain, and as comforting as simple, familiar rituals on the last night of the world.', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Brave New World', 'Aldous Huxley', '1932', 'Science Fiction', 'https://images-na.ssl-images-amazon.com/images/I/41l%2B4UobkRL._SX325_BO1,204,203,200_.jpg', '978-0060850524', 'Brave New World is a searching vision of an unequal, technologically-advanced future where humans are genetically bred, socially indoctrinated, and pharmaceutically anesthetized to passively uphold an authoritarian ruling order–all at the cost of our freedom, full humanity, and perhaps also our souls.', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('The Iliad', 'Homer', '762 BC', 'Epic', 'https://images-na.ssl-images-amazon.com/images/I/51NXvaFyvIL._SX336_BO1,204,203,200_.jpg', '978-0140275360', 'Homer’s timeless poem still vividly conveys the horror and heroism of men and gods wrestling with towering emotions and battling amidst devastation and destruction, as it moves inexorably to the wrenching, tragic conclusion of the Trojan War. ', 3);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('The Odyssey', 'Homer', '8th Century BC', 'Epic', 'https://images-na.ssl-images-amazon.com/images/I/51FR8mSgqoL._SX346_BO1,204,203,200_.jpg', '978-0140268867', 'the Odyssey is literature''s grandest evocation of an everyman''s journey through life. Odysseus'' reliance on his wit and wiliness for survival in his encounters with divine and natural forces during his ten-year voyage home to Ithaca after the Trojan War is at once a timeless human story and an individual test of moral endurance', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Of Mice and Men', 'John Steinbeck', '1937', 'Tragedy', 'https://images-na.ssl-images-amazon.com/images/I/512nk8aiGML._SX325_BO1,204,203,200_.jpg', '978-0140186420', ' An unlikely pair, George and Lennie, two migrant workers in California during the Great Depression, grasp for their American Dream. They hustle work when they can, living a hand-to-mouth existence. For George and Lennie have a plan: to own an acre of land and a shack they can call their own. When they land jobs on a ranch in the Salinas Valley, the fulfillment of their dream seems to be within their grasp. But even George cannot guard Lennie from the provocations, nor predict the consequences of Lennie''s unswerving obedience to the things George taught him.', 1);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Lord of the Flies', 'William Golding', '1954', 'Fiction', 'https://images-na.ssl-images-amazon.com/images/I/511oh8yMEcL._SX329_BO1,204,203,200_.jpg', '978-1573226127', 'William Golding''s compelling story about a group of very ordinary small boys marooned on a coral island has become a modern classic. At first it seems as though it is all going to be great fun; but the fun before long becomes furious and life on the island turns into a nightmare of panic and death.', 3);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Night', 'Elie Wiesel', '1956', 'Memoir', 'https://images-na.ssl-images-amazon.com/images/I/41kkT0WKkXL._SX310_BO1,204,203,200_.jpg', '978-0374500016', 'Night offers much more than a litany of the daily terrors, everyday perversions, and rampant sadism at Auschwitz and Buchenwald; it also eloquently addresses many of the philosophical as well as personal questions implicit in any serious consideration of what the Holocaust was, what it meant, and what its legacy is and will be.', 3);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Hatchet', 'Gary Paulsen', '1987', 'YA', 'https://images-na.ssl-images-amazon.com/images/I/51oWgEyjbLL._SY445_.jpg', '9781416936466', 'On his way to visit his recently divorced father in the Canadian mountains, thirteen-year-old Brian Robeson is the only survivor when the single-engine plane crashes. His body battered, his clothes in shreds, Brian must now stay alive in the boundless Canadian wilderness.
More than a survival story, Hatchet is a tale of tough decisions. When all is stripped down to the barest essentials, Brian discovers some stark and simple truths. Self-pity doesn''t work. Despair doesn''t work. And if Brian is to survive physically as well as mentally, he must discover courage.
', 3);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('The Giver', 'Lois Lowry', '1993', 'YA', 'https://images-na.ssl-images-amazon.com/images/I/51qQyRjqgTL._SX328_BO1,204,203,200_.jpg', '978-1328471222', 'The haunting story centers on twelve-year-old Jonas, who lives in a seemingly ideal, if colorless, world of conformity and contentment. Not until he is given his life assignment as the Receiver of Memory does he begin to understand the dark, complex secrets behind his fragile community. ', 2);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Animal Farm', 'George Orwell', '1945', 'Satire', 'https://images-na.ssl-images-amazon.com/images/I/51zGny2PI1L._SX338_BO1,204,203,200_.jpg', '978-0452284241', 'As ferociously fresh as it was more than a half century ago, this remarkable allegory of a downtrodden society of overworked, mistreated animals, and their quest to create a paradise of progress, justice, and equality is one of the most scathing satires ever published. As we witness the rise and bloody fall of the revolutionary animals, we begin to recognize the seeds of totalitarianism in the most idealistic organization; and in our most charismatic leaders, the souls of our cruelest oppressors. ', 2);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('1984', 'George Orwell', '1949', 'Science Fiction', 'https://images-na.ssl-images-amazon.com/images/I/51GW6dBiENL._SX329_BO1,204,203,200_.jpg', '978-0452262935', 'Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes. But as he starts to think for himself, Winston can’t escape the fact that Big Brother is always watching...', 2);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Arrow of God', 'Chinua Achebe', '1964', 'Fiction', 'https://images-na.ssl-images-amazon.com/images/I/51AD1ROeLfL._SX322_BO1,204,203,200_.jpg', '978-0385014809', 'Ezeulu finds that his authority is increasingly under threat from rivals within his nation and functionaries of the newly established British colonial government. Yet he sees himself as untouchable. He is forced, with tragic consequences, to reconcile conflicting impulses in his own nature—a need to serve the protecting deity of his Umuaro people; a desire to retain control over their religious observances; and a need to gain increased personal power by pushing his authority to the limits. He ultimately fails as he leads his people to their own destruction, and consequently, his personal tragedy arises.', 4);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('Heart of Darkness', 'Joseph Conrad', '1899', 'Fiction', 'https://images-na.ssl-images-amazon.com/images/I/416-CZHm2eL._SX331_BO1,204,203,200_.jpg', '978-1514713846', 'Heart of Darkness (1899) is a novella by Anglo-Polish novelist Joseph Conrad, about a voyage up the Congo River into the Congo Free State, in the heart of Africa, by the story''s narrator Marlow. Marlow tells his story to friends aboard a boat anchored on the River Thames, London, England. This setting provides the frame for Marlow''s story of his obsession with the ivory trader Kurtz, which enables Conrad to create a parallel between London and Africa as places of darkness. Central to Conrad''s work is the idea that there is little difference between so-called civilized people and those described as savages; Heart of Darkness raises important questions about imperialism and racism.', 4);

INSERT INTO "books" ("title", "author", "release_year", "genre", "cover_src", "isbn", "synopsis", "bookcases_id") 
VALUES ('The Inferno', 'Dante Alighieri', '1320', 'Epic', 'https://images-na.ssl-images-amazon.com/images/I/51icKSKbmRL._SX308_BO1,204,203,200_.jpg', '978-0451531391', 'The Inferno remains powerful after seven centuries. It confronts the most universal values—good and evil, free will and predestination—while remaining intensely personal and ferociously political, for it was born out of the anguish of a man who saw human life blighted by the injustice and corruption of his times.', 1);