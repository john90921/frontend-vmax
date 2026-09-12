import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import Button from '@/components/button';
import ItemList from '@/components/item-list';

const goalItems = [
  { id: '1', name: 'Emergency fund', meta: '$420 of $1,000', amount: '42%', progress: 0.42 },
  { id: '2', name: 'Vacation', meta: '$200 of $800', amount: '25%', progress: 0.25 },
  { id: '3', name: 'New laptop', meta: '$150 of $1,200', amount: '13%', progress: 0.13 },
];

const expenseItems = [
  { id: '1', name: 'Coffee', meta: 'Food · Today', amount: '-$4.50' },
  { id: '2', name: 'Groceries', meta: 'Food · Sunday', amount: '-$32.00' },
  { id: '3', name: 'Grab', meta: 'Transport · Saturday', amount: '-$8.20' },
];


const Home = () => {
  const user = {
    name: 'John Doe',
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="pb-8 px-5">
        <View className="pt-2">
          <Text className="text-2xl font-sans-bold text-primary">Hi, {user.name}</Text>
          <View className="balance-card">
            <Text className="home-balance-label">Total Balance</Text>
            <Text className="home-balance-amount">$1,000</Text>
            <View className="home-balance-row">
              <Text className="home-balance-date">Available today</Text>
              <Button title="Add in" variant="onAccent" onPress={() => {}} />
            </View>
          </View>
          <View className="mt-4 flex-row gap-4">
            
            <View className="min-w-0 flex-1 basis-0 rounded-lg border border-border bg-card p-4">
              <Text className="text-sm text-primary mb-2">Today's Total Saving</Text>
              <Text className="text-2xl font-sans-bold text-success">+$1,000</Text>
            </View>
            <View className="min-w-0 flex-1 basis-0 rounded-lg border border-border bg-card p-4">
              <Text className="text-sm text-primary mb-2 ">Today's Total Expenses</Text>
              <Text className="text-2xl font-sans-bold text-destructive">-$1,000</Text>
            </View>
          </View>
        </View>
        <ItemList title="Recent Goals" data={goalItems} variant="goal" action={() => {}} />
        <ItemList title="Recent Expenses" data={expenseItems} variant="expense" action={() => {}} />
      </View>
    </ScrollView>
  );
};

export default Home;
