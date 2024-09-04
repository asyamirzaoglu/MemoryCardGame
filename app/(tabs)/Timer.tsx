import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

interface TimerProps {
  isPlaying: boolean;
  duration: number;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ isPlaying, duration, onComplete }) => (
  <View style={styles.timerContainer}>
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={duration}
      colors={['#28ff7b', '#7dfd7d', '#fff34d', '#fff716', '#ff4d4d', '#ff0000']}
      colorsTime={[duration, duration - 5, duration - 10, 5, 3, 0]}
      onComplete={onComplete}
      size={150}
    >
      {({ remainingTime }) => (
        <Text style={styles.timerText}>
          Kalan Süre{"\n"}<Text style={styles.remainingTime}>{remainingTime}{"\n"}</Text> saniye
        </Text>
      )}
    </CountdownCircleTimer>
  </View>
);

const styles = StyleSheet.create({
  timerContainer: {
    marginBottom: 20,
  },
  timerText: {
    fontSize: 12,
    color: '#4d4d4d',
    textAlign: 'center',
  },
  remainingTime: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Timer;
