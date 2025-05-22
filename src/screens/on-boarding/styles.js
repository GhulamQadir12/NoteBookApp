import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dot: {
    width: mvs(12),
    height: mvs(12),
    borderRadius: 6,
    marginHorizontal: mvs(3),
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: mvs(6),
    height: mvs(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: mvs(15),
  },
  container: {
    flex: 1,
    // Add any other styles for the container
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16, // Adjust the bottom value to position the pagination container as desired
    alignSelf: 'center',
    // Add any other styles for the pagination container
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    // Add any other styles for the pagination dot
  },
  bottom: {
    position: 'absolute',
    bottom: mvs(60),
    paddingHorizontal: mvs(20),
    width: '100%',
  },
});
export default styles;
