#!/bin/bash

set -e

pushd `dirname "$0"`> /dev/null

ant all
pushd ../build/dist > /dev/null
scp * apt@server.homeki.com:~/deb/unstable

popd > /dev/null

