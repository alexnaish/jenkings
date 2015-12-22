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
			sleep 0.2
			curl --data "jobName=$job&project=$project&buildId=$i&result=$selectedStatus&branch=${2-$defaultBranch}&node=slave01&gitCommit=someSampleGitCommit" http://$1/api/jobs &
		done
	done
done

for shard in {1..6}
do
	selectedStatus=${status[$RANDOM % ${#status[@]} ]}
	sleep 0.2
	curl --data "jobName=protractor-shard&shard=$shard&project=e2e&buildId=1&result=$selectedStatus&branch=${2-$defaultBranch}&node=slave01&gitCommit=someSampleGitCommit" http://$1/api/jobs &
done

wait