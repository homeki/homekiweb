#!/bin/bash

# This script installs dependencies used by CircleCI.

DEPS="$BUILD_META_HOME/installed-dependencies"

if [ ! -e $DEPS ]; then
  mkdir $BUILD_META_HOME &&
  touch $DEPS
fi

# don't know how to cache these
sudo apt-get update
sudo apt-get install devscripts debhelper
npm install -g grunt-cli bower

# always run as bundle install will not reinstall and we need to let bundler know
# the custom --path
pushd script > /dev/null && bundle install --path="$BUILD_META_HOME/bundle" && popd > /dev/null
