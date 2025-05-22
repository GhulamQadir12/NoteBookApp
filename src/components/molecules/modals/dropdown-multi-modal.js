import { CrossModal } from 'assets/icons';
import { ModalWrapper } from 'components/atoms/modal-wrapper';
import { Row } from 'components/atoms/row';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
const DropdownMultiModal = ({
  style = {},
  value,
  visible = false,
  onClose = item => {},
  onChange,
  label,
  items = [],
}) => {
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>
        <View style={styles.header} />
        <Row style={{paddingHorizontal:mvs(20),alignItems:'center'}}>
          <View/>
          <Bold fontSize={mvs(16)} label={label} />
        <TouchableOpacity onPress={() => onClose()} style={styles.cross}>
          <CrossModal height={mvs(25)} width={mvs(25)} />
        </TouchableOpacity>

        </Row>
             <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: mvs(20),
                paddingTop: mvs(10),
                paddingBottom:mvs(20)
              }}
              nestedScrollEnabled>
                  {items?.map((item, index) => (
                <TouchableOpacity
                style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}
                  onPress={() => {
                    item.selected = !item.selected;
                    const copy = [...items];
                    copy[index] = item;
                    onChange(copy);
                  }}>
                  <Regular
                    color={colors.black}
                    label={item?.label}
                    fontSize={mvs(12)}
                  />
                   <MaterialCommunityIcons
                   color={colors.primary}
                  name={
                    item?.selected === true
                      ? 'checkbox-outline'
                      : 'checkbox-blank-outline'
                  }
                  size={mvs(20)}
                />
                </TouchableOpacity>
              ))}
            </ScrollView>
      </View>
    </ModalWrapper>
  );
};
export default DropdownMultiModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '95%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  container: {
    maxHeight: mvs(572),
    // minHeight: mvs(200),
    backgroundColor: colors.white,
    paddingTop: mvs(15),
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
    paddingBottom:Platform.OS ==='ios'? mvs(10):mvs(0),
  },
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(0),
  },
  pick: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: mvs(20),
  },
  button: {
    paddingHorizontal: mvs(30),
    marginBottom: mvs(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.7,
  },
  // cross: {padding: mvs(20), alignSelf: 'flex-end', position: 'absolute'},
});
