import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {ClockIcon, RemoveIcon, Tick} from 'assets/icons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import moment from 'moment';
import {PrimaryButton} from 'components/atoms/buttons';

const LoanRequestCard = ({
  item,
  style,
  onPress,
  isExpanded,
  onPressNavigate,
}) => {
  console.log('item in loan request card', item);
  const loanDate = moment(item?.DateOfLoan).format('YYYY-MM-DD');
  const formattedDate = moment(item?.DateOfLoan).format('MMMM DD, YYYY');
  const deductionMonth = moment(item?.MonthOfDeduction).format('YYYY-MM-DD');
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(10), alignItems: 'center'}}>
        {item?.HRapproval === 'Approved' ? (
          <Tick />
        ) : item?.HRapproval === 'Rejected' ? (
          <AntDesign name="closecircle" size={32} color="red" /> // Replace with your actual remove icon component
        ) : (
          <ClockIcon />
        )}
        <View style={{flex: 1}}>
          <Row style={{justifyContent: 'space-between'}}>
            <Bold
              fontSize={mvs(16)}
              color={colors.primary}
              label={formattedDate}
            />
            <PrimaryButton
              onPress={onPressNavigate}
              title={'Details'}
              containerStyle={styles.detailbutton}
            />
          </Row>
          <Row style={styles.statusContainer}>
            <Medium
              color={
                item?.HRapproval === 'Pending'
                  ? colors.yellow
                  : item?.HRapproval === 'Rejected'
                  ? colors.red
                  : colors.green
              }
              label={item?.HRapproval}
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
            <View style={{width: '40%'}}>
              <Bold label={'Sr #'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item?.Loan_Id} numberOfLines={5}/>
            </View>
          </Row> */}

          {/* <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '40%'}}>
              <Bold label={'Employe Id :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={'123456789'} />
            </View>
          </Row> */}
          {/* <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '40%'}}>
              <Bold label={'Request date :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={'02 October 2024'} />
            </View>
          </Row> */}
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '40%'}}>
              <Bold
                label={'Amount of Loan'}
                color={colors.primary}
                numberOfLines={5}
              />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={item?.AmountOfLoan}
                numberOfLines={5}
              />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '40%'}}>
              <Bold
                label={'no of Installments'}
                color={colors.primary}
                numberOfLines={5}
              />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={item?.TotalNoOfInstallment}
                numberOfLines={5}
              />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '40%'}}>
              <Bold
                label={'Amount of Installment'}
                color={colors.primary}
                numberOfLines={5}
              />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={item?.AmountOfInstallment}
                numberOfLines={5}
              />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '40%'}}>
              <Bold
                label={'Month of Deduction'}
                color={colors.primary}
                numberOfLines={5}
              />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={deductionMonth}
                numberOfLines={5}
              />
            </View>
          </Row>
          {/* <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '40%'}}>
              <Bold label={'Remaining Amount'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={deductionMonth} numberOfLines={5}/>
            </View>
          </Row> */}
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(LoanRequestCard);
