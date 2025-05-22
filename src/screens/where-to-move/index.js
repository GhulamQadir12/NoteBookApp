import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import GoogleSearchBar from 'components/atoms/google-auto-place';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import {Row} from 'components/atoms/row';
import showToast from 'components/atoms/show-toast';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {onPostLocation} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import styles from './styles';
// import Geocoder from 'react-native-geocoding';
// Geocoder.init('AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98');
const WhereToMoveScreen = props => {
  const {service_id, type} = props?.route?.params;
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    service_id: service_id,
    email: userInfo?.email || '',
    name: userInfo?.name || '',
    searchMapInput: '',
    searchMapInputDrop: '',
    latitude: '',
    longitude: '',
    latitudeDrop: '',
    longitudeDrop: '',
    pickup_date: '',
    price_type: type,
  });

  const PostData = async () => {
    if (!values.name) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter name.',
      });
      return;
    } else if (!values.email) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter email.',
      });
      return;
    } else if (!values.pickup_date) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please select pickup date.',
      });
      return;
    } else if (!values.searchMapInput) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please select pickup location.',
      });
      return;
    } else if (!values.searchMapInputDrop) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please select drop off location.',
      });
      return;
    }

    try {
      setLoading(true);
      const res = await onPostLocation(values);
      if (type === 'hour_price') {
        navigate('SelectVehicle', {service_data: res});
      } else {
        navigate('FurnitureItemsScreen', {service_data: res});
      }
    } catch (error) {
      console.log('Error in postdata====>', error);
      // Alert.alert('postadata', UTILS.returnError(error));
      showToast({
        type: 'error',
        text1: 'Post Location Failed',
        text2: UTILS.returnError(error),
      });
    } finally {
      setLoading(false);
    }
  };
  const handlePlaceSelection = (data, details) => {
    // Extract latitude and longitude from details.geometry.location
    const {lat, lng} = details.geometry.location;
    // Determine whether this is for pickup or dropoff
    setValues({
      ...values,
      latitude: lat,
      longitude: lng,
      searchMapInput: details.formatted_address,
    });
  };

  const handlePlaceSelectionDrop = (data, details) => {
    // Extract latitude and longitude from details.geometry.location
    const {lat, lng} = details.geometry.location;
    // Determine whether this is for pickup or dropoff
    setValues({
      ...values,
      latitudeDrop: lat,
      longitudeDrop: lng,
      searchMapInputDrop: details.formatted_address,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}>
        <Header1x2x
          style={{backgroundColor: colors.transparent}}
          title={t('where_to_move')}
        />
      </ImageBackground>

      <View style={styles.contentContainerStyle}>
        <View style={styles.contentContainerStyleNew}>
          {/* <KeyboardAvoidScrollview
            contentContainerStyle={styles.keyboardcontentcontainer}> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={true}
            style={styles.keyboardcontentcontainer}>
            <Medium
              numberOfLines={2}
              label={t('we_are_saving_your_money_and_time_by')}
              fontSize={mvs(16)}
              color={colors.primary}
            />
            <Medium
              numberOfLines={2}
              label={t('moving_your_goods_at_your_place')}
              fontSize={mvs(14)}
              color={colors.bluecolor}
            />

            <PrimaryInput
              editable={userInfo?.name ? false : true}
              label={t('please_enter_name')}
              keyboardType={'email-address'}
              // error={touched?.email ? t(errors.email) : ''}
              placeholder={t('name')}
              onChangeText={
                text => setValues({...values, name: text}) // Update the 'email' property in the 'values' object
              }
              // onBlur={handleBlur('email')}
              value={values?.name}
              containerStyle={{
                borderRadius: mvs(6),
                borderColor: colors.attachmentgray,
              }}
            />
            <PrimaryInput
              editable={userInfo?.email ? false : true}
              label={t('please_enter_email')}
              keyboardType={'email-address'}
              // error={touched?.email ? t(errors.email) : ''}
              placeholder={t('email')}
              onChangeText={
                text => setValues({...values, email: text}) // Update the 'email' property in the 'values' object
              }
              value={values?.email}
              containerStyle={{
                borderRadius: mvs(6),
                borderColor: colors.attachmentgray,
              }}
            />

            {/* <DatePicker
              onChangeText={text => setValues({...values, pickup_date: text})}> */}

            <Regular label={'Select pickupDate & Time'} color={colors.red} />
            <PrimaryInput
              mode="datetime"
              minmumDate={new Date()}
              editable={false}
              placeholder={t('Date & Time')}
              onChangeText={text => setValues({...values, pickup_date: text})}
              value={values.pickup_date}
              isCalendar
            />

            {/* <View style={{width: '48%'}}>
                <Regular label={'Select PickupTime'} color={colors.red} />
                <PrimaryInput
                  mode="time"
                  editable={false}
                  placeholder={t('Time')}
                  onChangeText={text =>
                    setValues({...values, pickup_time: text})
                  }
                  value={values.pickup_time}
                  isClock
                />
              </View> */}

            {/* </DatePicker> */}
            <GoogleSearchBar
              onPress={handlePlaceSelection}
              placeholder={'Search Pickup Location '}
            />
            <GoogleSearchBar
              onPress={handlePlaceSelectionDrop}
              placeholder={'Search DropOff Location '}
            />
          </ScrollView>
          {/* </KeyboardAvoidScrollview> */}
        </View>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <PrimaryButton
          onPress={PostData}
          loading={loading}
          title={t('next')}
          containerStyle={styles.searchContainer}
        />
      </View>
      {/* </View> */}
    </View>
  );
};
export default WhereToMoveScreen;
