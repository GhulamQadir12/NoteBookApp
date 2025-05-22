import { Row } from 'components/atoms/row';
import { colors } from 'config/colors';
import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import moment from 'moment';


const ReimbursementDetailCard = ({item, onPress}) => {


const RequestDate = moment(item.RequestDate).format('YYYY-MM-DD');
  return (
    <View style={styles.itemContainer}>
        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Reimbursement Id :'}
              color={colors.black}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={' '+(item.ReimbursementId)}
              numberOfLines={5}
            />
          </View>
        </Row>
        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Reimbursement Date :'}
              color={colors.black}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={' '+RequestDate}
              numberOfLines={5}
            />
          </View>
        </Row>
        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Amount :'}
              color={colors.black}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={item.Amount}
              numberOfLines={5}
            />
          </View>
        </Row>
        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Advance :'}
              color={colors.black}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={item.Advance}
              numberOfLines={5}
            />
          </View>
        </Row>
        <Row style={{justifyContent: 'flex-start'}}>
          <View style={{width: '35%'}}>
            <Bold
              label={'Total :'}
              color={colors.black}
              numberOfLines={5}
            />
          </View>
          <View style={{flex: 1}}>
            <Regular
              color={colors.placeholder}
              label={item.Total}
              numberOfLines={5}
            />
          </View>
        </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f1f1',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 2,
  },
  label: {
    color: colors.primary,
    fontWeight: 'bold',
    color: '#343a40',
  },
});

export default ReimbursementDetailCard;
