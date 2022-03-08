
#!/bin/bash
OS="`uname`"
if  [[ $OS == MIN* ]]
then
  echo "Has no watchman"
else
  watchman watch-del-all
fi

cd android && ./gradlew clean && cd ..
npm cache verify && npm cache clean --force && rm -rf **/build/* && rm -rf **/.idea/*
rm -rf ./android/build
rm -rf ./android/app/build
