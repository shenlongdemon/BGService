/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';

import {Linking} from 'react-native';

import useBackgroundService, {
  BackgroundServiceParam,
} from './background_services/useBackgroundService';

const App = () => {
  const {
    start: startBGService,
    stop: stopBGService,
    isRunning: isBGServiceRunning,
    updateNotification,
  } = useBackgroundService();
  const sleep = (time: number) =>
    new Promise<void>(resolve => setTimeout(() => resolve(), time));

  // You can do anything in your task such as network requests, timers and so on,
  // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
  // React Native will go into "paused" mode (unless there are other tasks running,
  // or there is a foreground app).
  const veryIntensiveTask = async (taskDataArguments: any) => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async _resolve => {
      let i: number = 0;
      while (true) {
        const isRunning: boolean = await isBGServiceRunning();
        if (!isRunning) {
          break;
        }
        const msg: string = 'BackgroundService ' + i;
        // console.log(msg);
        ToastAndroid.show(msg, 1000);
        await updateNotification({description: msg});
        await sleep(delay);
        i += 1;
      }
    });
  };

  useEffect(() => {
    (async function (): Promise<void> {
      const param: BackgroundServiceParam = {delay: 1000};
      await startBGService('bgservice://chat/jane', param, veryIntensiveTask);
    })();
    Linking.addEventListener('url', handleOpenURL);

    function handleOpenURL(evt) {
      // Will be called when the notification is pressed
      ToastAndroid.show('Linking ' + JSON.stringify(evt), 3000);
      console.log(evt.url);
      // do something
    }
  }, []);

  const stop = async (): Promise<void> => {
    console.log('stop service');
    await stopBGService();
    await updateNotification({description: 'close'});
  };

  return (
    <SafeAreaView>
      <TouchableHighlight onPress={stop}>
        <Text>Close</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default App;
