import React from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';


interface SettingsModalProps {
  visible: boolean;
  timerDuration: number;
  setTimerDuration: (value: number) => void;
  cardCount: number;
  setCardCount: (value: number) => void;
  onClose: () => void;
  onRestart: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  timerDuration,
  setTimerDuration,
  cardCount,
  setCardCount,
  onClose,
  onRestart,
}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
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
          onValueChange={setTimerDuration}
          minimumTrackTintColor="#28ff7b"
          maximumTrackTintColor="#d3d3d3"
        />
        <Text style={styles.modalText}>{timerDuration} saniye</Text>

        <Text style={styles.modalText}>Kart Adedi Seç:</Text>
        <Picker
          selectedValue={cardCount}
          style={styles.picker}
          onValueChange={setCardCount}
        >
          <Picker.Item label="10 Kart" value={10} />
          <Picker.Item label="20 Kart" value={20} />
          <Picker.Item label="30 Kart" value={30} />
          <Picker.Item label="40 Kart" value={40} />
        </Picker>

        <View style={styles.modalButtonContainer}>
          <Button title="Tamam" onPress={onClose} />
          <Button title="Yeniden Başlat" onPress={onRestart} />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
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
    marginBottom: 10,
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

export default SettingsModal;
