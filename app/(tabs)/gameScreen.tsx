import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Button, Animated, Modal } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const images = [
  require('../../assets/images/icon1.png'),
  require('../../assets/images/icon2.png'),
  require('../../assets/images/icon3.png'),
  require('../../assets/images/icon4.png'),
  require('../../assets/images/icon5.png'),
  require('../../assets/images/icon6.png'),
  require('../../assets/images/icon7.png'),
  require('../../assets/images/icon8.png'),
  require('../../assets/images/icon9.png'),
  require('../../assets/images/icon10.png'),
  require('../../assets/images/icon11.png'),
  require('../../assets/images/icon12.png'),
  require('../../assets/images/icon13.png'),
  require('../../assets/images/icon14.png'),
  require('../../assets/images/icon15.png'),
  require('../../assets/images/icon16.png'),
  require('../../assets/images/icon17.png'),
  require('../../assets/images/icon18.png'),
  require('../../assets/images/icon19.png'),
  require('../../assets/images/icon20.png'),
];

const BACKGROUND_CARD = require('../../assets/images/backgroundcard.png');
const FRONT_CARD = require('../../assets/images/frontcard.png');

interface Card {
  id: number;
  icon: any;
  isFlipped: boolean;
  isMatched: boolean;
}

const generateCards = (numCards: number) => {
  const selectedImages = images.slice(0, numCards / 2);
  const cards: Card[] = selectedImages.concat(selectedImages).map((icon, index) => ({
    id: index,
    icon,
    isFlipped: false,
    isMatched: false,
  }));

  return cards.sort(() => Math.random() - 0.5);
};

export default function GameScreen() {
  const [cards, setCards] = useState<Card[]>(generateCards(10));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timerKey, setTimerKey] = useState<number>(0);
  const [timerDuration, setTimerDuration] = useState<number>(20);
  const [settingsChanged, setSettingsChanged] = useState<boolean>(false);
  const [cardCount, setCardCount] = useState<number>(10);

  const flipAnimations = useRef<Animated.Value[]>([]);

  useEffect(() => {
    // Update cards and flipAnimations when cardCount changes
    const newCards = generateCards(cardCount);
    setCards(newCards);
    flipAnimations.current = newCards.map(() => new Animated.Value(0));
  }, [cardCount]);

  useEffect(() => {
    if (timerStarted && !gameWon && !timeUp) {
      setIsPlaying(true);
      setTimeUp(false);
    }
  }, [timerStarted, gameWon, timeUp]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.icon === secondCard.icon) {
        setCards(prevCards => prevCards.map(card =>
          card.icon === firstCard.icon ? { ...card, isMatched: true } : card
        ));
      } else {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(flipAnimations.current[firstIndex], {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(flipAnimations.current[secondIndex], {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            setCards(prevCards =>
              prevCards.map((card, index) => (index === firstIndex || index === secondIndex
                ? { ...card, isFlipped: false }
                : card
              ))
            );
          });
        }, 500);
      }

      setFlippedIndices([]);
    }
  }, [flippedIndices]);

  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      setGameWon(true);
      setIsPlaying(false); // Stop the timer when the game is won
    }
  }, [cards]);

  const handleCardPress = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length === 2 || gameWon || timeUp) {
      return;
    }

    if (!timerStarted) {
      setTimerStarted(true);
    }

    Animated.timing(flipAnimations.current[index], {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    setFlippedIndices(prevIndices => [...prevIndices, index]);
  };

  const restartGame = () => {
    const newCards = generateCards(cardCount);
    setCards(newCards);
    flipAnimations.current = newCards.map(() => new Animated.Value(0));
    setFlippedIndices([]);
    setGameWon(false);
    setTimeUp(false);
    setTimerStarted(false);
    setIsPlaying(false);
    setTimerKey(prevKey => prevKey + 1);
    setSettingsChanged(false); // Reset settings
  };

  const handleSettingsClose = () => {
    setShowSettingsModal(false);
    if (settingsChanged) {
      restartGame(); // Restart the game if settings have changed
    } else {
      if (!isPlaying) {
        setIsPlaying(true); // Continue the game if no changes were made
      }
    }
  };
  
  const restartSettings = () => {
    restartGame(); // Restart the game
    setShowSettingsModal(false); // Close the settings modal
  };

  const showSettings = () => {
    setShowSettingsModal(true);
    setIsPlaying(false); // Pause the game when settings are open
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingsButton} onPress={showSettings}>
        <Ionicons name="settings" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.timerContainer}>
        <CountdownCircleTimer
          key={timerKey}
          isPlaying={isPlaying}
          duration={timerDuration}
          colors={['#28ff7b', '#7dfd7d', '#fff34d', '#fff716', '#ff4d4d', '#ff0000']}
          colorsTime={[timerDuration, timerDuration - 5, timerDuration - 10, 5, 3, 0]}
          onComplete={() => setTimeUp(true)}
          size={150}
        >
          {({ remainingTime }) => (
            <Text style={styles.timerText}>Kalan Süre{"\n"}<Text style={styles.remainingTime}>{remainingTime}{"\n"}</Text> saniye</Text>
          )}
        </CountdownCircleTimer>

      </View>

      <View style={styles.cardsContainer}>
        {cards.map((card, index) => {
          const flipInterpolate = flipAnimations.current[index]?.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          });

          if (!flipInterpolate) return null;

          const animatedStyle = {
            transform: [{ rotateY: flipInterpolate }],
          };

          return (
            <TouchableOpacity key={card.id} style={styles.card} onPress={() => handleCardPress(index)}>
              <Animated.View style={[styles.cardInner, animatedStyle]}>
                {card.isFlipped ? (
                  <>
                    <Image source={FRONT_CARD} style={styles.image} />
                    <Image source={card.icon} style={styles.icon} />
                  </>
                ) : (
                  <Image source={BACKGROUND_CARD} style={styles.image} />
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>

      {gameWon && (
        <View style={styles.messageContainer}>
          <Text style={styles.congratulations}>Tebrikler, Kazandınız!</Text>
          <Button title="Yeniden Başlat" onPress={restartGame} />
        </View>
      )}

      <Modal
        visible={timeUp}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setTimeUp(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.timeUpText}>Süre Bitti</Text>
            <Button title="Yeniden Başlat" onPress={restartGame} />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSettingsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleSettingsClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Süreyi Ayarla:</Text>
            <Slider
              style={styles.slider}
              minimumValue={10}
              maximumValue={120}
              step={1}
              value={timerDuration}
              onValueChange={(value) => {
                setTimerDuration(value);
                setSettingsChanged(true); // Mark settings as changed
              }}
              minimumTrackTintColor="#28ff7b"
              maximumTrackTintColor="#d3d3d3"
            />
            <Text style={styles.modalText}>{timerDuration} saniye</Text>

            <Text style={styles.modalText}>Kart Adedi Seç:</Text>
            <Picker
              selectedValue={cardCount}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setCardCount(itemValue);
                setSettingsChanged(true); // Mark settings as changed
              }}
            >
              <Picker.Item label="10 Kart" value={10} />
              <Picker.Item label="20 Kart" value={20} />
              <Picker.Item label="30 Kart" value={30} />
              <Picker.Item label="40 Kart" value={40} />
            </Picker>

            <View style={styles.modalButtonContainer}>
              <Button title="Tamam" onPress={handleSettingsClose} />
              <Button title="Yeniden Başlat" onPress={restartSettings} />
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  timerContainer: {
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  card: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  cardInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '60%',
    left: '60%',
    marginLeft: -22.5,
    marginTop: -22.5,
  },
  messageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  congratulations: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10, // Add space below each text
  },
  timeUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  remainingTime: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  timerText: {
    fontSize: 12,
    color: '#4d4d4d',
    textAlign: 'center',
  },
  slider: {
    width: 300,
    height: 40,
  },
  picker: {
    width: 300,
    height: 50,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});
