import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {ClockIcon, Tick} from 'assets/icons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import moment from 'moment';
import { PrimaryButton } from 'components/atoms/buttons';

const ReimbursementRequestCard = ({item, style,onPress, onPressNavigate, isExpanded}) => {
  const formattedDate = moment(item.ReimbursementDate).format('YYYY-MM-DD');
  // console.log("items:",item)
  // console.log("items:",item.ReimbursementId)
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(10), alignItems: 'center'}}>
        {item?.ReimbursementStatus === 'Approved' || item?.ReimbursementStatus === 'PartiallyApproved' ? <Tick /> : <ClockIcon />}
        <View style={{flex: 1}}>
        <Row style={{justifyContent: 'space-between'}}>
          <Bold
            fontSize={mvs(14)}
            color={colors.primary}
            label={item?.FY_Month}
          />
          <PrimaryButton onPress={onPressNavigate}  title={"Detail"} containerStyle={{width:'25%',backgroundColor:colors.primary,height:mvs(35),borderRadius:mvs(5),marginBottom:mvs(10)}}/>
          </Row>
          <Row style={styles.statusContainer}>
            <Medium
              color={item?.ReimbursementStatus === 'Pending' ? colors.yellow : colors.green}
              label={item?.ReimbursementStatus}
            />
            <AntDesign
              name={isExpanded ? 'up' : 'down'}
              size={12}
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
              <Bold label={'Request Id :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item.ReimbursementId} numberOfLines={5}/>
            </View>
          </Row>

          {/* <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Employee Id :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item.EmployeeId} numberOfLines={5}/>
            </View>
          </Row> */}

          {/* <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Employee :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item.RequestedBy} numberOfLines={5}/>
            </View>
          </Row> */}

          {/* <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Department :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{width:'65%'}} >
              <Regular color={colors.placeholder} label={item.Department} numberOfLines={5}/>
            </View>
          </Row> */}

          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Requested Total :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item.Total} numberOfLines={5}/>
            </View>
          </Row>

          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Total Approved :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item.TotalApproved} numberOfLines={5}/>
            </View>
          </Row>

          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Request date :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={formattedDate} numberOfLines={5}/>
            </View>
          </Row>

          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Reimbursement Status :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item.ReimbursementStatus} numberOfLines={5}/>
            </View>
          </Row>

        
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ReimbursementRequestCard);
