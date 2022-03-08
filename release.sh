#!/bin/sh
OS="`uname`"

OS=( "1: Android"
        "2: iOS")
echo -e "Please select os:"
for o in "${OS[@]}" ; do
    KEY="${o%%:*}"
    VALUE="${o##*:}"
    printf "%s. %s.\n" "$KEY" "$VALUE"
done
read os

if [[ os -eq 1 ]]
then

  RELEASE_MODE=( "1: APK staging"
          "2: AAB for production")
  echo -e "Please select release mode:"
  for r in "${RELEASE_MODE[@]}" ; do
      KEY="${r%%:*}"
      VALUE="${r##*:}"
      printf "%s. %s.\n" "$KEY" "$VALUE"
  done
  read releaseMode

  clear && clear

  printf "Releasing for %s.\n" "${RELEASE_MODE[releaseMode-1]##*:}"

  if [[ releaseMode -eq 1 ]]
  then
    rm -f ./android/app/src/main/assets/index.android.bundle
    # attach-android-bundle
    react-native bundle --platform android --dev false --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/
    # release
    yarn clean:android && cd android && ./gradlew assembleDebug && cd ..
  else
    yarn clean:android && cd android && ./gradlew assembleRelease && cd ..
  fi
else
  echo "===== iOS ====="
fi


echo "===== Finish ====="
exit


