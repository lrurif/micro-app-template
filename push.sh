#! /bin/bash
git pull
git add .
git commit -m "$1"
# git rev-parse HEAD（获取最新一次提交hash）
commitId=`git rev-parse --short HEAD`
git tag -a "$2" -m "$1" $commitId
git push && git push origin $2