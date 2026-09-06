import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import {SafeAreaView as RNSSafeAreaView} from 'react-native-safe-area-context';
import { styled } from 'nativewind';
const SafeAreaView =styled(RNSSafeAreaView);
const Camera = () => {
    return (
        <View>
            <Text>Camera</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Camera;
