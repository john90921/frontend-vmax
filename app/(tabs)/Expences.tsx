import { router } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';

import Button from '@/components/button';
import { colors, spacing } from '@/constants/theme';
import { ExpenceType } from '@/types/Expence';

const SEED_EXPENSES: ExpenceType[] = [
  { id: 1, name: 'Coffee', amount: 4.5, date: '2026-09-09', time: '10:00' },
  { id: 2, name: 'Coffee', amount: 4.5, date: '2026-09-09', time: '10:00' },
  { id: 3, name: 'Coffee', amount: 4.5, date: '2026-09-07', time: '10:00' },
  { id: 4, name: 'Coffee', amount: 4.5, date: '2026-09-06', time: '10:00' },
  { id: 5, name: 'Coffee', amount: 4.5, date: '2026-09-05', time: '10:00' },
  { id: 6, name: 'Coffee', amount: 4.5, date: '2026-09-04', time: '10:00' },
  { id: 7, name: 'Coffee', amount: 4.5, date: '2026-09-03', time: '10:00' },
  { id: 8, name: 'Coffee', amount: 4.5, date: '2026-09-02', time: '10:00' },
  { id: 9, name: 'Coffee', amount: 4.5, date: '2026-09-01', time: '10:00' },
  { id: 10, name: 'Coffee', amount: 4.5, date: '2026-08-31', time: '10:00' },
];

function formatAmount(amount: number) {
  return `-$${amount.toFixed(2)}`;
}

function formatDateLabel(date: string) {
  const today = new Date().toISOString().slice(0, 10);
  if (date === today) return 'Today';

  const parsed = new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function sortExpenses(list: ExpenceType[]) {
  return [...list].sort((a, b) => {
    if (a.date === b.date) return b.time.localeCompare(a.time);
    return b.date.localeCompare(a.date);
  });
}

function ExpenseRow({ expense }: { expense: ExpenceType }) {
  return (
    <View className="sub-card">
      <View className="flex-row items-center justify-between gap-3">
        <View className="min-w-0 flex-1">
          <Text className="sub-title">{expense.name}</Text>
          <Text className="sub-meta">
            {formatDateLabel(expense.date)} · {expense.time}
          </Text>
        </View>
        <Text className="shrink-0 text-lg font-sans-bold text-destructive">
          {formatAmount(expense.amount)}
        </Text>
      </View>
    </View>
  );
}

const Expences = () => {
  const [items, setItems] = useState<ExpenceType[]>(SEED_EXPENSES);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const data = useMemo(() => sortExpenses(items), [items]);

  const totalSpent = useMemo(
    () => items.reduce((sum, item) => sum + item.amount, 0),
    [items],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setItems(SEED_EXPENSES);
      setHasMore(true);
      setHasScrolled(false);
      setRefreshing(false);
    }, 800);
  }, []);

  const loadMore = useCallback(async () => {
    if (!hasScrolled || loadingMore || refreshing || !hasMore) return;

    setLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setItems((prev) => {
      const nextId = prev.reduce((max, item) => Math.max(max, item.id), 0) + 1;
      const page: ExpenceType[] = Array.from({ length: 5 }, (_, index) => ({
        id: nextId + index,
        name: `Expense ${nextId + index}`,
        amount: Number((Math.random() * 80 + 5).toFixed(2)),
        date: '2026-08-28',
        time: `${10 + index}:00`,
      }));
      return [...prev, ...page];
    });

    // One extra page for demo; API would set this from response
    setHasMore(false);
    setLoadingMore(false);
  }, [hasMore, hasScrolled, loadingMore, refreshing]);

  const renderItem = useCallback(
    ({ item, index }: { item: ExpenceType; index: number }) => {
      const previous = data[index - 1];
      const isNewDate = !previous || item.date !== previous.date;

      return (
        <View className="mb-3 gap-3">
          {isNewDate ? (
            <Text className="mt-1 text-sm font-sans-semibold uppercase tracking-[1px] text-muted-foreground">
              {formatDateLabel(item.date)}
            </Text>
          ) : null}
          <ExpenseRow expense={item} />
        </View>
      );
    },
    [data],
  );

  return (
    <View className="flex-1 bg-background">
      <FlatList
        className="flex-1 bg-background"
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: spacing[5],
          paddingBottom: spacing[8],
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        ListHeaderComponent={
        <View className="flex-1 items-end justify-end">
           <Button
             title=""
             icon="add"
             variant="outline"
             onPress={() => router.push('../expenses/AddExpence')}
           />
        </View>}
        onScrollBeginDrag={() => setHasScrolled(true)}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadingMore ? (
            <View className="items-center py-4">
              <ActivityIndicator size="small" color={colors.accent} />
              <Text className="mt-2 text-sm font-sans-medium text-muted-foreground">
                Loading more…
              </Text>
            </View>
          ) : !hasMore && data.length > 0 ? (
            <Text className="py-4 text-center text-sm font-sans-medium text-muted-foreground">
              You’re all caught up
            </Text>
          ) : null
        }
        ListEmptyComponent={<Text className="home-empty-state">No expenses yet</Text>}
      />
    </View>
  );
};

export default Expences;
