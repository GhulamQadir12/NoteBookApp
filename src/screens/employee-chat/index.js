import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import LeaveRequestCard from 'components/molecules/leave-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, ScrollView, FlatList} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './style';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import AdvanceRequestCard from 'components/molecules/advance-request-card';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getAdvanceList,
  getStrikeLetterList,
} from 'services/api/auth-api-actions';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Calendar} from 'react-native-big-calendar';
import {PlusButton} from 'components/atoms/buttons';
import CalendarEvent from 'components/atoms/calender';
import Medium from 'typography/medium-text';
import StrikeLetterCard from 'components/molecules/strike-letter-card';
import * as IMG from 'assets/images';
import ChatListCard from 'components/molecules/chat-list-card';
import Item from 'components/molecules/employee-chat';
import {Text} from 'react-native';
import {Image} from 'react-native';
import {PrimaryInput} from 'components/atoms/inputs';

const EmployeeChat = ({navigation}) => {
  const [textInput, setTextInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [coverImageUri, setCoverImageUri] = useState(null);

  const pickImage = setImageUri => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image Picker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const renderItem = ({item}) => (
    <Item item={item} />
  );

  const sendMessage = () => {
    if (textInput.trim()) {
      setMessages([...messages, {text: textInput, id: Date.now().toString()}]);
      setTextInput('');
    }
  };

  const Renderitem = item => <Item item={item} />;

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Chat'} style={{height: mvs(60)}} />
      <View style={{flex: 1, padding: mvs(20)}}>
        <View style={styles.flatlistcontainer}>
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            // initialScrollIndex={messages.length - 1}
          />
        </View>

        <Row style={styles.bottom}>
          <TouchableOpacity style={styles.uploadDocuments}>
            <AntDesign name="plus" size={24} color={colors.white} />
          </TouchableOpacity>
          <PrimaryInput
            placeholder={'Type Here'}
            mainContainer={styles.input}
            value={textInput}
            onChangeText={setTextInput}
            multiline={true}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Feather name="send" size={24} color={colors.white} />
          </TouchableOpacity>
        </Row>
      </View>
    </View>
  );
};

export default EmployeeChat;
