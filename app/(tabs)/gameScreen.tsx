import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import Timer from './Timer';
import SettingsModal from './SettingsModal';
import { generateCards, Card as CardType } from './cardUtils'; // Extracted function and type

export default function GameScreen() {
  const [cards, setCards] = useState<CardType[]>(generateCards(10));
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
      setIsPlaying(false);
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
    setSettingsChanged(false);
  };

  const handleSettingsClose = () => {
    setShowSettingsModal(false);
    if (settingsChanged) {
      restartGame();
    } else {
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }
  };

  const restartSettings = () => {
    restartGame();
    setShowSettingsModal(false);
  };

  const showSettings = () => {
    setShowSettingsModal(true);
    setIsPlaying(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.settingsButton} onPress={showSettings}>
        <Ionicons name="settings" size={30} color="#000" />
      </TouchableOpacity>

      <Timer
        key={timerKey} // Pass key to reset timer
        isPlaying={isPlaying}
        duration={timerDuration}
        onComplete={() => setTimeUp(true)}
      />

      <View style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            icon={card.icon}
            isFlipped={card.isFlipped}
            onPress={() => handleCardPress(index)}
            flipAnimation={flipAnimations.current[index] || new Animated.Value(0)}
          />
        ))}
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

      <SettingsModal
        visible={showSettingsModal}
        timerDuration={timerDuration}
        setTimerDuration={setTimerDuration}
        cardCount={cardCount}
        setCardCount={setCardCount}
        onClose={handleSettingsClose}
        onRestart={restartSettings}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20, // Added padding to improve scroll experience
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
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
  timeUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
});
