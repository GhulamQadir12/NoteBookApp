import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {View} from 'react-native';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';

const InboxChatCard = ({item, style, onPress, loading}) => {
  const me = item.me;
  return (
    <View
      onPress={onPress}
      style={[{alignItems: me ? 'flex-end' : 'flex-start'}, styles.container]}>
      <View
        style={[
          {
            borderBottomRightRadius: me ? mvs(0) : mvs(23),
            borderBottomLeftRadius: me ? mvs(23) : mvs(0),
            opacity: me ? 0.5 : 1,
          },
          styles.innerContainer,
        ]}>
        <Medium
          color={colors.white}
          fontSize={mvs(12)}
          numberOfLines={5}
          label={item?.message || ''}
        />
        <Regular style={styles.timeText} label={item?.time} />
      </View>
    </View>
  );
};
export default React.memo(InboxChatCard);
