#!/bin/bash

if (( $# < 1 )); then
    echo "Please specify Jenkings URL:PORT as the first parameter!"
	exit
fi

defaultBranch="master"
projectNames=("ui" "api")
jobNames=("unit-tests" "integration-tests")
status=("FAILURE" "SUCCESS" "ABORTED")

for project in "${projectNames[@]}"
do
	for job in "${jobNames[@]}"
	do
		for i in {1..5}
		do
			selectedStatus=${status[$RANDOM % ${#status[@]} ]}
			curl --data "jobName=$job&project=$project&buildId=$i&result=$selectedStatus&branch=${2-$defaultBranch}&node=slave01&gitCommit=someSampleGitCommit" http://$1/api/jobs &
		done
	done
done

wait