echo ""
echo ""
echo "                                                            __ "
echo " _____             _                          _ _          |  |"
echo "|   __|___ ___ ___| |_    ___ ___ _____ _____|_| |_ ___ ___|  |"
echo "|   __| -_|  _|_ -|  _|  |  _| . |     |     | |  _| -_|   |__|"
echo "|_____|___|_| |___|_|    |___|___|_|_|_|_|_|_|_|_| |___|_|_|__|"
echo ""
echo ""

npm run deploy
git checkout gh-pages
cp -a $HOME/Desktop/geluk/build/* $HOME/Desktop/geluk/
git status
git add -A
git commit -m "gh page deploy"
git push
git checkout master