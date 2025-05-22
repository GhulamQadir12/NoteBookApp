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
import { PrimaryButton } from 'components/atoms/buttons';

const AttendanceCorrectionRequestCard = ({item, style, onPress, isExpanded,onPressNavigate}) => {
  const DateFormatter = (dateString) => {
  const DateofAdvance = moment(dateString).format('MMMM DD, YYYY');
  console.log('item in atd corrw request card', item);
  return DateofAdvance;
  }
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(15), alignItems: 'center'}}>
         {item?.ApprovalStatus === 'Approved' ? (
                          <Tick />
                        ) : item?.ApprovalStatus === 'Rejected' ? (
                          <AntDesign name="closecircle" size={32} color="red" /> // Replace with your actual remove icon component
                        ) : (
                          <ClockIcon />
                        )}
        <View style={{flex: 1}}>
          <Bold
            fontSize={mvs(15)}
            color={colors.primary}
            label={DateFormatter(item?.DateTime)}
            style={{marginTop: mvs(10)}}
          />
          
          <Row style={styles.statusContainer}>
            <Medium
              color={
                              item?.ApprovalStatus === 'Pending'
                                ? colors.yellow
                                : item?.ApprovalStatus === 'Rejected'
                                ? colors.red
                                : colors.green
                            }
              label={item?.ApprovalStatus}
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
      
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Employee  :'} numberOfLines={5} />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={item?.Name}
                numberOfLines={5}
              />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Correction Date  :'} numberOfLines={5} />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={DateFormatter(item?.DateTime)}
                numberOfLines={5}
              />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Request Date  :'} numberOfLines={5} />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={DateFormatter(item?.ReqDate)}
                numberOfLines={5}
              />
            </View>
          </Row>
        </>
      )}
    </TouchableOpacity>
  );
};

export default AttendanceCorrectionRequestCard;
