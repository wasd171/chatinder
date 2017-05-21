#!/usr/bin/env sh

set -ev

if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then
    export KEYCHAIN=build.keychain;
    security create-keychain -p mysecretpassword $KEYCHAIN;
    security default-keychain -s $KEYCHAIN;
    security unlock-keychain -p mysecretpassword $KEYCHAIN;
    security import cert.p12 -k $KEYCHAIN -P   $CERTIFICATE_PASSWORD -T /usr/bin/codesign;
fi

exit 0;