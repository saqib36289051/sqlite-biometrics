import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Slot, Stack, useRouter } from 'expo-router';

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [isCompatible, setIsCompatible] = React.useState(false);
  useEffect(() => {
    checkCompatibility();
  }, []);

  if (isCompatible) {
    onAuthenticate();
  }

  async function checkCompatibility() {
    const compatibilit = await LocalAuthentication.hasHardwareAsync();
    setIsCompatible(compatibilit);
  }

  async function onAuthenticate() {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Touch ID',
      fallbackLabel: 'Enter Password',
    });

    if (auth.success) {
      router.replace('/addTask');
    }
  }
  return (
    <View className="flex-1 items-center justify-center">
      <Text> Local Authentication</Text>
      <Pressable onPress={onAuthenticate}>
        <Text>Touch ID</Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
