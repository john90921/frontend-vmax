import { Tabs } from 'expo-router';
import React from 'react';

import { AppScreenHeader } from '@/components/app-screen-header';
import { AppTabBar } from '@/components/app-tab-bar';
import { colors } from '@/constants/theme';
import { BackHandler } from 'react-native';

const TAB_TITLES: Record<string, string> = {
  Home: 'Home',
  Expences: 'Expenses',
  Camera: 'Camera',
  Saving: 'Saving',
  Setting: 'Setting',
};

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={({ route }) => ({
        sceneStyle: { backgroundColor: colors.background },
        header: () => <AppScreenHeader title={TAB_TITLES[route.name] ?? route.name} />,
      })}>
      <Tabs.Screen name="HomePage" options={{ title: 'Home' }} />
      <Tabs.Screen name="ExpencesPage" options={{ title: 'Expenses' }} />
      <Tabs.Screen name="CameraPage" options={{ title: 'Camera', header: () => <AppScreenHeader  title="Camera"  /> }} />
      <Tabs.Screen name="SavingPage" options={{ title: 'Saving' }} />
      <Tabs.Screen name="SettingPage" options={{ title: 'Setting' }} />
    </Tabs>
  );
}
