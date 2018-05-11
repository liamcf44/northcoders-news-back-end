## \***\*\*\*\*\***\*\***\*\*\*\*\*** NORTHCODERS NEWS \***\*\*\*\*\***\*\***\*\*\*\*\***

A portfolio project for Northcoders in which an API is built using MongoDB to emulate a news site. This includes Topics, Articles, Users and Comments.

This API is then hosted on Heroku via MLab.

### GETTING STARTED

You will need to run the following to recreate this project:

Fork and clone the repository;

`git clone https://github.com/:username/BE-FT-northcoders-news.git`

Running `npm install` will install the dependencies needed.

You will also need to install node with `npm install node`. The version used for this project is v9.9.0.

### HEROKU

This API is hosted on Heroku using an MLab URI. You can do the same by setting up accounts at `mlab.com` and `heroku.com`.

Once you have set up a new Databse on mlab you can change the heroku config setup using:

```
heroku config:set MONGO_URI=[mlab-url]
```

### TESTING

There are tests set up to evaluate all aspects of the API using a testData within the seed file.

There is a test for the seedDB function, checking all the data has been added to the Database and in the right order.

The other tests are to check that each endpoint runs properly.

These tests can be run with `npm test`.

### BUILT WITH

The following dependencies were used to build the app:

* Body-Parser v1.15.2
* Express v4.14.0
* Heroku v7.0.37
* Mongoose v5.0.14
* Chai v4.1.2
* EJS v2.6.1
* Faker v4.1.0
* Lodash v4.17.10
* Mocha v5.0.5
* Nodemon v1.17.2
* Supertest v3.0.0

### AUTHORS

Liam Freeman:

* Email: liamcf44@protonmail.com
* GitHub: liamcf44
