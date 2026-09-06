import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import {SafeAreaView as RNSSafeAreaView} from 'react-native-safe-area-context';
import { styled } from 'nativewind';
const SafeAreaView =styled(RNSSafeAreaView);
const Home = () => {
    return (
    <SafeAreaView className='p-4'>
      <View>
        <Text
        className='text-2xl text-red-500 font-sans-bold'
        >Home
        </Text>
      </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default Home;
