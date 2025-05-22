import {mvs} from 'config/metrices';
import React, {useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
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
import {postTodo} from 'services/api/auth-api-actions';

const TodoCard = ({item, style, onPress, isExpanded,onStatusChange}) => {
  const Date = moment(item?.Date).format('YYYY-MM-DD');
  // const DateTo = moment(item?.fl?.DateTo).format('YYYY-MM-DD');
  const [check, setCheck] = useState(item?.Status === 'Completed');
  

  const updateTodoStatus = async (item, status) => {
    try {
      const formattedData = {
        Id: item?.Id,
        Date: item?.Date,
        Description: item?.Description,
        EnableNotification: item?.EnableNotification,
        EnableNotificationDateTime: null,
        Status: status,
        Title: item?.Title,
        user_id: 29126,
      };
      // setLoading(true);
      const res = await postTodo(formattedData);
      console.log('res', res);
      onStatusChange?.();
    } catch (error) {
      console.log('error=>', error);
    } finally {
      // setLoading(false);
    }
  };

  // console.log('fdjkg', DateTo); // Output: 2024-11-21
  // console.log('first item', item);
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(10), alignItems: 'center'}}>
        {/* {item?.status === 'Approved' ? <Tick /> : <ClockIcon />} */}
        {/* {item?.Status === 'Pending' ? <Tick /> : <ClockIcon />} */}
        {item?.Status === 'Completed' ? (
          <Tick />
        ) : item?.Status === 'Cancel' ? (
          <AntDesign name="closecircle" size={32} color="red" /> // Replace with your actual remove icon component
        ) : (
          <ClockIcon />
        )}
        <View style={{flex: 1}}>
          <Bold fontSize={mvs(15)} color={colors.primary} label={`${Date}`} />
          <Row style={styles.statusContainer}>
            <Medium
              color={
                item?.Status === 'Pending'
                  ? colors.yellow
                  : item?.Status === 'Cancel'
                  ? colors.red
                  : colors.green
              }
              label={item?.Status}
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
            <View style={{width: '40%'}}>
              <Bold label={'Title of advance  :'} numberOfLines={5} />
            </View>
            <View style={{flex: 1}}>
              <Regular
                color={colors.placeholder}
                label={item?.Title}
                numberOfLines={5}
              />
            </View>
          </Row>
          <Row>
            <Row
              style={{
                alignItems: 'center',
                marginTop: mvs(20),
                justifyContent: 'flex-start',
                gap: mvs(20),
              }}>
              <Checkbox
                onPress={() => {
                  const updatedCheck = !check; // 1. Toggle checkbox state
                  setCheck(updatedCheck); // 2. Update local state for UI

                  // 3. Call API with new status
                  const newStatus = updatedCheck ? 'Completed' : 'Pending';
                  updateTodoStatus(item, newStatus);
                }}
                checked={check}
              />

              <Regular
                style={{
                  textDecorationLine: check ? 'line-through' : 'none',
                  // flex: 1,
                }}
                label={item?.Description}
              />
            </Row>
            <TouchableOpacity
              onPress={async () => {
                Alert.alert(
                  'Confirm Delete',
                  'Are you sure you want to delete this item?',
                  [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'Delete',
                      style: 'destructive',
                      onPress: async () => {
                        await updateTodoStatus(item, 'Cancel');
                        // fetchTodoList();
                      },
                    },
                  ],
                );
              }}
              style={{
                alignSelf: 'flex-end',
                width: '15%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: mvs(5),
              }}>
              <AntDesign size={20} name={'delete'} color={colors.primary} />
            </TouchableOpacity>
          </Row>
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(TodoCard);
