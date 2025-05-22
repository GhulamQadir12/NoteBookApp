import {mvs} from 'config/metrices';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';

import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import {colors} from 'config/colors';

const ChatCard = ({item, style, onPress, loading}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Row style={styles.InnerContainer}>
        <View style={styles.imageContainer}>
          <Image
            borderRadius={mvs(10)}
            source={
              item?.receiver_image
                ? {uri: item?.receiver_image}
                : IMG?.DrawerLogo
            }
            style={styles.backGroundImage}
          />

          {/* <Image source={{uri: item?.image}} style={styles.innerImage} /> */}
        </View>
        <View style={{paddingHorizontal: mvs(10), flex: 1}}>
          <Bold color={colors.black} label={item?.receiver_name} />
          <Regular
            color={colors.black}
            numberOfLines={1}
            label={item?.receiver_email}
          />
        </View>
        {/* <Regular label={'08:06'} /> */}
      </Row>
    </TouchableOpacity>
  );
};
export default React.memo(ChatCard);
