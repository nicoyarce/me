#!/usr/bin/env sh

# abort on errors
set -e

rm -drf dist

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m "Deploy de app `date +'%Y-%m-%d %H:%M:%S'`"

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:nicoyarce/me.git main:gh-pages

cd -