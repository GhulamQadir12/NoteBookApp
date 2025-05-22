import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useState} from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {Row} from '../row';

const SearchableDropDown = ({
  items = [{title: 'Pakistan'}, {title: 'Lahore'}, {title: 'item 3'}],
  selectedItem = {},
  onChangeItem = item => {},
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Create an animated value for the height
  const height = useState(new Animated.Value(0))[0];

  // Define the minimum and maximum height for the component
  const minHeight = 0;
  const maxHeight = mvs(140);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchList, setSearchList] = React.useState([]);

  // Define the animation function
  const animateHeight = toValue => {
    Animated.timing(height, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // Toggle the height of the component
  const toggleHeight = () => {
    const toValue = isExpanded ? minHeight : maxHeight;
    setIsExpanded(!isExpanded);
    animateHeight(toValue);
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onChangeItem(item);
          toggleHeight();
        }}>
        <Regular label={item?.title} />
      </TouchableOpacity>
    );
  };
  React.useEffect(() => {
    if (searchTerm?.trim()?.length) {
      const filtered = items?.filter(item => {
        const cond =
          searchTerm === '' || item?.title?.match(new RegExp(searchTerm, 'i'));
        if (cond) return item;
      });
      setSearchList(filtered);
    }
  }, [searchTerm]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleHeight}>
        <Row style={{alignItems: 'center'}}>
          <Medium label={selectedItem?.title || 'City'} />
          <AntDesign size={mvs(15)} name={'down'} color={colors.primary} />
        </Row>
      </TouchableOpacity>
      <Animated.View style={{maxHeight: height}}>
        <View style={{display: isExpanded ? 'flex' : 'none'}}>
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search here"
          />
          <FlatList
            data={searchTerm?.trim()?.length ? searchList : items}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default SearchableDropDown;
const styles = StyleSheet.create({
  container: {
    padding: mvs(10),
    marginBottom: mvs(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: mvs(10),
    minHeight: mvs(50),
    backgroundColor: colors.white,
    marginHorizontal: mvs(20),
  },
});
