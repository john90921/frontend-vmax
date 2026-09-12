import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/button';
import FormDateTime from '@/components/form/FormDateTime';
import FormInput from '@/components/form/FormInput';
import FormPhoto from '@/components/form/FormPhoto';
import FormSelect from '@/components/form/FormSelect';
import {
  EXPENSE_CATEGORIES,
  ExpenseFormInput,
  ExpenseFormValues,
  expenseFormSchema,
  getExpenseFormDefaults,
} from '@/schemas/expense';

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
export default function AddExpense() {
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ExpenseFormInput, unknown, ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: getExpenseFormDefaults(),
  });

  const onSubmit = (values: ExpenseFormValues) => {
    Alert.alert('Expense saved', `${values.category} · $${values.amount.toFixed(2)}`, [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{
      padding: 20,
      paddingBottom: 100,
    }}
    bottomOffset={80}

      // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={100}
      style={{ paddingTop: insets.top }}>
      <View className="modal-header">
        <Text className="modal-title">Add expense</Text>
        <TouchableOpacity className="modal-close" onPress={() => router.back()}>
          <Text className="modal-close-text">×</Text>
        </TouchableOpacity>
      </View>

      {/* <ScrollView
        className="flex-1"
        contentContainerClassName="modal-body pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}> */}
        <FormInput
          control={control}
          name="amount"
          label="Amount"
          placeholder="0.00"
          keyboardType="decimal-pad"
        />

        <FormDateTime control={control} dateName="date" timeName="time" />

        <FormSelect
          control={control}
          name="category"
          label="Category"
          options={EXPENSE_CATEGORIES}
        />

        <FormInput
          control={control}
          name="description"
          label="Description"
          placeholder="What was this for?"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={{ minHeight: 100 }}
        />
        <View className="flex-1 w-full">
        <FormPhoto control={control} name="photoUri" label="Photo (optional)" />
        </View>
        <View className="flex-1 items-end justify-end">
        <Button
          title={isSubmitting ? 'Saving…' : 'Save expense'}
          variant="primary"
          styles="mt-2"
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
        </View>

      {/* </ScrollView> */}
    </KeyboardAwareScrollView>
  );
}
