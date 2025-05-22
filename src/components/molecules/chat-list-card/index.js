import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {mvs} from 'config/metrices';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import Medium from 'typography/medium-text';
import {colors} from 'config/colors';
import {Image} from 'react-native';

const ChatListCard = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Row style={styles.headerContainer}>
        <Image
          style={{width: '20%', height: mvs(63), borderRadius: mvs(25)}}
          source={item.img}
        />
        <View style={{flex:1,marginLeft:mvs(10)}}>
          <Row>
            <Bold style={styles.title} label={item.title} numberOfLines={2}/>
            <Regular style={styles.dateText} label={item.time} />
          </Row>
          <Regular style={styles.dateText} label={item.des} numberOfLines={2}/>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: mvs(12),
    padding: mvs(16),
    // marginVertical: 8,
    // marginHorizontal: 16,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: mvs(8),
    elevation: 3,
    borderColor: colors.border,
    borderBottomWidth: mvs(1),
    marginBottom: mvs(15),
  },
  headerContainer: {
    // marginTop: mvs(5),
    // alignItems: 'center',
    justifyContent:'flex-start'
  },

  title:{
    fontSize: mvs(16),
    color: colors.black,
    flex:1
  },
  dateText: {
    fontSize: mvs(12),
    color: colors.black,
  },
  

});

export default ChatListCard;
