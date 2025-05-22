import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import CustomMap from 'components/atoms/custom-map';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput, {TextAreaInput} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import MapDirections from 'components/atoms/map-directions';
import {Row} from 'components/atoms/row';
import DropDown from 'components/molecules/dropdown';
import OrderVerficationModal from 'components/molecules/modals/order-Verification-modal';
import MultiDropDown from 'components/molecules/multi-dropdown';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useFormik} from 'formik';
import {useAppSelector} from 'hooks/use-store';
import Lo_Dash from 'lodash';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect} from 'react';
import {Alert, ImageBackground, View} from 'react-native';
import {Marker} from 'react-native-maps';
import {getDistance, postDropDown} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import {UTILS} from 'utils';
import {signupFormValidation} from 'validations';
import styles from './styles';
import showToast from 'components/atoms/show-toast';

const FurnitureItemsScreen = props => {
  const {userInfo} = useAppSelector(s => s.user);
  const {service_data} = props?.route?.params;
  const id = service_data?.service?.id;
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [totalDistance, setTotalDistance] = React.useState('');
  const [data, setData] = React.useState(
    Lo_Dash.cloneDeep(service_data?.service?.json),
  );
  console.log('data===>>>', data);

  const origin = {
    latitude: service_data?.pickup_lat,
    longitude: service_data?.pickup_long,
  };
  const destination = {
    latitude: service_data?.dropoff_lat,
    longitude: service_data?.dropoff_long,
  };
  const [email, setEmail] = React.useState('');
  const [total, setTotal] = React.useState({});
  const [instruction, setInstruction] = React.useState('');

  let obj = {};
  data?.forEach(x => {
    if (x.type !== 'hidden') {
      obj[`${x.name}_quantity`] = x.quantity;
    }
  });
  let text = {};
  data?.forEach(x => {
    if (x.type !== 'hidden') {
      text[`${x.name}`] = x.label;
    }
  });
  const valuess = {
    ...obj,
    ...text,
    ...total,
    ajax: 'true',
    service_value_id: service_data?.service_store_id,
    distance: totalDistance?.km,
    duration: totalDistance?.time,
    any_instruction: instruction,
  };

  const postData = async () => {
    // console.log('object', values);
    // return;

    try {
      if (userInfo?.id) {
        setLoading(true);
        const filteredData = data.filter(
          item =>
            (item.type === 'select' && item.values.some(v => v.selected)) ||
            (item.type === 'checkbox-group' &&
              item.values.some(v => v.selected)) ||
            (item.type === 'text' && item.label) ||
            (item.type === 'textarea' && instruction),
        );

        const selectedValues = filteredData.reduce((acc, item) => {
          if (item.type === 'select') {
            const selectedValue = item.values.find(v => v.selected);
            if (selectedValue) {
              acc[`${item.name}_quantity`] = item.quantity || 1; // Ensure quantity is included
              acc[item.name] = selectedValue.label;
            }
          } else if (item.type === 'checkbox-group') {
            const selectedValues = item.values
              .filter(v => v.selected)
              .map(v => v.label);
            if (selectedValues.length > 0) {
              acc[item.name] = selectedValues;
            }
          } else if (item.type === 'text') {
            acc[item.name] = item.label;
          }
          return acc;
        }, {});

        const valuess = {
          ...selectedValues,
          ...total,
          ajax: 'true',
          service_value_id: service_data?.service_store_id,
          distance: totalDistance?.km,
          duration: totalDistance?.time,
          any_instruction: instruction,
        };

        const res = await postDropDown(id, valuess);
        showToast({
          type: 'success',
          text1: 'Order Placed',
          text2: 'Your order has been placed. Please check your email.',
        });
        navigate('TotalOrderScreen', {isBack: true});
        console.log('new daata', valuess);
      } else {
        navigate('Login', {isBack: true});
      }
    } catch (error) {
      console.log('Error in post Furniture item====>', error);
      showToast({
        type: 'error',
        text1: 'Order Failed',
        text2: UTILS.returnError(error),
      });
    } finally {
      setLoading(false);
    }
  };
  const initialValues = {
    input_details: '',
    date: '',
  };
  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: signupFormValidation,
      onSubmit: () => {},
    });
  const getTimeDistance = async () => {
    try {
      const res = await getDistance(
        origin?.latitude,
        destination?.latitude,
        origin?.longitude,
        destination?.longitude,
      );
      setTotalDistance(res);
    } catch (error) {
      console.log('Error in getdiustance====>', error);
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
    }
  };
  useEffect(() => {
    getTimeDistance();
  }, [total]);

  const handleMultiDropdownChange = (list, name) => {
    const selectedItems = list.filter(item => item.selected);
    let selectedValue;
    const selectedValues = selectedItems.map(item => item.label);
    selectedValue = selectedValues;
    let obj = {};
    obj[name] = selectedValue;
    setTotal({...total, ...obj});
  };

  const handleDropdownChange = (list, name) => {
    const copy = list.find(item => item.selected === true);
    let obj = {};
    obj[name] = copy?.label;
    setTotal({...total, ...obj});
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}>
        <Header1x2x
          style={{backgroundColor: colors.transparent}}
          title={service_data?.service?.title}
        />
      </ImageBackground>

      <View style={{flex: 1}}>
        {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}

        <View style={styles.contentContainerStyle}>
          <View style={styles.contentContainerStyleNew}>
            <KeyboardAvoidScrollview
              contentContainerStyle={styles.keyboardcontentcontainer}>
              <View
                style={{
                  height: mvs(200),
                  padding: mvs(5),
                  marginHorizontal: mvs(20),
                  marginVertical: mvs(10),
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: mvs(10),
                }}>
                <CustomMap
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
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
              </View>
              <Row style={{paddingHorizontal: mvs(20)}}>
                <Bold
                  color={colors.red}
                  label={`${t('distance')} ${totalDistance?.km} km`}
                />
                {/* <Bold
                  color={colors.red}
                  label={`${t('astimated')} ${totalDistance?.time}`}
                /> */}
              </Row>

              {data?.map((item, index) => {
                if (item?.type === 'select' && !item?.multiple) {
                  console.log('values=====>>>>', item.values);
                  return (
                    <>
                      <DropDown
                        itemName={item?.name}
                        isRequired={item?.required}
                        label={item?.label}
                        items={item?.values}
                        placeholder={item?.placeholder}
                        onChange={list => {
                          const copyData = [...data];
                          copyData[index] = {...item, values: list};
                          setData(copyData);
                          handleDropdownChange(list, item?.name);
                        }}
                      />
                      {item?.values?.find(x => x?.selected && !!x?.label) &&
                        item.is_quantity && (
                          <View
                            style={{
                              paddingHorizontal: mvs(20),
                            }}>
                            <PrimaryInput
                              placeholder={t('Enter quantity')}
                              onChangeText={text => {
                                let currentItem = {...item};
                                currentItem.quantity = text;
                                const copy = [...data];
                                copy[index] = currentItem;
                                setData(copy);
                              }}
                            />
                          </View>
                        )}
                    </>
                  );
                } else if (item?.type === 'checkbox-group') {
                  return (
                    <MultiDropDown
                      isRequired={item?.required}
                      label={item?.label}
                      items={item?.values}
                      onChange={list => {
                        // console.log('multipule drop down selected list',list);
                        // console.log('multipule drop down selected list',item?.name);
                        const copyData = [...data];
                        copyData[index] = {...item, values: list};
                        setData(copyData);
                        handleMultiDropdownChange(list, item?.name);
                      }}
                      placeholder={item?.placeholder}
                    />
                  );
                } else if (item?.type === 'text') {
                  return (
                    <View style={{paddingHorizontal: mvs(20)}}>
                      <PrimaryInput
                        label={item?.label}
                        placeholder={item?.placeholder}
                        onChangeText={text => {
                          let currentItem = {...item};
                          currentItem.value = text;
                          const copy = [...data];
                          copy[index] = currentItem;
                          setData(copy);
                        }}
                        labelStyle={{color: colors.bluecolor}}
                        containerStyle={{height: mvs(40)}}
                      />
                    </View>
                  );
                } else if (item?.type === 'textarea') {
                  return (
                    <View style={{paddingHorizontal: mvs(20)}}>
                      <TextAreaInput
                        isRequired={item?.required}
                        label={item?.label}
                        keyboardType={'email-address'}
                        error={
                          touched?.input_details && errors?.input_details
                            ? `${t(errors?.input_details)}`
                            : undefined
                        }
                        placeholder={item?.placeholder}
                        onChangeText={str => {
                          setInstruction(str);
                        }}
                        // onBlur={() => setFieldTouched('input_details', true)}
                        // value={values.input_details}
                        value={instruction}
                      />
                      {console.log('values input details ', instruction)}
                    </View>
                  );
                }
                return null;
              })}
              {/* <PrimaryButton
                containerStyle={{
                  width: '30%',
                  alignSelf: 'flex-end',
                  marginRight: mvs(20),
                }}
                title="Add"
              /> */}
              {/* <TouchableOpacity
                onPress={() => {
                  const copy = [...data];
                  copy.push(service_data?.serivce?.json);
                  setData(copy);
                }}>
                <AntDesign
                  name="pluscircleo"
                  size={mvs(20)}
                  color={colors.primary}
                />
              </TouchableOpacity> */}

              <View style={{paddingHorizontal: mvs(20)}}>
                {/* <DatePicker
                  onChangeText={(str: string) => setFieldValue('date', str)}>
                  <PrimaryInput
                    isCalendar
                    editable={false}
                    error={
                      errors?.date && touched?.date ? `${errors?.date}` : ''
                    }
                    placeholder={t('date')}
                    onChangeText={str => setFieldValue('date', str)}
                    value={values.date}
                  />
                </DatePicker> */}
              </View>
            </KeyboardAvoidScrollview>
          </View>
        </View>
        {/* </ScrollView> */}

        <View
          style={{
            paddingHorizontal: mvs(20),
            // backgroundColor: colors.primary,
            paddingTop: mvs(20),
            paddingBottom: mvs(20),
          }}>
          <PrimaryButton
            containerStyle={styles.acceptbutton}
            loading={loading}
            textStyle={{color: colors.white}}
            onPress={() => postData()}
            title={t('next')}
          />
        </View>

        <OrderVerficationModal
          email={email}
          setEmail={setEmail}
          onClose={() => setOtpModalVisible(false)}
          visible={otpModalVisible}
          {...props}
        />
      </View>
    </View>
  );
};
export default FurnitureItemsScreen;
