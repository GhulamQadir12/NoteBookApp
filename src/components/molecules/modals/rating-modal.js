import {colors} from 'config/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import PrimaryInput from 'components/atoms/inputs';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {mvs} from 'config/metrices';
import i18n from 'translation';
import {PrimaryButton} from 'components/atoms/buttons';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
// import StarRating from 'components/atoms/starRating';
import StarRating from './../../atoms/starRating';
const RatingModal = ({
  style,
  visible = false,
  values,
  setValues,
  ratingLoading,
  onSubmit,
  onClose = item => {},
}) => {
  const {t} = i18n;

  const [rankingCount, setRankingCount] = React.useState(0);

  // Handler to update the comment value
  const handleCommentChange = newComment => {
    // Update the value state with the new comment
    setValues({...values, comment: newComment});
  };

  // Handler to update the rating value
  const handleRatingChange = newRating => {
    // Update the value state with the new rating
    setValues({...values, rating: newRating});
  };
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={{...styles.contentContainerStyle, style}}>
      <View style={{...styles.container}}>
        <Bold color={colors.text} label={t('Rate The Driver Boy')} />

        <StarRating
          initialRating={rankingCount}
          onRatingChange={handleRatingChange}
        />
        <PrimaryInput
          multiline={true}
          numberOfLines={5}
          value={values.comment} // Use the comment value from state
          onChangeText={handleCommentChange} // Use the comment change handler
          placeholder={t('Enter Comment ...')}
          containerStyle={{height: mvs(150), marginTop: mvs(20), width: '100%'}}
          // style={{
          //   height: mvs(150),
          //   textAlignVertical: 'top',
          //   paddingTop: mvs(10),
          // }}
        />
        <View style={styles.otp}>
          <Row>
            <PrimaryButton
              onPress={() => onClose()}
              title={t('No')}
              containerStyle={{
                marginTop: mvs(20),
                width: '40%',
                borderRadius: mvs(30),
              }}
            />
            <PrimaryButton
              onPress={onSubmit}
              loading={ratingLoading}
              title={t('Submit')}
              containerStyle={{
                marginTop: mvs(20),
                width: '40%',
                borderRadius: mvs(30),
              }}
            />
          </Row>
        </View>
      </View>
    </ModalWrapper>
  );
};
export default RatingModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: mvs(20),
  },
  container: {
    // height: mvs(300),
    backgroundColor: colors.white,
    padding: mvs(20),
    borderRadius: mvs(20),
    alignItems: 'center',
  },

  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  msg: {
    textAlign: 'center',
    alignSelf: 'center',
    width: mvs(250),
    fontSize: mvs(20),
  },
  button: {
    paddingHorizontal: mvs(30),
    marginBottom: mvs(20),
  },
  cross: {padding: mvs(20), alignSelf: 'flex-end', position: 'absolute'},
});
