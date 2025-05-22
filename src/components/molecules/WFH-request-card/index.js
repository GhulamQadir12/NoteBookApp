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

const WorkFromHomeRequestCard = ({item, style, onPress, isExpanded}) => {
  const DateFrom = moment(item?.wfh?.DateFrom).format('YYYY-MM-DD');
  const DateTo = moment(item?.wfh?.DateTo).format('YYYY-MM-DD');

  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(10), alignItems: 'center'}}>
        {item?.wfh?.Status === 'Approved' ? (
          <Tick />
        ) : item?.dep?.HRapproval === 'Rejected' ? (
          <AntDesign name="closecircle" size={32} color="red" /> // Replace with your actual remove icon component
        ) : (
          <ClockIcon />
        )}
        <View style={{flex: 1}}>
          <Bold
            fontSize={mvs(15)}
            color={colors.primary}
            label={`${DateFrom} - ${DateTo}`}
          />
          <Row style={styles.statusContainer}>
            <Medium
              color={
                item?.wfh?.Status === 'Pending'
                  ? colors.yellow
                  : item?.wfh?.Status === 'Rejected'
                  ? colors.red
                  : colors.green
              }
              label={item?.wfh?.Status}
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
              <Bold label={'Date From :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={DateFrom} />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '30%'}}>
              <Bold label={'Date To :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={DateTo} />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '30%'}}>
              <Bold label={'No of Days :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item?.wfh?.NoOfDays} />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '30%'}}>
              <Bold label={'Category :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={item?.wfh?.WFHCategory}
              />
            </View>
          </Row>
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(WorkFromHomeRequestCard);
