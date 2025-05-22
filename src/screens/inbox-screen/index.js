import * as IMG from 'assets/images';
import CustomFlatList from 'components/atoms/custom-flatlist';
import { MessageInput } from 'components/atoms/inputs';
import { Loader } from 'components/atoms/loader';
import { Row } from 'components/atoms/row';
import InboxChatCard from 'components/molecules/inbox-chat-card';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppDispatch, useAppSelector } from 'hooks/use-store';
import { goBack } from 'navigation/navigation-ref';
import React from 'react';
import { Alert, I18nManager, Image, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getChatMessages } from 'services/api/chat-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import { UTILS } from 'utils';
import { onSendMessage } from './../../services/api/chat-api-actions';
import styles from './styles';
const InboxScreen = props => {
  const {info, conversation_id, receiver_name, receiver_email, receiver_image} =
    props?.route?.params || {};
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const dispatch = useAppDispatch();
  const {t} = i18n;

  const [messages, setMessages] = React.useState([]);

  // const lastMesId = Math.max(...messages.map(item => item.id), 0);

  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [pageLoading, setPageLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const getMessages = async () => {
    try {
      const result = await getChatMessages(
        info?.id || conversation_id,
        pageNumber,
      );
      const res = result?.data;
      // console.log('res cehck-==', res);
      // setMessages(res?.data || []);
      setMessages(preMessages =>
        pageNumber > 1
          ? {
              ...res,
              data: preMessages?.data
                ? [...preMessages?.data, ...res?.data]
                : [...res?.data],
            }
          : res,
      );
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const handleLoadMore = () => {
    const lastPage = Math.ceil(
      (messages?.meta?.total || 0) / messages?.meta?.per_page,
    );
    if (!pageLoading && pageNumber < lastPage) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };
  // React.useEffect(() => {
  //   if (pageNumber > 0 && !pageLoading) {
  //     getMessages(setPageLoading);
  //   }
  // }, [pageNumber]);
  React.useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      if (pageNumber > 0 && !pageLoading) {
        getMessages(setPageLoading);
      }
    }, 5000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [pageNumber]);

  const sendMessage = async () => {
    try {
      if (!message?.trim()) return;
      await onSendMessage({
        conversation_id: info?.id || conversation_id,
        message: message,
      });
      await getMessages();
      setMessage('');
      // setMessages(res?.data || []);
    } catch (error) {
      console.log('error', error);
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => (
    <InboxChatCard item={{...item, me: userInfo?.id === item?.user_id}} />
  );
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust behavior for iOS
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Optionally adjust vertical offset for iOS
    >
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: mvs(20),
          paddingVertical: mvs(15),
        }}>
        <Row
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => goBack()}>
            <FontAwesome5
              name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
              size={mvs(20)}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              borderRadius={mvs(10)}
              source={
                info?.receiver_image || receiver_image
                  ? {uri: info?.receiver_image || receiver_image}
                  : IMG.messagelogo
              }
              style={styles.backGroundImage}
            />
          </View>
          <View style={{paddingHorizontal: mvs(10), flex: 1}}>
            <Bold label={info?.receiver_name || receiver_name} />
            <Regular
              numberOfLines={1}
              label={info?.receiver_email || receiver_email}
            />
          </View>
        </Row>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          ListFooterComponent={pageLoading && <Loader />}
          onEndReached={handleLoadMore} // Load more when reaching the end of the list
          onEndReachedThreshold={0.5} // Load more when the user reaches the last 50% of the list
          inverted
          showsVerticalScrollIndicator={false}
          data={messages || []}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: mvs(20),
            paddingHorizontal: mvs(20),
          }}
        />
      )}

      <Row
        style={{
          marginHorizontal: mvs(20),
          alignItems: 'center',
          paddingBottom:Platform.OS === 'ios' ? mvs(50) :  mvs(10)
        }}>
        <MessageInput value={message} onChangeText={setMessage} />
        <TouchableOpacity onPress={sendMessage} style={styles.sendIcon}>
          <Feather name={'send'} size={25} color={colors.white} />
        </TouchableOpacity>
      </Row>
      
    </View>
    </KeyboardAvoidingView>
  );
};
export default InboxScreen;
