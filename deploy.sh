#!/usr/bin/env sh

# abort on errors
set -e

rm -drf dist
echo 'Removing old distribution'

# build
npm run build
echo 'Building application'

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAM'

git init
git checkout -b main
git add -A
git commit -m "Deploy de app `date +'%Y-%m-%d %H:%M:%S'`"
echo 'Committing'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:nicoyarce/me.git main:gh-pages
echo 'Pushing'
cd -
echo 'Done'