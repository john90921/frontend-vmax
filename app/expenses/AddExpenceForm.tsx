import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardController } from 'react-native-keyboard-controller';
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
import { useAppState } from '@/context/AppStateContext';

export default function AddExpenceForm() {
  const { expencesState, addExpence } = useAppState();

  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ExpenseFormInput, unknown, ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: getExpenseFormDefaults(),
  });
  const onSubmit = async (values: ExpenseFormValues) => {
    await addExpence({
      amount: values.amount,
      date: values.date,
      time: values.time,
      category: values.category,
      description: values.description
    });
    Alert.alert('Expense saved', `${values.category} · $${values.amount.toFixed(2)}`, [
      { text: 'OK', onPress: () => {console.log('OK pressed'); 
        control._reset();
        KeyboardController.dismiss();
      } },
    ]);
  };

  const handleDismissKeyboard = useCallback(() => {
    KeyboardController.dismiss();
  }, []);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="modal-header">
        <View className="flex-1 pr-3">
          <Text className="modal-title">Add expense</Text>
          <Text className="mt-1 text-sm font-sans-medium text-muted-foreground">
            Fill in the details below
          </Text>
        </View>
        <TouchableOpacity className="modal-close" onPress={() => router.back()}>
          <Text className="modal-close-text">×</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        disableScrollOnKeyboardHide={true}
        ref={scrollViewRef}
        className="flex-1"
        contentContainerClassName="modal-body pb-6"
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
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
          onSelect={handleDismissKeyboard}
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

        <FormPhoto
          control={control}
          name="photoUri"
          label="Photo (optional)"
          scrollViewRef={scrollViewRef}
        />
      </KeyboardAwareScrollView>

      <View
        className="border-t border-border bg-background px-5 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
        <Button
          title={expencesState.loading ? 'Saving…' : 'Save expense'}
          variant="primary"
          styles="w-full"
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
