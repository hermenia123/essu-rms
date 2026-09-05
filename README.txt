ESSU LOGIN — HTML/CSS/JAVASCRIPT ONLY

This version contains ONLY front-end login files plus an image and TXT data file.
There is no PHP, API, database, framework, or backend.

STRUCTURE
login.html
assets/css/login.css
assets/js/login.js
images/essu-logo.jpg
data/users.txt
README.txt

DEMO ACCOUNTS
admin / admin123
testuser / User@12345

The JavaScript reads data/users.txt when the folder is served through a local web
server. A fallback is included so the demo can still be tested when login.html
is opened directly from the file system.

IMPORTANT
This is a classroom/demo login only. Credentials are client-side and are not
secure for a real production authentication system.
