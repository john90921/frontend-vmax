import { Tabs } from 'expo-router';
import React from 'react';

import { AppTabBar } from '@/components/app-tab-bar';
import { colors } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="expence"
        options={{
          title: 'Expense',
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
        }}
      />
      <Tabs.Screen
        name="saving"
        options={{
          title: 'Saving',
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
        }}
      />
    </Tabs>
  );
}
