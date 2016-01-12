#!/bin/bash

if (( $# < 1 )); then
    echo "Please specify Jenkings URL:PORT as the first parameter!"
	exit
fi

defaultBranch="master"
projectNames=("ui" "api")
jobNames=("unit-tests" "integration-tests")
status=("FAILURE" "SUCCESS" "ABORTED")

# insert a dummy location to use within the test data
res=`curl --data "name=myTestLocation&urlTemplate=http%3A%2F%2Ftest.jenkings.com%2F%7BjobName%7D%2F%7BbuildId%7D" http://$1/api/locations`

IFS=','
array=( $res )
location=${array[3]#*:}
location=${location//\"}
echo "LocationID: $location"
echo "====================="


for project in "${projectNames[@]}"
do
	for job in "${jobNames[@]}"
	do
		for i in {1..5}
		do
			selectedStatus=${status[$RANDOM % ${#status[@]} ]}
			sleep 0.2
			curl --data "location=$location&jobName=$job&project=$project&buildId=$i&result=$selectedStatus&branch=${2-$defaultBranch}&node=slave01&gitCommit=someSampleGitCommit" http://$1/api/jobs &
		done
	done
done

for shard in {1..6}
do
	selectedStatus=${status[$RANDOM % ${#status[@]} ]}
	sleep 0.2
	curl --data "location=$location&jobName=protractor-shard&shard=$shard&project=e2e&buildId=1&result=$selectedStatus&branch=${2-$defaultBranch}&node=slave01&gitCommit=someSampleGitCommit" http://$1/api/jobs &
done

wait
