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
import {Checkbox} from 'components/atoms/checkbox';
import { PrimaryButton } from 'components/atoms/buttons';

const AssignedTasksCard = ({item, style, onPress, isExpanded,onPressNavigate}) => {
  // const DateFrom = moment(item?.fl?.DateFrom).format('YYYY-MM-DD');
  // const DateTo = moment(item?.fl?.DateTo).format('YYYY-MM-DD');
  const [check, setCheck] = React.useState(false);
  
  const formattedDate = moment(item?.Date).format('M/D/YYYY');
  console.log(formattedDate); // Output: 2024-12-21

console.log("item",item);
  

  const renderIcon = (status) => {
    switch (status) {
      case 'todo':
        return <ClockIcon />;
      case 'inprogress':
        return <AntDesign name="loading1" size={24} color="blue" />;
      case 'done':
        return <Tick />;
      default:
        return null;
    }}
  // console.log('fdjkg', DateTo); // Output: 2024-11-21
  // console.log('first item', item);
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(10), alignItems: 'center'}}>
        {/* {item?.status === 'Approved' ? <Tick /> : <ClockIcon />} */}
        {renderIcon(item?.TaskStatus)}
        <View style={{flex: 1}}>
        <Row style={{justifyContent: 'space-between'}}>
          <Bold
            fontSize={mvs(15)}
            color={colors.primary}
            label={formattedDate}
          />
          <PrimaryButton onPress={onPressNavigate}  title={"Detail"} containerStyle={{width:'25%',backgroundColor:colors.primary,height:mvs(35),borderRadius:mvs(5),marginBottom:mvs(10)}}/>
          </Row>
          <Row style={styles.statusContainer}>
            <Medium
              color={
                item?.TaskStatus === 'todo'
                  ? colors.yellow
                  : colors.green
              }
              label={item?.TaskStatus == 'todo' ? 'Pending' : item?.status}
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
         
        <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '25%'}}>
              <Bold label={'Task Name :'} color={colors.primary} numberOfLines={5}/>
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={item?.TaskName} numberOfLines={5}/>
            </View>
          </Row>
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(AssignedTasksCard);
