import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {ClockIcon, Tick} from 'assets/icons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import moment from 'moment';
import {PrimaryButton} from 'components/atoms/buttons';

const AdvanceRequestCard = ({
  item,
  style,
  onPress,
  isExpanded,
  onPressNavigate,
}) => {
  const DateofAdvance = moment(item?.DateofAdvance).format('MMMM DD, YYYY');
  console.log('item in advance request card', item);

  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(10), alignItems: 'center'}}>
        {item?.dep?.HRapproval === 'Approved' ? (
          <Tick />
        ) : item?.dep?.HRapproval === 'Rejected' ? (
          <AntDesign name="closecircle" size={32} color="red" /> // Replace with your actual remove icon component
        ) : (
          <ClockIcon />
        )}
        <View style={{flex: 1}}>
          <Row style={{justifyContent: 'space-between'}}>
            <Bold
              fontSize={mvs(15)}
              color={colors.primary}
              label={DateofAdvance}
              style={{marginTop: mvs(10)}}
            />
            <PrimaryButton
              onPress={onPressNavigate}
              title={'Detail'}
              containerStyle={{
                width: '25%',
                backgroundColor: colors.primary,
                height: mvs(35),
                borderRadius: mvs(5),
                marginBottom: mvs(10),
              }}
            />
          </Row>
          <Row style={styles.statusContainer}>
            <Medium
              color={
                item?.dep?.HRapproval === 'Pending'
                  ? colors.yellow
                  : item?.dep?.HRapproval === 'Rejected'
                  ? colors.red
                  : colors.green
              }
              label={item?.dep?.HRapproval}
              numberOfLines={5}
            />
            <AntDesign
              name={isExpanded ? 'up' : 'down'}
              size={15}
              color={colors.black}
            />
          </Row>
        </View>
      </Row>
      {isExpanded && (
        <>
          <View style={styles.line} />
          {/* <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Request date :'} numberOfLines={5} />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={DateofAdvance}
                numberOfLines={5}
              />
            </View>
          </Row> */}
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '45%'}}>
              <Bold label={'Amount of advance  :'} numberOfLines={5} />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={item?.dep?.AmountOfAdvance}
                numberOfLines={5}
              />
            </View>
          </Row>
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(AdvanceRequestCard);
