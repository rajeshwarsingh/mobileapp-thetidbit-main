import { View, Button } from 'react-native';
import * as Updates from 'expo-updates';
import Bugsnag from '@bugsnag/expo'
import { useEffect } from 'react';
Bugsnag.start('9376438721fe01274c9f1939f51219ac')

export default function App() {

  async function onFetchUpdateAsync() {
    alert(`update:${Updates?.releaseChannel}`)
    alert(`updatemainifest:${Updates?.manifest?.releaseChannel}`)
    
    try {
      const update = await Updates.checkForUpdateAsync();
      alert(`updatemainifest update:${update?JSON.stringify(update):''}`)
      Bugsnag.notify(new Error(`${update?(JSON.stringify(update)):""}`), {
        severity: 'info',
      });

      if (update.isAvailable) {
        alert('update.isAvailable');
        const updateFetch = await Updates.fetchUpdateAsync();
        alert(`updateFetch :${updateFetch?JSON.stringify(updateFetch):''}`)
        Bugsnag.notify(new Error(`${updateFetch?(updateFetch.stringify(updateFetch)):""}`), {
          severity: 'info',
        });

        const UpdatesReloadAsync = await Updates.reloadAsync();
        alert(`UpdatesReloadAsync :${UpdatesReloadAsync?JSON.stringify(UpdatesReloadAsync):''}`)
        Bugsnag.notify(new Error(`${UpdatesReloadAsync?(UpdatesReloadAsync.stringify(UpdatesReloadAsync)):""}`), {
          severity: 'info',
        });

      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  const eventListener = (event) => {
    alert(`EVENT FIRES ${event}`)
    if (event.type === Updates.UpdateEventType.ERROR) {
      // Handle error
      alert('UPDATE ERROR');
    } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
      // Handle no update available
      alert('UPDATE NO_UPDATE_AVAILABLE');
    } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      // Handle update available
      alert('UPDATE UPDATE_AVAILABLE');
    }
  };

  useEffect(()=>{
    Bugsnag.notify(new Error('Test error'))
  },[])

  Updates.useUpdateEvents(eventListener);

  return (
    <View>
      <Button title="Fetch update 1 - looking for change" onPress={onFetchUpdateAsync} />
    </View>
  );
}
