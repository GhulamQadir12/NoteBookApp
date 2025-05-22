import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {Alert, Image, View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';
import {UTILS} from 'utils';
import {getPrivacy} from 'services/api/auth-api-actions';
import {Loader} from 'components/atoms/loader';
import HtmlView from './../../components/atoms/render-html/index';
const PrivacyPolicyScreen = props => {
  const {t} = i18n;

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const fetchPrivacy = async () => {
    try {
      setLoading(true);
      const res = await getPrivacy();
      setData(res);
    } catch (error) {
      console.log('Term Privacy get error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchPrivacy();
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.container}> */}
      <Image
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}
      />
      <Header1x2x
        style={{backgroundColor: colors.transparent}}
        title={t('return_policy & private_policy')}
      />

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.contentContainerStyle}>
          <View style={styles.contentContainerStyleNew}>
            <KeyboardAvoidScrollview
              contentContainerStyle={{
                paddingHorizontal: mvs(0),
                flexGrow: 0,
                paddingBottom: mvs(50),
              }}>
              <Bold
                label={t('return_policy & private_policy')}
                color={colors.red}
                fontSize={mvs(16)}
                style={{alignSelf: 'center', marginBottom: mvs(10)}}
              />

              <HtmlView html={data} />
            </KeyboardAvoidScrollview>
          </View>
        </View>
      )}
    </View>
  );
};
export default PrivacyPolicyScreen;
