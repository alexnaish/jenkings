Jenkins User Friendly Dashboard
=======

[![Build Status](https://travis-ci.org/alexnaish/jenkings.svg?branch=master)](https://travis-ci.org/alexnaish/jenkings)


An interface to quickly see just how your CI builds are doing.


Setup
-----

1. Clone the repository and then run `cd jenkings`.
1. Run `npm install`.
1. On a locally running mongodb server, create the "jenkings" database with user/password "jenkings/kernel" (configurable with "config/development.js" as required).
	1. On Mongo 2.6 and up you can do this by in your terminal running: `mongo jenkings --eval "db.createUser({ user: 'jenkings', pwd: 'kernel', roles: ['readWrite', 'dbAdmin'] } )"`
	1. Or if that gives errors around the command: `mongo jenkings --eval "db.addUser({ user: 'jenkings', pwd: 'kernel', roles: ['readWrite', 'dbAdmin'] } )"`
1. To start the application run `npm start`.
1. To view the application and job statuses go to `http://localhost:1337`.


Storing data
-----

To save data to the Jenkings database simply:

`
curl --data 'jobName=<your Jenkins job name>&project=<Project name (API or UI etc)>&buildId=<Jenkins job number>&result=<state of job>&branch=<Source control branch>&node=<host job ran on>&gitCommit=<identifier for commit that triggered the job>' http://<jenkings server>/api/jobs
`

Currently, Jenkings is only compatible with Jenkins CI server.

Developing
-----
There is a gulp watcher for recompiling CSS/restarting the server on changes. Simple run

`
gulp
`

to start the watcher.

Testing
-----

Gulp is configured to run Mocha with code coverage and run Karma unit tests in Phantom

`
gulp mocha
`

`
gulp unit
`
