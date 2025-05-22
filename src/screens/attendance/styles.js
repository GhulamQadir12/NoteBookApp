import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {PrimaryPhoneInput} from '../../components/atoms/inputs/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: mvs(10),
    marginBottom: mvs(5),
  },
  headerText: {
    flex: 1,
    fontSize: mvs(16),
    textAlign: 'center',
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: mvs(10),
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: colors.silver,
    marginBottom: mvs(5),
  },
  column: {
    flex: 1,
    textAlign: 'center',
    fontSize: mvs(13),
  },
  bottomContainer: {
    paddingHorizontal: mvs(20),
    marginTop: mvs(0),
    flex: 1,
    marginBottom: mvs(5),
  },
  searchButton: {
    width: '100%',
    borderRadius: mvs(10),
    bottom: mvs(10),
  },
});
export default styles;
