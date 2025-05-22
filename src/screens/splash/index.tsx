import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as IMG from 'assets/images';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import i18n from 'translation';
import {UTILS} from 'utils';
import {STORAGEKEYS} from '../../config/constants';
import {
  setLanguage,
  setLocation,
  setUserInfo,
} from '../../store/reducers/user-reducer';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import { navigate } from 'navigation/navigation-ref';

type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash = (props: props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
          setTimeout(() => {
            navigate('CardsScreen');
          }, 2000);
    })();
  }, []);

  return (
    <View style={{...styles.container}}>
      
        {/* <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '87%',
          }}> */}
          <Image
            source={IMG.splash}
            resizeMode={'contain'}
            style={{width: mvs(400), height: mvs(300)}}
          />
        {/* </View> */}
    </View>
  );
};
export default Splash;
