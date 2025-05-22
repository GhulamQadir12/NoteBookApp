import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import MyOrderCard from 'components/molecules/my-order-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect} from 'react';
import {
  Alert,
  I18nManager,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {getOrderList} from 'services/api/auth-api-actions';
import {onCreateConveration} from 'services/api/chat-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import styles from './styles';
import showToast from 'components/atoms/show-toast';

const TotalOrderScreen = props => {
  const isBack = props?.route?.params?.isBack;
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(s => s.user);
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState('pending');
  const [chatLoading, setChatLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onMessagePress = async driver_id => {
    try {
      setChatLoading(true);
      const res = await onCreateConveration({
        receiver_id: driver_id,
      });

      navigate('InboxScreen', {
        conversation_id: res?.conversation_id,
        receiver_name: res?.receiver_name,
        receiver_email: res?.receiver_email,
        receiver_image: res?.receiver_image,
      });
    } catch (error) {
      console.log('Error in create conversion====>', error);
      // Alert.alert('Error', UTILS.returnError(error));
      showToast({
        type: 'error',
        text1: 'Error',
        text2: UTILS.returnError(error),
      });
    } finally {
      setChatLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchList();
      setRefreshing(false);
    }, 2000); // Simulated delay for the sake of example, replace this with your actual data fetching logic
  };

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await getOrderList(selectedOrder);
      setData(res);
    } catch (error) {
      console.log('Error in post Furniture item====>', error);
      // Alert.alert('Error', UTILS.returnError(error));
      if (!userInfo?.id) {
        showToast({
          type: 'error',
          text1: 'Unauthenticated',
          text2: 'Please log in to continue.',
        });
      } else {
        showToast({
          type: 'error',
          text1: 'Error',
          text2: UTILS.returnError(error),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [selectedOrder]);
  const renderAppointmentItem = ({item, index}) => (
    <MyOrderCard
      item={item}
      onMessagePress={() => onMessagePress(item?.driver_id)}
      onPressTracking={() => navigate('Tracking', {orderId: item?.id})}
      chatLoading={chatLoading}
      onPressDetails={() =>
        props?.navigation?.navigate('OrderDetailsScreen', {orderId: item?.id})
      }
    />
  );

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}
      />
      {/* <Header1x2x
        style={{backgroundColor: colors.transparent}}
        title={t('total_order_request')}
      /> */}
      <Row style={styles.headerContainer}>
        {isBack ? (
          <TouchableOpacity onPress={() => navigate('Home')}>
            <Icon
              name={I18nManager.isRTL ? 'arrowright' : 'arrowleft'}
              size={mvs(20)}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : (
          <>
            <View />
          </>
        )}
        <Medium
          fontSize={mvs(20)}
          label={t('total_order_request')}
          style={{
            fontSize: mvs(18),
            color: colors.white,
          }}
        />
        <View />
      </Row>

      <View style={styles.contentContainerStyle}>
        <Row style={{marginBottom: mvs(0)}}>
          <PrimaryButton
            title={t('Pending')}
            containerStyle={{
              width: '30%',
              backgroundColor:
                selectedOrder === 'pending' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'pending' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'pending') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('pending');
              }
            }}
          />
          <PrimaryButton
            title={t('Assigned')}
            containerStyle={{
              width: '30%',
              backgroundColor:
                selectedOrder === 'start' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color: selectedOrder === 'start' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'start') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('start');
              }
            }}
          />
          <PrimaryButton
            title={t('Delivered')}
            containerStyle={{
              width: '30%',
              backgroundColor:
                selectedOrder === 'delivered' ? colors.primary : colors.white,
              borderColor: colors.lightGray,
              borderWidth: 1,
              ...colors.shadow,
            }}
            textStyle={{
              color:
                selectedOrder === 'delivered' ? colors.white : colors.primary,
            }}
            onPress={() => {
              if (selectedOrder === 'delivered') {
                setSelectedOrder('');
              } else {
                setSelectedOrder('delivered');
              }
            }}
          />
        </Row>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          // emptyList={<EmptyList label={t('no_notification')} />}
          contentContainerStyle={styles.contentContainerStyleFlatlist}
          showsVerticalScrollIndicator={false}
          data={data?.data}
          renderItem={renderAppointmentItem}
          ItemSeparatorComponent={itemSeparatorComponent()}
          keyExtractor={(_, index) => index?.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};
export default TotalOrderScreen;
