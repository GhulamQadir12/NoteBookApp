import { StyleSheet } from 'react-native';
import { mvs, width } from 'config/metrices';
import { colors } from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    // flexGrow: 1,
    marginTop: mvs(50),
    paddingHorizontal: mvs(20),
    marginBottom: mvs(10)
    // paddingBottom: mvs(100),

  },
  contentContainerStyleFlatlist: {
    // marginTop: mvs(10),
    paddingHorizontal: mvs(20),

  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  rendercontainer: {
    padding: mvs(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderRadius: mvs(10),
  },
  notificationicon: {
    width: mvs(35),
    height: mvs(35),
    resizeMode: 'contain',
  },
  titleandtextview: {
    flex: 1,
    paddingHorizontal: mvs(5),
  },
  logobackground: {
    height: mvs(110),

    width: '100%',
    position: 'absolute',
  },
  headerContainer:{
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(22),
    paddingVertical: mvs(15),
    alignItems:'center'
 }
});
export default styles;
