# inCase 
inCase is a full-stack project that I created with to push myself in the production of a CRUD application from scope to presentation in two weeks time.  You can think of inCase as a "Little Free Library" tracker for the web.  More than anything, this project helped me to learn what I am capable of completing within a short time frame.

---

## Built With
- React
- Express.js
- Node.js
- PostgreSQL
- Redux
- Sagas
- Passport
- Moment.js
- Google Maps API
- Google Geocoding API

---

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Installing
Steps to get the development environment running.

1. Download this project.
2. Create the tables in the database.sql file using Postico or a similar PostgreSQL client.
3. npm install
4. npm run server
5. npm run client

---

## Screen Shots
Log in and Register pages

![Log in](https://i.imgur.com/91HTUju.jpg)

Discover view.  Upon logging in for the first time the user is greeted by a prompt to enter the location of their bookcase so that they can begin sharing books.  The search field on the left uses Google's geocoding API to accept partial addresses that move the center of the map.  The waypoints are clickable and show the books that are available from the user who has their bookcase at that location.
![Discover View](https://i.imgur.com/1mtfXb6.png)

This is what is displayed when a user selects a waypoint on the map.  A gridlist shows all the books available from a certain user, clicking on the information icon brings up more information about that book, as well as a button that allows the current user to request the book.

![Discover Bookcase](https://i.imgur.com/wcSFMpF.jpg)

This is the view in which the currently logged in user can manage their own bookcase.  Here users can add, delete, and edit books from their bookcase, as well as change the location of their bookcase and update their profile image.

![Manage Bookcase View](https://i.imgur.com/ptEk9KS.jpg)

This is the Requests view where users can see their incoming and outgoing book requests.  Users receive a notification upon logging in that is displayed as a badge on the navbar if they have unviewed requests.  In this view, users can also message eachother to arrange a meet-up or hand-off of the book that has been requested.  Once the book has changed hands, the person who received the request can hit the share button to transfer the book into the other person's bookcase.

![Requests View](https://i.imgur.com/na4F0dW.png)
---
## Completed Features
- [x] Ability to Register as a new user and Log in using Passport authentication
- [x] Ability to create and update location markers for user bookcases
- [x] Ability to create, view, update, and delete books in your own bookcase 
- [x] Ability to update profile image to display to other users
- [x] Ability to browse other users' bookcase locations anywhere in the world using Google Maps and Google Geocoding APIs
- [x] Ability to see only books from a specific user when their bookcase is selected
- [x] Ability to request book from a user
- [x] Ability to receive a notification when a book has been requested from your collection
- [x] Ability to start a message thread around book requests to facilitate the transfer of a book
- [x] Ability to transfer a book from one user's bookcase to another's with the click of a button

## Next Steps
- [] Refactor code
- [] Add cluster waypoints for the map
- [] Add search or filter functionality to find specific books on the Discover view
- [] Implement Google Books API to simplify adding books to a collection
- [] Add book reviews or "notes" that users can attach to books before they pass them along
- [] Expand the "Requests" functionality and add a way for group chats to be created to discuss certain books

## Authors
Travis Dunn

## Acknowledgments
A big thanks to Chris Black, Kris Szafranski, and Dane Smith for all of their guidance and wisdom.







