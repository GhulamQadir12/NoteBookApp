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

const ResourceRequestCard = ({item, style, onPress, isExpanded}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(10), alignItems: 'center'}}>
        {item?.status === 'Approved' ? <Tick /> : <ClockIcon />}
        <View style={{flex: 1}}>
          <Bold
            fontSize={mvs(15)}
            color={colors.primary}
            label={'02 Oct 2024 - 03 Oct 2024'}
          />
          <Row style={styles.statusContainer}>
            <Medium
              color={item?.status === 'Pending' ? colors.yellow : colors.green}
              label={item?.status}
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
            <View style={{width: '35%'}}>
              <Bold label={'Sr #:'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={'01'} />
            </View>
          </Row>

          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Employe Id :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={'123456789'} />
            </View>
          </Row>
          <Row style={{marginTop: mvs(10), justifyContent: 'flex-start'}}>
            <View style={{width: '35%'}}>
              <Bold label={'Issue date :'} />
            </View>
            <View style={{flex: 1}}>
              <Regular color={colors.placeholder} label={'02 October 2024'} />
            </View>
          </Row>
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ResourceRequestCard);
