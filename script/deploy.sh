#!/bin/bash

# This script deploys to S3 debian repository.

set -e

DEB_CODENAME=$1

echo $GPG_PRIVATE_KEY | base64 --decode > homeki-private-gpg.asc
set +e
gpg --import homeki-private-gpg.asc
rm homeki-private-gpg.asc
set -e
mv tmp/homeki-web_*_all.deb tmp/homeki-web_${DEB_CODENAME}.deb
pushd script > /dev/null
#bundle exec deb-s3 upload --endpoint s3-eu-west-1.amazonaws.com --sign $GPG_KEY_ID --access-key-id=$S3_ACCESS_KEY --secret-access-key=$S3_ACCESS_SECRET --codename $DEB_CODENAME --prefix packages --bucket repository.homeki.com ../tmp/homeki-web_${DEB_CODENAME}.deb
popd > /dev/null