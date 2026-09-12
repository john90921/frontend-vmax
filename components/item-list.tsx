import { Text, View } from 'react-native';
import Button from './button';
export type ListItem = {
  id: string;
  name: string;
  meta: string;
  amount: string;
  progress?: number;
};

type ItemListProps = {
  title?: string;
  data: ListItem[];
  variant?: 'goal' | 'expense';
  action?: () => void;
};

export default function ItemList({ title, data, variant = 'expense', action }: ItemListProps) {
  const emptyLabel = variant === 'goal' ? 'No goals yet' : 'No expenses yet';

  return (
    <View>
      <View className="list-head">
        <Text className="list-title">{title}</Text>
        <Button title="View All" variant="outline" onPress={() => {}}/>
  
      </View>
      {data.length === 0 ? (
        <View className="flex items-center justify-center">
            <Text className="home-empty">{emptyLabel}</Text>
        </View>
      ) : (
        <View className="gap-3">
          {data.map((item) =>
            variant === 'goal' ? <GoalRow key={item.id} item={item} /> : <ExpenseRow key={item.id} item={item} />,
          )}
        </View>
      )}
    </View>
  );
}

function GoalRow({ item }: { item: ListItem }) {
  const progress = Math.min(Math.max(item.progress ?? 0, 0), 1);

  return (
    <View className="sub-card">
      <View className="flex-row items-center justify-between gap-3">
        <View className="min-w-0 flex-1">
          <Text className="sub-title">{item.name}</Text>
          <Text className="sub-meta">{item.meta}</Text>
        </View>
        <Text className="shrink-0 text-lg font-sans-bold text-primary">{item.amount}</Text>
      </View>
      <View className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <View className="h-2 rounded-full bg-subscription" style={{ width: `${progress * 100}%` }} />
      </View>
  </View>
  );
}

function ExpenseRow({ item }: { item: ListItem }) {
  return (
    <View className="sub-card">
      <View className="flex-row items-center justify-between gap-3">
        <View className="min-w-0 flex-1">
          <Text className="sub-title">{item.name}</Text>
          <Text className="sub-meta">{item.meta}</Text>
        </View>
        <Text className="shrink-0 text-lg font-sans-bold text-destructive">{item.amount}</Text>
      </View>
    </View>
  );
}
