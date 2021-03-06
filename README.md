Jenkins User Friendly Dashboard
=======

[![Build Status](https://travis-ci.org/alexnaish/jenkings.svg?branch=master)](https://travis-ci.org/alexnaish/jenkings)
[![Code Climate](https://codeclimate.com/github/alexnaish/jenkings/badges/gpa.svg)](https://codeclimate.com/github/alexnaish/jenkings)
[![Test Coverage](https://codeclimate.com/github/alexnaish/jenkings/badges/coverage.svg)](https://codeclimate.com/github/alexnaish/jenkings/coverage)

An interface to quickly see just how your CI builds are doing.


Setup
-----

1. Clone the repository and then run `cd jenkings`.
1. Run `npm install`.
1. On a locally running mongodb server, create the "jenkings" database with user/password "jenkings/kernel" (configurable with "config/development.js" as required).
	1. On Mongo 2.6 and up you can do this by in your terminal running: `mongo jenkings --eval "db.createUser({ user: 'jenkings', pwd: 'kernel', roles: ['readWrite', 'dbAdmin'] } )"`
	1. Or if that gives errors around the command: `mongo jenkings --eval "db.addUser({ user: 'jenkings', pwd: 'kernel', roles: ['readWrite', 'dbAdmin'] } )"`
1. Ensure your config is correct - check `config/development.js` or `config/production.js`
1. To start the application run `npm start`.
1. To view the application and job statuses go to `http://localhost:1337`.


Storing data
-----

To save data to the Jenkings database simply:

`
curl --data 'jobName=<your Jenkins job name>&project=<Project name (API or UI etc)>&shard=<Shard Number>&buildId=<Jenkins job number>&result=<state of job>&branch=<Source control branch>&node=<host job ran on>&gitCommit=<identifier for commit that triggered the job>' http://<jenkings server>/api/jobs
`

Currently, Jenkings is only compatible with Jenkins CI server.

###Mandatory Fields

* jobName - Name of the job on Jenkins (iceberg-frontend-unit-tests etc) (`$JOB_NAME`)
* buildId - Build number assigned by Jenkins (`$BUILD_NUMBER`)
* project - Identifier for the filtering on dashboard (UI/API/E2E etc)
* branch - Branch specifier (master / release_candidate / stable etc)

###Optional Fields

* result - Used within jenkings to determine result, usually ('SUCCESS'/'FAILURE'/'PENDING'). Defaults to 'PENDING'. A "PENDING" status will make Jenkings fetch the job from the Jenkins instance specified in your config. This may allow more granular detail to be collected than is available at job runtime (dependent on Jenkins API result)
* node - The slave that the job was ran on (`$NODE_NAME`)
* shard - Useful for when you have the same job running with different parameters, for instance, each shard of an end-to-end test job.
* gitCommit - The GIT hash of the job being run (`$GIT_COMMIT`)


Developing
-----
There is a gulp watcher for recompiling CSS/restarting the server on changes. Simple run

`
gulp
`

to start the watcher.

There is a bash script that will insert a series of sample data into a database to allow a visual representation of what Jenkings would look like once populated. This can be found at `./test/populate.sh`

Testing
-----

Gulp is configured to run Mocha with code coverage and run Karma unit tests in Phantom

`
gulp mocha
`

`
gulp unit
`
