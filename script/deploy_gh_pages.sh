#!/bin/bash

set -e

if [ $TRAVIS_BRANCH != "master" ]; then
  echo "Not updating gh_pages as this branch isn't master, but $TRAVIS_BRANCH"
  exit 0
fi

GH_PAGES_PATH="$TRAVIS_BUILD_DIR/../gh_pages_repo"

echo "Cloning existing repo..."

git clone \
  "https://${GH_ACCESS_TOKEN}@${GH_PAGES_PRODUCTION_REF}" \
  $GH_PAGES_PATH

cd $GH_PAGES_PATH

git checkout gh-pages

git config user.name 'Alex Plescan'
git config user.email 'alexpls@gmail.com'

echo "Syncing across changes..."

rsync --exclude ".git" --recursive --checksum --delete "$TRAVIS_BUILD_DIR/_site/" "$GH_PAGES_PATH/"

echo "Updating gh-pages branch..."

git add --all . > /dev/null 2>&1
git commit --allow-empty -m "Auto-update gh-pages from master branch"
git push --force --quiet > /dev/null 2>&1

echo "Done!"
