import { useNavigation } from '@react-navigation/native';
import { mvs } from 'config/metrices';
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LINE_HEIGHT = 55;
const INITIAL_LINES = 20;
const EXTRA_LINES = 30;

const LinePaper = () => {
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [mainText, setMainText] = useState('');
  const [visibleLines, setVisibleLines] = useState(INITIAL_LINES);
  const navigation = useNavigation();

  const mainTextRef = useRef(null);
  const scrollViewRef = useRef(null);

  const handlePress = event => {
    if (!mainTextRef.current) return;

    const touchY = event.nativeEvent.locationY;
    const lineNumber = Math.floor(touchY / LINE_HEIGHT);

    const lines = mainText.split('\n');
    const currentLines = lines.length;

    if (lineNumber >= currentLines) {
      const newLinesToAdd = lineNumber - currentLines + 1;
      const newText = mainText + '\n'.repeat(newLinesToAdd);
      setMainText(newText);
    }

    mainTextRef.current.focus();
    setTimeout(() => {
      mainTextRef.current.setNativeProps({
        selection: {
          start: mainText.length,
          end: mainText.length,
        },
      });
    }, 50);
  };

  const handleScroll = event => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    const paddingToBottom = 20;

    if (
      contentOffset.y + layoutMeasurement.height >=
      contentSize.height - paddingToBottom
    ) {
      setVisibleLines(prev => prev + EXTRA_LINES);
    }
  };

  const renderLines = () => {
    const lines = [];
    for (let i = 0; i < visibleLines; i++) {
      lines.push(
        <View key={i} style={[styles.line, {top: i * LINE_HEIGHT}]} />,
      );
    }
    return lines;
  };
  const handleSave = () => {
  console.log('Person Name:', textInput1);
  console.log('Car Number:', textInput2);
  console.log('Details:', mainText);
};


  return (
    <View style={{flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View
          style={{
            paddingTop: 0,
            paddingBottom: 10,
            backgroundColor: '#175884',
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 80,
          }}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={{marginTop: 15}}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 25,
              marginTop: 15,
              
            }}>
            Add car record
          </Text>
        </View>
        <View style={styles.topInputsContainer}>
          <Text style={styles.label}>Person Name</Text>
          <TextInput
            value={textInput1}
            onChangeText={setTextInput1}
            placeholder="Enter person name..."
            placeholderTextColor="#888"
            style={styles.topInput}
          />
          <Text style={styles.label}>Car Number</Text>
          <TextInput
            value={textInput2}
            onChangeText={setTextInput2}
            placeholder="Enter car number..."
            placeholderTextColor="#888"
            style={styles.topInput}
          />
        </View>

        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.container}>
            <View style={styles.paper}>{renderLines()}</View>

            <TextInput
              ref={mainTextRef}
              style={styles.textInput}
              multiline
              value={mainText}
              onChangeText={setMainText}
              placeholder="Add Detail..."
              placeholderTextColor="#aaa"
              textAlignVertical="top"
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <TouchableOpacity onPress={handleSave}>
        <Text style={styles.save}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 0,
  },
  topInputsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  topInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height,
  },
  paper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  textInput: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: 'transparent',
    color: '#000',
    lineHeight: LINE_HEIGHT,
    minHeight: INITIAL_LINES * LINE_HEIGHT,
  },
  save: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#175884',
    width: '90%',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default LinePaper;
