import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@/constants/theme';

const AVATAR_INITIALS = 'JD';

type AppScreenHeaderProps = {
  title: string;
};
const DATA = [
  { id: '1', title: 'First Item' },
  { id: '2', title: 'Second Item' },
  { id: '3', title: 'Third Item' },
];
export function AppScreenHeader({ title }: AppScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="border-b border-border bg-background px-5 pb-3" style={{ paddingTop: Math.max(insets.top, spacing[3]) }}>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="mb-0.5 text-xs font-sans-semibold uppercase tracking-[1px] text-muted-foreground">Vmaxx</Text>
        </View>
        <View>
          <Text className="text-2xl font-sans-bold text-primary">{title}</Text>
        </View>
        <View className="size-11 items-center justify-center rounded-full border-2 border-accent bg-muted" accessibilityLabel="Profile photo">
          <Text className="text-sm font-sans-bold text-primary">{AVATAR_INITIALS}</Text>
        </View>
      </View>
    </View>
  );
}
