import * as IMG from 'assets/images';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview/index';
import { Loader } from 'components/atoms/loader';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import {
  Image,
  View
} from 'react-native';
import { getTermsAndCondition } from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import HtmlView from './../../components/atoms/render-html/index';
import styles from './styles';
const TermsandConditionsScreen = props => {
  const {t} = i18n;

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({});
  const fetchPrivacy = async () => {
    try {
      setLoading(true);
      const res = await getTermsAndCondition();
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
      <Image
        resizeMode="cover"
        source={IMG.signupheader}
        style={styles.logobackground}
      />
      <Header1x2x
        style={{backgroundColor: colors.transparent}}
        title={t('terms_and_conditions')}
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
                label={t('terms_&_conditions')}
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
export default TermsandConditionsScreen;
