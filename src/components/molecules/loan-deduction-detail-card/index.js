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

const LoanDeductionDetailCard = ({item, style, onPress, isExpanded,onPressNavigate}) => {
  console.log("item in loan request card", item);
  const loanDate = moment(item?.DateOfLoan).format('YYYY-MM-DD');
  const formattedDate = moment(item?.DateOfLoan).format('MMMM DD, YYYY');
  const deductionMonth = moment(item?.MonthOfDeduction).format('YYYY-MM-DD');
  return (
    // <TouchableOpacity onPress={onPress} style={{...styles.container}}>
    <View style={{...styles.container}}>

          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '40%'}}>
              <Bold label={'Amount of Loan :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item?.DeductionAmount} numberOfLines={5}/>
            </View>
          </Row>
          <Row style={{ justifyContent: 'flex-start'}}>
            <View style={{width: '40%'}}>
              <Bold label={'Installments Date:'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item?.DeductionMonth} numberOfLines={5}/>
            </View>
          </Row>
         
        
    </View>
    // </TouchableOpacity>
  );
};

export default React.memo(LoanDeductionDetailCard);
