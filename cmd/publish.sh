#!/bin/sh
set -e

if [ -z "$1" ]; then
  echo "Require a release description!"
  exit 1
fi

if [ ! -f .env ]; then
  echo "Require a .env file!"
  exit 1
fi

read_var() {
  if [ -z "$1" ]; then
    echo "environment variable name is required" > /dev/stderr
    exit 1
  fi

  local ENV_FILE='.env'
  local VAR=$(grep $1 "$ENV_FILE" | xargs)
  IFS="=" read -ra VAR <<< "$VAR"
  if [ -z ${VAR[1]} ]; then
    echo "environment variable name $1 is required in .env" > /dev/stderr
    exit 1
  fi
  echo ${VAR[1]}
}

WORKING_DIR=$(pwd)
PUBLISH_SRC_DIR=$(read_var PUBLISH_SRC_DIR)
PUBLISH_TMP_DIR=$(read_var PUBLISH_TMP_DIR)
PUBLISH_GIT_REPOSITORY=$(read_var PUBLISH_GIT_REPOSITORY)
PUBLISH_BRANCH=$(read_var PUBLISH_BRANCH)

echo "---------- BUILDING ⚒"

# this step is to build the image
./cmd/base.sh \
  -f ./docker/build.yml \
  -f ./docker/publish.yml \
  build frontend_client

# this step mount the volumes so we can retry the builded directory
./cmd/base.sh \
  -f ./docker/build.yml \
  -f ./docker/publish.yml \
  run --rm frontend_client

if [ $? != 0 ]; then
  echo "\n\n---------- ERRORS ENCOUNTERED. WON'T PUBLISH.\n\n"
  exit 1
fi

if [ -d "$PUBLISH_TMP_DIR" ]; then
  echo "\n\n---------- REMOVE EXISTING RELEASE FOLDER.\n"
  rm -Rf $PUBLISH_TMP_DIR
fi

echo "\n\n---------- CLONING RELEASE REPO.\n"

git clone $PUBLISH_GIT_REPOSITORY $PUBLISH_TMP_DIR

cd $PUBLISH_TMP_DIR

# move to selected branch
if [ $(git ls-remote --heads $PUBLISH_GIT_REPOSITORY $PUBLISH_BRANCH | wc -l) == "1" ]; then
    git checkout $PUBLISH_BRANCH
    NEW_BRANCH='0'
else
    NEW_BRANCH='1'
fi

# clean directory
rm -rf $(ls | grep -v ".git")

#if new branch, create it
if [ "$NEW_BRANCH" -eq "1" ] ; then
    git checkout -b $PUBLISH_BRANCH
fi

cd $WORKING_DIR

echo "\n\n---------- COPYING PUBLIC FILES IN RELEASE REPO.\n"
cp -r $PUBLISH_SRC_DIR/* $PUBLISH_TMP_DIR

echo "\n\n---------- EXTRA COMMAND FOR FRONTEND FOLDER.\n"
if [ -d ./frontend/common/assets/optimized ]; then
  cp -r ./frontend/common/assets/optimized $PUBLISH_TMP_DIR/assets
fi
rm -rf $PUBLISH_TMP_DIR/_errors
rm -rf $PUBLISH_TMP_DIR/en
rm -rf $PUBLISH_TMP_DIR/it
rm -rf $PUBLISH_TMP_DIR/storybook
rm -rf $PUBLISH_TMP_DIR/assets/.tommy.db
rm -rf $PUBLISH_TMP_DIR/assets/audio

cd $PUBLISH_TMP_DIR

echo "---------- PUSHING CHANGES ⏫"
if [[ ! -z "`git status --porcelain`" ]]; then
  echo "---------- CHANGES DETECTED. COMMITTING TO REPO. 👌🏻"
  git add .
  git commit -m "$1"
  git push origin master
else
  echo "---------- NO CHANGE DETECTED. ❌"
fi

echo "---------- REMOVING RELEASE REPO DIRECTORY"

cd $WORKING_DIR
rm -rf $PUBLISH_TMP_DIR
echo "---------- DONE ----------"

