import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';
import { Link } from 'expo-router';

export default function HomaPage() {
  return (
    <View>
      <Text>This is a homsadasde page</Text>
      <Button 
      title="About" onPress={() => router.push('/Home')}
      />
    </View>
  );
}