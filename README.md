Jenkins User Friendly Dashboard
=======

[![Build Status](https://travis-ci.org/alexnaish/jenkings.svg?branch=master)](https://travis-ci.org/alexnaish/jenkings)


An interface to quickly see just how your CI builds are doing.


Setup
-----

1. Clone the repository and then run `cd jenkings`.
1. Run `npm install`.
1. On a locally running mongodb server, create the "jenkings" database with user/password "jenkings/kernel" (configurable with "config/development.js" as required).
	1. On Mongo 2.6 and up you can do this by in your terminal running: `mongo scholar --eval "db.createUser({ user: 'jenkings', pwd: 'kernel', roles: ['readWrite', 'dbAdmin'] } )"`
	1. Or if that gives errors around the command: `mongo jenkings --eval "db.addUser({ user: 'jenkings', pwd: 'kernel', roles: ['readWrite', 'dbAdmin'] } )"`
1. To start the application run `npm start`.
1. To view the application and job statuses go to `http://localhost:1337`.

Developing
-----
There is a gulp watcher for recompiling CSS/restarting the server on changes. Simple run

`
gulp
`

to start the watcher.