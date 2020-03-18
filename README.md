# Politico

[![Coverage Status](https://coveralls.io/repos/github/ShejaEddy/Politico/badge.svg?branch=develop)](https://coveralls.io/github/ShejaEddy/Politico?branch=develop)
[![Build Status](https://travis-ci.com/ShejaEddy/Politico.svg?branch=fix-petitions-171854092)](https://travis-ci.com/ShejaEddy/Politico)

## Description

<p>Politico Web Application enables citizens to give their mandate to politicians running for different government offices while building trust in the process through transparency and For another hand there are all the functionality that an administrator could need in order to control the system. Administrator can be able to make all the CRUD operation on each entity (Political party or Governement office).</p>

<p>On the user side, User can cast a vote to a Politian who is running for a certain government office. And each Politician can express his/her interest to run a certain government office</p>

## Setup

- You need to have `git`, `NodeJS` and `nmp` installed on your local environment.
- Clone the application with `git clone <repository>` command.
- `npm install` to install all the dependencies in local environment.
- `npm update` to update the dependencies if new version available.

### Dependencies

- `NodeJs` Runtime environment that helps to run JavaScript not only in the browser even on the server.
- `Express` NodeJS framework used for making the back-end.
- `Joi` and `Morgan + Winston` API request body error validation and HTTP Request logger respectively.

### Getting Started

Starting application run the following npm scripts

- rename `sample.env` to `.env` and fill all the fields required accordingly.
- `npm start` for starting the server for production.
- `npm run dev` for starting the server for development, enabling `Nodemon` to emit restart server if changes occur.

### Testing

When you need to test the application and view test coverate run:

- `npm test` for running the tests, and getting coverage summary.

### Database

Here are the basic database functionalities to run:

- `npm run db:migrate:up` creating tables in your database.
- `npm run db:migrate:down` dropping tables in your database.
- `npm run db:reset` reseting the database to initial state (db:migrate:down, db:migrate:up, db:seed).
- `npm run db:prod:reset` reseting remote production database.
- `npm run db:test:reset`: reseting local test database.
- `npm run db:dev:reset`: reseting local development database.
- `npm run db:seed`: seed data into the database.

### API Endpoints

#### Authentication

- POST `/api/v1/auth` Sign in.
- POST `/api/v1/users` Creating account.
- GET `/api/v1/users/<id>` get a user details.

#### Government Offices

- POST `/api/v1/offices` Creating a political office.
- GET `/api/v1/offices` Retreiving all political offices.
- GET `/api/v1/offices/<id>` Getting a political office for a specific id.
- PUT `/api/v1/parties/<id>` Edit a specific political party.
- DELETE `/api/v1/parties/<id>` Delete a particular party.

#### Political Parties

- POST `/api/v1/parties` Create a political party.
- GET `/api/v1/parties` Get all political parties.
- GET `/api/v1/parties/<id>` Get a specific political party.
- PUT `/api/v1/parties/<id>` Edit a specific political party.
- DELETE `/api/v1/parties/<id>` Delete a particular party.

#### Vote

- POST `/api/v1/votes` User cast a vote to particular candidate.
- GET `/api/v1/votes/<office_id>` Get results for a particular office.
- GET `/api/v1/votes` Get all vote results.

#### Petitions

- POST `/api/v1/petitions` ​ Register a user as a candidate running for a ​ political office​.
- GET `/api/v1/petitions/current` Get your own petitions.
- GET `/api/v1/petitions` Get all petitions in general.
- GET `/api/v1/petitions/<id>` Get a particular petition.
- PUT `/api/v1/petitions/<id>` Update ​a petition detail.
- DELETE `/api/v1/petitions/<id>` Delete a particular petition.

### Deploy (HEROKU)

You can test the above API using this Heroku URL `https://politicoserver.herokuapp.com/` with the above mentioned end points.

### Github-page

GitHub page (gh-page) of this project accessed using this link [Politico](https://shejaeddy.github.io/Politico/UI/)

#### Credetials

For data authentication purpose:

##### Login as Admin

- Email: `admin@example.com`
- Password: `password`

##### Login as User

- Email: `user@example.com`
- Password: `password`

##### Happy Voting, Enjoy! :v:
