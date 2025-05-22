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

const OvertimeRequestCard = ({item, style, onPress, isExpanded}) => {
  const DateFrom = moment(item?.date).format('YYYY-MM');
  const DateTo = moment(item?.wfh?.DateTo).format('YYYY-MM-DD');
  console.log("DateTo ",DateFrom);  // Output: 2024-11-21
  // console.log("item in wfh card",item);
  // console.log("item in wfh card",item?.wfh?.Status);
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(10), alignItems: 'center'}}>
        {/* {item?.status === 'Approved' ? <Tick /> : <ClockIcon />} */}
        {item?.status === 'Pending' ? <ClockIcon /> :  <Tick />}
        <View style={{flex: 1}}>
          <Bold
            fontSize={mvs(15)}
            color={colors.primary}
            label={`${item?.date}`}
          />
          <Row style={styles.statusContainer}>
            <Medium
              color={item?.status === 'Pending' ? colors.yellow : colors.green}
              label={item?.status}
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
            <View style={{width: '30%'}}>
              <Bold label={'Time From :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item.time_from} />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '30%'}}>
              <Bold label={'Time To :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item?.time_to} />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '30%'}}>
              <Bold label={'No of Hours :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item?.no_of_hours} />
            </View>
          </Row>

    
        </>
      )}
    </TouchableOpacity>
  );
};

export default OvertimeRequestCard;
