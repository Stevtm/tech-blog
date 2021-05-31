# Tech Blog

This application is a CMS-style blog site built using Handlebars and SQL that allows users to create accounts, create, modify and delete their own blog posts, and comment on existing blog posts.

The application is deployed on Heroku here: https://stark-harbor-07287.herokuapp.com/

The application is built using the following tools & packages:

- MySQL2
- Sequelize
- Express-Handlebars
- Express-Session
- Connect-Session-Sequelize
- Express
- Dotenv
- Bcrypt

## Application Functionality

The application is able to perform the following functions (among others):

- Allow the user to log into the application with their existing account or create an account
- Restrict application functionalities to logged-in users
- Present the user with a homepage that displays all existing blog posts in the database
- Allow the user to navigate to individual pages for each existing blog post where the post is displayed along with all relevant comments on the post
  - Logged-in users are able to leave new comments on the post
- Present the logged-in user with a dashboard which displays all of their previous posts
  - Allow the user to modify and delete their previous posts
- Log users out after 5 minutes of inactivity
- Encrypt passwords using hashing and verify them during login

## Usage

To use this application, navigate to the deployed site here: https://stark-harbor-07287.herokuapp.com/

1. To make an account, click on the "Login" button in the navigation bar.
2. On the Login page, Click the "Sign Up" link to navigate to the Sign Up page.
3. On the Sign Up page, enter your desired username and password and click the "Sign Up!" button to create your account. You will be redirected to the Login page.
4. On the Login page, enter your new username and password and click the "Login" button to log in. You will be redirected to the Dashboard page.
5. On the Dashboard page, you are able to create new posts using the "+ New Post" button. When you have existing posts, you can edit and delete them by clicking on the title of a post.
6. On the Home page, you can view all existing posts in the database. You can view all existing comments on each post and add your own comments by clicking on the title of a post.
7. To log out, press the "Logout" button in the navigation bar.

## References

- MySQL2L: https://www.mysql.com/
- Sequelize: https://sequelize.org/
- Express-Handlebars: https://www.npmjs.com/package/express-handlebars/v/3.0.0
- Express-Session: https://www.npmjs.com/package/express-session
- Connect-Session-Sequelize: https://www.npmjs.com/package/connect-session-sequelize
- Express: https://expressjs.com/
- Dotenv: https://www.npmjs.com/package/dotenv
- Bcrypt: https://www.npmjs.com/package/bcrypt
