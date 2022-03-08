import BackgroundService from 'react-native-background-actions';

const useBackgroundService = () => {
  const start = async <BackgroundServiceParam>(
    scheme: string,
    param: BackgroundServiceParam,
    callback: (taskData: BackgroundServiceParam | undefined) => Promise<void>,
  ): Promise<void> => {
    const options = {
      taskName: 'Example',
      taskTitle: 'ExampleTask title',
      taskDesc: 'ExampleTask description',
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#ff00ff',
      linkingURI: scheme, // See Deep Linking for more info
      parameters: param,
    };
    console.log('start service');
    await BackgroundService.start(callback, options);
    // await BackgroundService.updateNotification({
    //   taskDesc: 'New ExampleTask description',
    // }); // Only Android, iOS will ignore this call
    // iOS will also run everything here in the background until .stop() is called
    // await BackgroundService.stop();
  };

  const stop = async (): Promise<void> => {
    await BackgroundService.stop();
  };

  const updateNotification = async (
    param: UpdateNotificationParam,
  ): Promise<void> => {
    await BackgroundService.updateNotification({
      taskDesc: param.description,
    }); // Only Android, iOS will ignore this call
  };

  const isRunning = async (): Promise<boolean> => {
    return BackgroundService.isRunning();
  };

  return {start, stop, updateNotification, isRunning};
};

export interface BackgroundServiceParam {
  delay: number | undefined;
}

export interface UpdateNotificationParam {
  description: string;
}

export default useBackgroundService;
