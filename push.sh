#! /bin/bash
git pull
echo $1
echo $2
echo $commitId
git add .
git commit -m "$1"
commitId=`git rev-parse --short HEAD`
git tag $2 commitId
# git push