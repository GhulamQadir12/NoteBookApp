import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const RatingStar = ({
  size = mvs(16),
  fill = colors.yellow,
  stroke = colors.border,
  rate = 4,
  width = '100%',
  onPress = rate => {},
}) => {
  return (
    <Row style={{width: width}}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <AntDesign
          onPress={() => {
            onPress(item);
          }}
          key={index}
          name={item > rate ? 'staro' : 'star'}
          size={size}
          color={item > rate ? stroke : fill}
        />
      ))}
    </Row>
  );
};
export default RatingStar;
