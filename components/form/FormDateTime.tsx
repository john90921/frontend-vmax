import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { Controller, FieldValues, Path, useWatch } from 'react-hook-form';

import { colors } from '@/constants/theme';
import { FormDateTimeProps } from '@/types/FormDateTimeProps';

function parseLocalDate(date: string, time: string) {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  return new Date(year, (month || 1) - 1, day || 1, hours || 0, minutes || 0);
}

function formatDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTime(value: Date) {
  return `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;
}

function formatDisplayDate(date: string) {
  const parsed = parseLocalDate(date, '00:00');
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function FormDateTimeField<T extends FieldValues>({
  control,
  name,
  mode,
  label,
  displayValue,
}: {
  control: FormDateTimeProps<T>['control'];
  name: Path<T>;
  mode: 'date' | 'time';
  label: string;
  displayValue: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const current =
          typeof value === 'string' && value.length > 0
            ? mode === 'date'
              ? parseLocalDate(value, '12:00')
              : parseLocalDate('2000-01-01', value)
            : new Date();

        const onPickerChange = (event: DateTimePickerEvent, selected?: Date) => {
          if (Platform.OS === 'android') {
            setOpen(false);
          }
          if (event.type === 'dismissed' || !selected) {
            return;
          }
          onChange(mode === 'date' ? formatDate(selected) : formatTime(selected));
        };

        return (
          <View className="flex-1 gap-2">
            <Text className="auth-label">{label}</Text>
            <TouchableOpacity
              className={`auth-input ${error ? 'auth-input-error' : ''}`}
              onPress={() => setOpen(true)}>
              <Text className="text-base font-sans-medium text-primary">{displayValue}</Text>
            </TouchableOpacity>
            {error?.message ? <Text className="auth-error">{error.message}</Text> : null}

            {open ? (
              <DateTimePicker
                value={current}
                mode={mode}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onPickerChange}
                themeVariant="light"
                accentColor={colors.accent}
              />
            ) : null}

            {Platform.OS === 'ios' && open ? (
              <TouchableOpacity className="picker-option" onPress={() => setOpen(false)}>
                <Text className="picker-option-text-active">Done</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        );
      }}
    />
  );
}

function FormDateTime<T extends FieldValues>({
  control,
  dateName,
  timeName,
  label = 'Date & time',
}: FormDateTimeProps<T>) {
  const date = useWatch({ control, name: dateName }) as string;
  const time = useWatch({ control, name: timeName }) as string;

  return (
    <View className="auth-field">
      <Text className="auth-label">{label}</Text>
      <View className="picker-row">
        <FormDateTimeField
          control={control}
          name={dateName}
          mode="date"
          label="Date"
          displayValue={date ? formatDisplayDate(date) : 'Pick date'}
        />
        <FormDateTimeField
          control={control}
          name={timeName}
          mode="time"
          label="Time"
          displayValue={time || 'Pick time'}
        />
      </View>
    </View>
  );
}

export default FormDateTime;
