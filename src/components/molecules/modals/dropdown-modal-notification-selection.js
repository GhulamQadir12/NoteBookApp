import {CrossModal} from 'assets/icons';
import {PrimaryInput} from 'components/atoms/inputs';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Medium from 'typography/medium-text';

const DropdownModalNotificationSelection = ({
  style = {},
  value,
  visible = false,
  onClose = () => {},
  onChangeText,
  items = [],
}) => {
  const [customDate, setCustomDate] = React.useState('');
  const [isCustomSelected, setIsCustomSelected] = React.useState(false);

  const handleCustomInputBlur = () => {
    if (customDate) {
      // Create the custom option structure
      const customOption = {
        index: 6, // Index for custom option
        name: customDate,
      };

      onChangeText(customOption); // Send the correct object
      setIsCustomSelected(false); // Reset custom selection state
      setCustomDate(''); // Clear custom input
      onClose(); // Close the dropdown
    }
  };

  return (
    <ModalWrapper
      onBackdropPress={() => {
        setIsCustomSelected(false);
        onClose();
      }}
      onBackButtonPress={() => {
        setIsCustomSelected(false);
        onClose();
      }}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>
        <View style={styles.header} />
        <TouchableOpacity
          onPress={() => {
            setIsCustomSelected(false);
            onClose();
          }}
          style={styles.cross}>
          <CrossModal height={mvs(30)} width={mvs(30)} />
        </TouchableOpacity>
        <Medium
          numberOfLines={2}
          style={styles.pick}
          label={t('Select Type')}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: mvs(20),
            paddingTop: mvs(10),
          }}>
          {items?.map((item, index) => {
            if (item?.elem === 'custom') {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setIsCustomSelected(true)}
                  style={styles.button}>
                  <Medium
                    color={colors.primary}
                    label={item?.elem}
                    style={{fontSize: mvs(16)}}
                  />
                  <Icon
                    name={
                      isCustomSelected
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    size={mvs(20)}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setIsCustomSelected(false);
                  onChangeText({
                    index: item?.index,
                    name: item?.elem,
                  }); // Send structured object
                  onClose(); // Close the dropdown
                }}
                style={styles.button}>
                <Medium
                  color={colors.primary}
                  label={item?.elem || item?.index}
                  style={{fontSize: mvs(16)}}
                />
                <Icon
                  name={
                    item?.index === value?.index
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={mvs(20)}
                  color={colors.primary}
                />
              </TouchableOpacity>
            );
          })}
          {isCustomSelected && (
            <PrimaryInput
              placeholder="Enter custom time..."
              onChangeText={setCustomDate}
              value={customDate}
              onBlur={handleCustomInputBlur} // Handle blur to finalize custom value
            />
          )}
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};


export default DropdownModalNotificationSelection;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  container: {
    maxHeight: mvs(572),
    minHeight: mvs(200),
    backgroundColor: colors.white,
    paddingTop: mvs(15),
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
  },
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  pick: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: mvs(20),
    color: colors.primary,
  },
  button: {
    paddingHorizontal: mvs(30),
    marginBottom: mvs(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.7,
  },
  cross: {padding: mvs(19), alignSelf: 'flex-end', position: 'absolute'},
});
