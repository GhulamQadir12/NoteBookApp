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

const ComplainRequestCard = ({item, style, onPress, isExpanded}) => {
  console.log('item in complain request card', item);
  const DateofRequest = moment(item?.TimeOfComplaint).format('MMMM DD, YYYY');

  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(10), alignItems: 'center'}}>
        {item?.ComplaintStatus === 'Approved' ? (
          <Tick />
        ) : item?.ComplaintStatus === 'Rejected' ? (
          <AntDesign name="closecircle" size={32} color="red" /> // Replace with your actual remove icon component
        ) : (
          <ClockIcon />
        )}
        <View style={{flex: 1}}>
          <Bold
            fontSize={mvs(15)}
            color={colors.primary}
            label={DateofRequest}
          />
          <Row style={styles.statusContainer}>
            <Medium
              color={
                item?.ComplaintStatus === 'Pending'
                  ? colors.yellow
                  : item?.ComplaintStatus === 'Rejected'
                  ? colors.red
                  : colors.green
              }
              label={
                item?.ComplaintStatus === 'Rejected'
                  ? 'Dismissed'
                  : item?.ComplaintStatus === 'Approved'
                  ? 'Resolved'
                  : 'Partially Resolved'
              }
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
              <Bold label={'Request date :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={DateofRequest} numberOfLines={5}/>
            </View>
          </Row> */}

          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold
                label={'Complain Type :'}
                color={colors.primary}
                numberOfLines={5}
              />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={item?.ComplainAgainst}
                numberOfLines={5}
              />
            </View>
          </Row>
          {/* <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Complain Description :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item?.ComplainAgainst} numberOfLines={5}/>
            </View>
          </Row> */}
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ComplainRequestCard);
