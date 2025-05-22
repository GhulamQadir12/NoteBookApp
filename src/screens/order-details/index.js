import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import CustomFlatList from 'components/atoms/custom-flatlist';
import CustomMap from 'components/atoms/custom-map';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import MapDirections from 'components/atoms/map-directions';
import {Row} from 'components/atoms/row';
import ItemDetailsCard from 'components/molecules/item-details-card';
import RatingModal from 'components/molecules/modals/rating-modal';
import OrderDetailsCard from 'components/molecules/order-details-card';
import RatingStar from 'components/molecules/rating-star';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Marker} from 'react-native-maps';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {getOrderDetails, ratingDriver} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import styles from './styles';

const OrderDetailsScreen = props => {
  const orderId = props?.route?.params?.orderId;
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const [data, setData] = React.useState({});
  const [ratingModal, setRatingModal] = React.useState(false);
  const [ratingLoading, setRatingLoading] = React.useState(false);
  const [values, setValues] = React.useState({rating: '', comment: ''});
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);

  // const minutes = Math.round(data?.total_hours * 60).toFixed(2);
  const hours = data?.total_hours;
  const duration = moment.duration(hours, 'hours');
  const formattedTime = moment
    .utc(duration.asMilliseconds())
    .format('HH:mm:ss');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getOrderDetails(orderId);
      setData(res?.value);
    } catch (error) {
      console.log('Error in get order details====>', error);
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const postPayment = id => {
    const url = `https://luggage.prismatic-technologies.com/forms/remainingPayment/${id}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const renderAppointmentItem = ({item, index}) => (
    <ItemDetailsCard item={item} />
  );
  const onPressRating = async () => {
    try {
      setRatingLoading(true);
      await ratingDriver({
        ...values,
        service_id: orderId,
        driver_id: data?.driver?.id,
      });
      setRatingModal(false);
      fetchData();
    } catch (error) {
      console.log('Error in getProducts====>', error);
      Alert.alert('Products Error', UTILS.returnError(error));
    } finally {
      setRatingLoading(false);
    }
  };

  const origin = {
    latitude: data?.pickup_lat * 1 || 37.78825,
    longitude: data?.pickup_long * 1 || -122.4324,
  };

  const destination = {
    latitude: data?.dropoff_lat * 1 || 37.78825,
    longitude: data?.dropoff_long * 1 || -122.4324,
  };
  console.log('destination=====>', destination);
  const openGoogleMapsDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`;
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}>
        <Header1x2x
          style={{backgroundColor: colors.transparent}}
          title={t('order_details')}
        />
      </ImageBackground>
      {loading ? (
        <Loader />
      ) : (
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: colors.primary,
            }}>
            <View style={styles.mapContainer}>
              <CustomMap
                initialRegion={{
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <Marker coordinate={origin} />
                <Marker coordinate={destination} />
                <MapDirections
                  origin={origin}
                  destination={destination}
                  strokeWidth={3}
                  strokeColor="blue"
                />
              </CustomMap>
              <TouchableOpacity
                onPress={openGoogleMapsDirections}
                style={{
                  position: 'absolute',
                  bottom: mvs(20),
                  right: mvs(20),
                }}>
                <Row
                  style={{
                    alignItems: 'center',
                    gap: mvs(5),
                    backgroundColor: colors.white,
                    opacity: 0.5,
                    padding: mvs(5),
                  }}>
                  <Bold color={colors.red} label={'Goto Map'} />
                  <FontAwesome5Icon
                    name="directions"
                    size={mvs(30)}
                    color={colors.bluecolor}
                  />
                </Row>
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainerStyle}>
              <OrderDetailsCard item={data} />
              {data?.price_type != 'hour_price' && (
                <Medium
                  label={t('item_details')}
                  color={colors.white}
                  style={{alignSelf: 'center'}}
                />
              )}
              <CustomFlatList
                // emptyList={<EmptyList label={t('no_notification')} />}
                contentContainerStyle={styles.contentContainerStyleFlatlist}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={data?.json}
                renderItem={renderAppointmentItem}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                // ItemSeparatorComponent={itemSeparatorComponent()}
                keyExtractor={(_, index) => index?.toString()}
              />
              {data?.any_instruction && (
                <>
                  <Bold color={colors.white} label={'Any Instructions'} />
                  <View style={styles.anyinstructionContainer}>
                    <Regular
                      numberOfLines={5}
                      color={colors.black}
                      fontSize={mvs(12)}
                      label={data?.any_instruction}
                    />
                  </View>
                </>
              )}
            </View>

            {data?.status === 'delivered' && data?.review != null && (
              <Row style={styles.reviewContainer}>
                <Image
                  source={{uri: userInfo?.avatar}}
                  style={{
                    height: mvs(40),
                    width: mvs(40),
                    borderRadius: mvs(25),
                  }}
                />
                <View style={{flex: 1}}>
                  {/* <Medium label={orderData?.review?.title} /> */}
                  <Medium label={userInfo?.name} fontSize={mvs(14)} />
                  <View style={{width: mvs(100)}}>
                    <RatingStar rate={data?.review?.review} />
                  </View>
                  <Regular
                    fontSize={mvs(12)}
                    label={data?.review?.description || 'NA'}
                    numberOfLines={10}
                  />
                </View>
              </Row>
            )}
            {data?.status === 'delivered' &&
              data?.remaining_amount_status == 1 && (
                <View
                  style={{
                    paddingHorizontal: mvs(20),
                    bottom: mvs(20),
                    marginTop: mvs(20),
                  }}>
                  <Row style={{alignItems: 'center', bottom: mvs(5)}}>
                    <Bold color={colors.white} label={'Total Hour :'} />
                    <Bold color={colors.white} label={formattedTime} />
                  </Row>
                  <PrimaryButton
                    containerStyle={{
                      backgroundColor: colors.white,
                    }}
                    onPress={() => postPayment(data?.id)}
                    textStyle={{color: colors.black}}
                    title="Pay Remaining Amount"
                  />
                </View>
              )}
          </ScrollView>

          {data?.status === 'delivered' && data?.review == null && (
            <View style={styles.reviewBtnContainer}>
              <PrimaryButton
                containerStyle={styles.acceptbutton}
                textStyle={{color: colors.primary}}
                // onPress={() => navigate('Signup')}
                onPress={() => setRatingModal(true)}
                title={t('Driver Rating')}
              />
            </View>
          )}
        </View>
      )}

      <RatingModal
        onClose={() => setRatingModal(false)}
        visible={ratingModal}
        setValues={setValues}
        values={values}
        ratingLoading={ratingLoading}
        onSubmit={() => onPressRating()}
      />
    </View>
  );
};
export default OrderDetailsScreen;
