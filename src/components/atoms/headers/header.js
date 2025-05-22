import {useNavigation} from '@react-navigation/native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {I18nManager, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {Row} from '../row';
const FormHeader = ({
  style = {},
  mtop = 0,
  title,
  back = true,
  color,
  countTitle,
  countTitleOne,
  countTitleTwo,
  countTitleThree,
  titleOne,
  titleTwo,
  titleThree,
  titleFour,
  cardcontainer,
  ...props
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <Row style={{alignItems: 'center'}}>
        {back ? (
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Icon
              name={I18nManager.isRTL ? 'right' : 'left'}
              size={mvs(20)}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}

        {title && (
          <Medium fontSize={mvs(20)} label={title} style={[styles.title]} />
        )}
        <View style={styles.empty} />
      </Row>
      <Row style={[styles.innerContainer,cardcontainer]}>
        <View style={styles.textContainer}>
          <Bold
            label={countTitle || 0}
            color={colors.primary}
            fontSize={mvs(18)}
          />
          <Regular
            label={titleOne || 'N/A'}
            color={colors.black}
            fontSize={mvs(14)}
          />
        </View>
        <View style={styles.textContainer}>
          <Bold
            label={countTitleOne || 0}
            color={colors.primary}
            fontSize={mvs(18)}
          />
          <Regular
            label={titleTwo || 0}
            color={colors.black}
            fontSize={mvs(14)}
          />
        </View>
        <View style={styles.textContainer}>
          <Bold
            label={countTitleTwo || 0}
            color={colors.primary}
            fontSize={mvs(18)}
          />
          <Regular
            label={titleThree || 'N/A'}
            color={colors.black}
            fontSize={mvs(14)}
            numberOfLines={3}
          />
        </View>
        <View style={styles.textContainer}>
          <Bold
            label={countTitleThree || 0}
            color={colors.primary}
            fontSize={mvs(18)}
          />
          <Regular
            label={titleFour || 'N/A'}
            color={colors.black}
            fontSize={mvs(14)}
          />
        </View>
      </Row>
    </View>
  );
};
export default React.memo(FormHeader);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(20),
    paddingTop: mvs(15),
    height: mvs(100),
  },
  empty: {
    width: mvs(10),
  },
  title: {
    fontSize: mvs(18),
    color: colors.white,
  },
  back: {},
  innerContainer: {
    width: '100%',
    height: mvs(70),
    backgroundColor: colors.yellow,
    marginTop: mvs(20),
    borderRadius: mvs(10),
    padding: mvs(5),
  },
  textContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
