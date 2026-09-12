import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Template = ({ children }: { children: React.ReactNode }) => {
    return (
        <ScrollView className="flex-1 bg-background">
        <View className="pb-8 px-5">
            {children}
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default Template;
