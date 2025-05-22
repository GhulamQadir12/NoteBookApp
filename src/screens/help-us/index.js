import CustomMap from 'components/atoms/custom-map';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {Alert, Linking, TouchableOpacity, View} from 'react-native';
import {Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getContactUs} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import HtmlView from '../../components/atoms/render-html/index';
import styles from './styles';
const HelpUs = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const location = {
    latitude: data?.latitude * 1 || 37.78825,
    longitude: data?.longitude * 1 || -122.4324,
  };
  const openEmail = emailAddress => {
    // Verify that the emailAddress is not empty
    if (!emailAddress) {
      console.log('Email address is empty.');
      return;
    }

    // Define the URL format for both iOS and Android
    let emailUrl;
    if (Platform.OS === 'android') {
      emailUrl = `mailto:${emailAddress}`;
    } else {
      emailUrl = `mailto:${emailAddress}`;
    }

    Linking.openURL(emailUrl)
      .then(() => {
        console.log('Email app opened successfully.');
      })
      .catch(error => {
        console.error('Error opening email app:', error);
      });
  };

  const fetchContactUs = async () => {
    try {
      setLoading(true);
      const res = await getContactUs();

      setData(res);
    } catch (error) {
      console.log('Term Privacy get error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchContactUs();
  }, []);

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={t('Help Us')} />
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.body}>
          <View style={styles.contentContainerStyleNew}>
            <HtmlView html={data?.contact_us} />
          </View>
          <View style={styles.contentContainerStyleNew}>
            <Row style={{justifyContent: 'flex-start'}}>
              <MaterialCommunityIcons
                name="home"
                color={colors.primary}
                size={mvs(26)}
              />
              <Medium
                color={colors.black}
                label={data?.contact_address || 'N/A'}
                style={{marginLeft: mvs(6)}}
                numberOfLines={2}
              />
            </Row>
          </View>
          <View style={styles.contentContainerStyleNew}>
            <TouchableOpacity onPress={() => openEmail(data?.contact_email)}>
              <Row style={{justifyContent: 'flex-start'}}>
                <MaterialCommunityIcons
                  name="message-processing"
                  color={colors.primary}
                  size={mvs(26)}
                />
                <Medium
                  color={colors.black}
                  label={data?.contact_email || 'N/A'}
                  style={{marginLeft: mvs(6)}}
                  numberOfLines={2}
                />
              </Row>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainerStyleNew}>
            <TouchableOpacity
              onPress={() => UTILS.dialPhone(data?.contact_phone)}>
              <Row style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="phone"
                  color={colors.primary}
                  size={mvs(26)}
                />
                <Medium
                  color={colors.black}
                  label={data?.contact_phone || 'N/A'}
                  style={{marginLeft: mvs(6)}}
                  numberOfLines={2}
                />
              </Row>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainerStyleNew}>
            <Medium
              label={t('Reach out at')}
              color={colors.primary}
              style={{marginBottom: mvs(10)}}
            />
            <Row>
              <MaterialCommunityIcons
                onPress={() => UTILS.openFacebookLink(data?.contact_facebook)}
                name="facebook"
                color={colors.primary}
                size={mvs(26)}
              />
              <MaterialCommunityIcons
                onPress={() => UTILS.openTwitterLink(data?.contact_x)}
                name="twitter"
                color={colors.primary}
                size={mvs(26)}
              />
              <MaterialCommunityIcons
                onPress={() => UTILS.openInstagramLink(data?.contact_instagram)}
                name="instagram"
                color={colors.primary}
                size={mvs(26)}
              />
              <MaterialCommunityIcons
                onPress={() => UTILS.openLinkedInLink(data?.contact_linkedin)}
                name="linkedin"
                color={colors.primary}
                size={mvs(26)}
              />
            </Row>
          </View>
          <CustomMap
            initialRegion={{
              latitude: location?.latitude,
              longitude: location?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker coordinate={location} />
          </CustomMap>
        </View>
      )}
    </View>
  );
};
export default HelpUs;
