import React from 'react';
import { View, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const BACKGROUND_CARD = require('../../assets/images/backgroundcard.png');
const FRONT_CARD = require('../../assets/images/frontcard.png');

interface CardProps {
    id: number;
    icon: any;
    isFlipped: boolean;
    onPress: () => void;
    flipAnimation: Animated.Value;
  }
  
  const Card: React.FC<CardProps> = ({ id, icon, isFlipped, onPress, flipAnimation }) => {
    const flipInterpolate = flipAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  
    const animatedStyle = {
      transform: [{ rotateY: flipInterpolate }],
    };
  
    return (
      <TouchableOpacity key={id} style={styles.card} onPress={onPress}>
        <Animated.View style={[styles.cardInner, animatedStyle]}>
          {isFlipped ? (
            <>
              <Image source={FRONT_CARD} style={styles.image} />
              <Image source={icon} style={styles.icon} />
            </>
          ) : (
            <Image source={BACKGROUND_CARD} style={styles.image} />
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
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
  });
  
  export default Card;