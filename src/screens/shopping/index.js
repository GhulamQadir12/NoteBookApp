import Header1x2x from 'components/atoms/headers/header-1x-2x';
import SwiperCard from 'components/atoms/swiper';
import ServiceCard from 'components/molecules/service-card';
import {SERVICE_LIST} from 'config/constants';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {Image, View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import styles from './styles';
import HomeSwiper from 'components/molecules/home-swiper';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {colors} from 'config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Row} from 'components/atoms/row';
import {UTILS} from 'utils';
import CustomMap from 'components/atoms/custom-map';
const ShoppingScreen = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const language = user?.language;
  const dispatch = useAppDispatch();
  const {t} = i18n;

  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={t('contact_us')} />

      <View style={styles.body}>
        <View style={styles.contentContainerStyleNew}>
          <Medium
            label={t(
              'Interested? We d love to hear from you; get in touch now at…',
            )}
            color={colors.black}
            numberOfLines={2}
            fontSize={mvs(16)}
          />
          <Medium
            label={t(' Feel Free to Contact Us')}
            color={colors.primary}
            fontSize={mvs(16)}
          />
        </View>
        <View style={styles.contentContainerStyleNew}>
          <Row style={{justifyContent: 'flex-start'}}>
            <MaterialCommunityIcons
              name="home"
              color={colors.primary}
              size={mvs(26)}
            />
            <Medium
              label={
                'Kemp House 152-160. City Road London, EC1V 2NX, United Kingdom'
              }
              style={{marginLeft: mvs(6)}}
              numberOfLines={2}
            />
          </Row>
        </View>
        <View style={styles.contentContainerStyleNew}>
          <Row style={{justifyContent: 'flex-start'}}>
            <MaterialCommunityIcons
              name="message-processing"
              color={colors.primary}
              size={mvs(26)}
            />
            <Medium
              label={'info@getmovers.co.uk'}
              style={{marginLeft: mvs(6)}}
              numberOfLines={2}
            />
          </Row>
        </View>
        <View style={styles.contentContainerStyleNew}>
          <Row style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="phone"
              color={colors.primary}
              size={mvs(26)}
            />
            <Medium
              label={'0800 6358888'}
              style={{marginLeft: mvs(6)}}
              numberOfLines={2}
            />
          </Row>
        </View>
        <View style={styles.contentContainerStyleNew}>
          <Row style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="phone-classic"
              color={colors.primary}
              size={mvs(26)}
            />
            <Medium
              label={'0800 6358889'}
              style={{marginLeft: mvs(6)}}
              numberOfLines={2}
            />
          </Row>
        </View>
        <View style={styles.contentContainerStyleNew}>
          <Medium
            label={t('reach_out_at')}
            color={colors.primary}
            style={{marginBottom: mvs(10)}}
          />
          <Row>
            <MaterialCommunityIcons
              onPress={() => UTILS.openFacebookLink()}
              name="facebook"
              color={colors.primary}
              size={mvs(26)}
            />
            <MaterialCommunityIcons
              onPress={() => UTILS.openTwitterLink()}
              name="twitter"
              color={colors.primary}
              size={mvs(26)}
            />
            <MaterialCommunityIcons
              onPress={() => UTILS.openInstagramLink()}
              name="instagram"
              color={colors.primary}
              size={mvs(26)}
            />
            <MaterialCommunityIcons
              onPress={() => UTILS.openLinkedInLink()}
              name="linkedin"
              color={colors.primary}
              size={mvs(26)}
            />
          </Row>
        </View>
        <CustomMap />
      </View>
    </View>
  );
};
export default ShoppingScreen;
