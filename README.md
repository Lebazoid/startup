# Startup
## Specification Deliverable (Further deliverables below)

### Elevator Pitch

This website is the perfect place to discover and discuss the book, King of the Beasts, by Caleb Lay. This site features multiple different pages to get readers engaged, and talk to others about their favorite parts of the book!

### Key Features

* A map of Aldea, the country the book takes place in.
* A page where visitors can get to know the characters.
* A link to amazon where viewers can buy the book.
* A discussion board with customizable profile names.

### Technology

Multiple technologies will be used to host this site. These are the ones I plan to use so far.

* HTML - HTML will be used to structure the website. There will be 5 HTML pages, for login, for profile, for the discussion forum, the first chapter, the character page, and the map.
* CSS - CSS will be used to design and theme the site, so that it looks cool and consistent across all platforms.
* Javascript - Javascript will be used for login, the character introductions, and the discussion forum.
* AWS - Amazon webservices will host the site. Their servers will store people's profile information, posts, and replies.
* Websocket - Enables realtime discussion on the forum.
* React - Assist development in Javascript.

## CSS Deliverable

This deliverable completely overhauled the site. First and foremost, I added color, images, and styling to the existing html, making it look presentable and giving it a nice rustic aesthetic. 

For all pages;
* Header, footer, and body are properly styled.
* Navigation of the website is clear and simple.
* Pieces of the website will move and reorganize themselves to fit cleanly on whatever screen they are viewed on.
* Fonts, colors, and other elements are consistent across all pages.
* All images currently needed are applied to the site.

On the main page of the site, viewers are presented a stack of books that they can click on and be redirected to a place to buy the book when it comes out. The main page also features three prominent links, now lined up horizontally. These links will compress closer together on smaller devices.

The discussion board link leads to a log in page that currently has no functions, but it styled with the same color scheme as the main page.

The map of Aldea features, well, a map. It also has no functionality, and may eventually be moved to the main page, but it is styled in unison as well.

The "Get to Know the Characters!" link leads to a page where the 12 most prominent characters in the book are neatly arranged in a grid! This grid is complete with images of the characters, and will move from 3x4 on a large screen, to 2x6 on smaller screens, to even 1x12 on mobile phones screens.

## Javascript Deliverable
This deliverable added some much-needed functinonality to the site. I added a whole bunch of Javascript that made the website interactable for a single user. 

* <b>Login:</b> When you click on "Discussion Board" from the main page, the user will be directed to a login page. Currently, the login page only mimics authentication. The user can input any username and it will be displayed on the next page. If the username or password field is blank however, it will alert the user that they must enter a username or password. Since the page currently only simulates authentication, the login button currently redirects the user to the discussion board page. 
* <b>database:</b> When a user enters a username, it will be displayed as their name on the discussion board. Currently this username is stored and retrieved from local storage, but it will be replaced by database data later.
* Websocket:</b> I used a setInterval function to periodically add a "Placeholder Comment" from a "Placeholder user." This will be replaced with websocket messages later."
* <b>Application Logic:</b> When a new comment appears on the discussion board, the user's screen will automatically scroll to the bottom to see the new message. Users may comment whatever they like.

* <b>Other functionality added for fun:</b> On the 'Meet the Characters' page, clicking on a characters image will open a collapsible with a smooth animation, containing a brief description of the character. These plus the map should give people some things to talk about even without reading the full book. You can read those and learn about the characters I've made! They're very cool, and they don't bite. My favorite is Ezlo. Who is yours?