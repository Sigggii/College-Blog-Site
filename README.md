# Assignment 3 - A Blog with node, express, ejs and TypeScript

## Links to Code and the Blog running on Heroku:

- [Code on Github](https://github.com/Sigggii/College-Blog-Site): https://github.com/Sigggii/College-Blog-Site
- [Deployed Blog Instance on Heroku](https://curvy-roads-blog-e05fc073b62a.herokuapp.com/) https://curvy-roads-blog-e05fc073b62a.herokuapp.com/

**Info:** I have also added you as Collaborator to the Heroku Deployment: (gemmelai@gmail.com). The app is called curvy-roads-blog


## Important Credentials:

### Blog Users
Admin:
- email: admin@admin.de
- Password: AdminPassword

Author1:
- email: author1@author.de
- Password: Author1

Author2:
- email: author2@author.de
- Password: Author2

User1:
- email: user1@user.de
- Password: User1

User2:
- email: user2@user.de
- Password: User2

User3:
- email: user3@user.de
- Password: User3



## Installation Instructions

### Run the blog locally: 
1. git clone git@github.com:Sigggii/College-Blog-Site.git
2. go in root directory of Blog-Site project
3. run 'npm install'
4. set env variables in .env file (See Chapter Env Variables below)
5. run 'npm run dev'


### Env-Variables
Copy the .env.example file in root directory of project and rename it to .env

Meaning of Env-Variables

- **PORT:** Port on which the instance runs
- **JWT_EXPIRATION_TIME:** Time until JWT expires and User has to login again
- **JWT_SECRET_KEY:** Secret used to sign JWT Tokens. Look up online how to create a secret one
- **MONGO_DB_CONNECTION_STRING:** Connection String to your MongoDB Instance
- **ALL_POSTS_ARTICLES_PER_PAGE**: Posts which are shown on one page of the ALL Posts site


## Information about running Instance of Blog on Heroku

### Heroku
The Heroku App is connected to the [College-Blog-Site](https://github.com/Sigggii/College-Blog-Site) Github-Repository.
Every time, something changes on the main-branch, the app gets redeployed.
For production, env-variables are set under the Settings/Config-Vars Tab


### MongoDB
The MongoDB database is deployed online on the Atlas MongoDB Site for free: https://cloud.mongodb.com
To access mongodb, mongoose is used


## Functionalities of the Blog

### Login
- Login with your user account

### Sign Up
- Create a new account (default Role is User)

### Landing Page
- Featured Post (newest Post)
- 10 latest Posts

### Posts
- All Posts, ever written
- Can be filtered by title, category and author
- Pagination

### Create new Post
- includes Rich Text Edtior
- Image preview

### Admin-Console
- Manage Articles (Edit, Delete)
- Manage Users (Edit, Delete, Change Password, change Role)

### Post-Detail Page
- Complete Article to Read
- Write comments
- Edit them if they are your own or if you are a Admin





