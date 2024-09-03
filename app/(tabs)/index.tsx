import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import GameScreen from './gameScreen';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <GameScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
