import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './style';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import {Row} from 'components/atoms/row';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from 'config/colors';
import { TouchableOpacity } from 'react-native';

const AddReimbursementCard = ({reimbursement,onDelete,onEdit }) => {
  // console.log("ReimbursementDate",reimbursement);
  return (
    <View>
      <TouchableOpacity onPress={onDelete} style={styles.crossButton}>
        <Entypo color={colors.red} name="cross" size={25} />
        </TouchableOpacity>
      <View style={styles.card}>
        <Row>
          <Bold style={styles.title} label={'Reimbursement Details'} numberOfLines={3}/>
          <TouchableOpacity onPress={() => onEdit(reimbursement)}>
          <Feather color={colors.green} name="edit" size={25} />
          </TouchableOpacity>
        </Row>
        <Row>
          <Medium style={styles.label} label={'Date : '} />
          <Regular
            style={styles.value}
            label={reimbursement.date}
            numberOfLines={3}
          />
        </Row>
        <Row>
          <Medium style={styles.label} label={'Amount : '} numberOfLines={3}
          />
          <Regular style={styles.value} label={reimbursement.Amount} numberOfLines={3}/>
        </Row>
        <Row>
          <Medium
            style={styles.label}
            label={'Advance Paid : '}
            numberOfLines={3}
          />
          <Regular style={styles.value} label={reimbursement.AdvancePaid} numberOfLines={3}/>
        </Row>
        <Row>
          <Medium style={styles.label} label={'Reason : '} numberOfLines={10}/>
          <Regular style={styles.value} label={reimbursement.Reason} />
        </Row>
        {/* <Row>
          <Medium style={styles.label} label={'Document :'} numberOfLines={3}/>
          {reimbursement.document ? (
            <Regular style={styles.value} label={'Selected'} />
          ) : (
            <Text style={styles.noDocument}>No Document</Text>
          )}
        </Row> */}
      </View>
    </View>
  );
};

export default AddReimbursementCard;
