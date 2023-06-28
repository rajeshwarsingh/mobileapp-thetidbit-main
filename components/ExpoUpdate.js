import { View, Button } from 'react-native';
import * as Updates from 'expo-updates';

export default function App() {

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        alert('update.isAvailable:true')
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
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

  Updates.useUpdateEvents(eventListener);

  return (
    <View>
      <Button title="Fetch update" onPress={onFetchUpdateAsync} />
    </View>
  );
}
