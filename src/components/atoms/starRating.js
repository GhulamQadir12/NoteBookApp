import {StarEmpty, StarFill} from 'assets/icons';
import {mvs} from 'config/metrices';
import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

const StarRating = ({
  initialRating,
  onRatingChange,
  disabled = false,
  width,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = newRating => {
    if (newRating == rating) {
      setRating(rating - 1);
      onRatingChange(rating - 1);
    } else {
      setRating(newRating);
      onRatingChange(newRating);
    }
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {[1, 2, 3, 4, 5].map(num => (
        <TouchableOpacity
          disabled={disabled}
          key={num}
          onPress={() => handleRating(num)}
          style={{marginRight: mvs(10)}}>
          {num <= rating ? (
            <StarFill width={width ? width : 20} />
          ) : (
            <StarEmpty width={width ? width : 20} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;
