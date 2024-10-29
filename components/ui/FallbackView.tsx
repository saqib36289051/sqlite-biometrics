import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {};

const FallbackView = (props: Props) => {
  return (
    <View className="flex h-10 w-10 items-center justify-center bg-orange-300">
      <ActivityIndicator size="small" color="white" />
      <Text>Loading DB...</Text>
    </View>
  );
};

export default FallbackView;

const styles = StyleSheet.create({});
