import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { CommonActions } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/constants/theme';

const TAB_ICONS = {
  home: { outline: 'home-outline', filled: 'home' },
  expence: { outline: 'receipt-outline', filled: 'receipt' },
  camera: { outline: 'camera-outline', filled: 'camera' },
  saving: { outline: 'cash-outline', filled: 'cash' },
  setting: { outline: 'settings-outline', filled: 'settings' },
} as const;

type TabRouteName = keyof typeof TAB_ICONS;

export function AppTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, spacing[3]) }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          const isCamera = route.name === 'camera';
          const iconSet = TAB_ICONS[route.name as TabRouteName] ?? TAB_ICONS.home;
          const label =
            options.title ??
            (typeof options.tabBarLabel === 'string' ? options.tabBarLabel : route.name);


          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (process.env.EXPO_OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }

            if (!focused && !event.defaultPrevented) {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          };

          return (
            <PlatformPressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              onPress={onPress}
              onLongPress={() => {
                navigation.emit({ type: 'tabLongPress', target: route.key });
              }}
              style={styles.item}>
              {isCamera ? (
                <View style={[styles.cameraFab, focused && styles.cameraFabFocused]}>
                  <Ionicons name="camera" size={24} color={colors.background} />
                </View>
              ) : (
                <View style={styles.sideItem}>
                  <Ionicons
                    name={focused ? iconSet.filled : iconSet.outline}
                    size={22}
                    color={focused ? colors.accent : 'rgba(255,249,227,0.5)'}
                  />
                  <Text style={[styles.label, focused && styles.labelActive, { fontFamily: 'sans-medium' }]}>{label}</Text>
                </View>
              )}
            </PlatformPressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.primary,

  },
  bar: {
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  sideItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '600',
    color: 'rgba(255,249,227,0.45)',
  },
  labelActive: {
    color: colors.accent,
  },
  cameraFab: {
    width: 56,
    height: 56,
    marginTop: -28,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderWidth: 4,
    borderColor: colors.background,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  cameraFabFocused: {
    transform: [{ scale: 1.04 }],
  },
});
