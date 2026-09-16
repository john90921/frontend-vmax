import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/button';
import { colors } from '@/constants/theme';
import { useAppState } from '@/context/AppStateContext';

function formatAmount(amount: number) {
  return `-$${amount.toFixed(2)}`;
}

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return time;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
}) {
  return (
    <View className="sub-row">
      <View className="sub-row-copy">
        <Ionicons name={icon} size={18} color={colors.mutedForeground} />
        <Text className="sub-label">{label}</Text>
      </View>
      <Text className="text-right font-sans-bold text-primary">{value}</Text>
    </View>
  );
}

export default function ExpenceDetail() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { expencesState } = useAppState();

  const expense = useMemo(
    () => expencesState.expences.find((item) => String(item.id) === String(id)),
    [expencesState.expences, id],
  );

  const handleEdit = () => {
    router.push('/expenses/AddExpenceForm');
  };

  const handleDelete = () => {
    Alert.alert('Delete expense', 'This will remove the expense from the list.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="modal-header">
        <TouchableOpacity
          className="size-8 items-center justify-center"
          onPress={() => router.back()}
          hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <Text className="modal-title flex-1 pl-2">Expense Detail</Text>
      </View>

      {!expense ? (
        <View className="flex-1 items-center justify-center px-5">
          <Text className="home-empty-state text-center">Expense not found</Text>
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1"
            contentContainerClassName="px-5 py-6"
            showsVerticalScrollIndicator={false}>
            <View className="sub-card bg-card">
              <View className="items-center pb-6">
                <View className="category-chip category-chip-active mb-4">
                  <Text className="category-chip-text-active">{expense.category ?? 'Other'}</Text>
                </View>
                <Text className="text-4xl font-sans-bold text-destructive">
                  {formatAmount(expense.amount)}
                </Text>
                <Text className="mt-1 text-sm font-sans-semibold uppercase tracking-[1px] text-muted-foreground">
                  USD
                </Text>
              </View>

              <View className="sub-details">
                <DetailRow icon="calendar-outline" label="Date" value={formatDate(expense.date)} />
                <DetailRow icon="time-outline" label="Time" value={formatTime(expense.time)} />
                <DetailRow
                  icon="pricetag-outline"
                  label="Category"
                  value={expense.category ?? 'Other'}
                />

                <View className="gap-2">
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="document-text-outline" size={18} color={colors.mutedForeground} />
                    <Text className="sub-label">Description</Text>
                  </View>
                  <View className="rounded-2xl bg-muted px-4 py-3">
                    <Text className="text-sm font-sans-medium leading-5 text-primary">
                      {expense.description?.trim() || 'No description'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View
            className="flex-row gap-3 border-t border-border bg-background px-5 pt-4"
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
            <Button title="Edit" variant="outline" styles="flex-1" icon="create-outline" onPress={handleEdit} />
            <Button title="Delete" variant="primary" styles="flex-1" icon="trash-outline" onPress={handleDelete} />
          </View>
        </>
      )}
    </View>
  );
}
