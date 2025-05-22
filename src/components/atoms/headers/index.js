import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Bold from '../../../typography/bold-text';
import {Row} from '../row';
import {LogoutIcon, MenuIcon} from 'assets/icons/tab-icons';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const AppHeader = ({
  style,
  title,
  unreadNotification,
  onPress,
  back,
  ...props
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <Row style={{alignItems: 'center'}}>
        <Bold label={title} style={styles.title} />
        <TouchableOpacity onPress={() => navigation?.toggleDrawer()}>
          <MenuIcon />
        </TouchableOpacity>
      </Row>
    </View>
  );
};
export default React.memo(AppHeader);
const styles = StyleSheet.create({
  container: {
    // height: mvs(80),
    width: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(20),
    borderBottomLeftRadius: mvs(40),
    borderBottomRightRadius: mvs(40),
    paddingVertical: mvs(20),
  },
  title: {
    fontSize: mvs(18),
    color: colors.white,
    marginVertical: mvs(12),
  },
});
