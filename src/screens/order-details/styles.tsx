import {StyleSheet} from 'react-native';
import {mvs, width} from 'config/metrices';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primary,
  },
  contentContainerStyle: {
    // flexGrow: 1,
    // paddingVertical: mvs(30),
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(30),
    flex: 1,
    backgroundColor: colors.primary,
    borderTopRightRadius: mvs(10),
    borderTopLeftRadius: mvs(10),
  },
  contentContainerStyleFlatlist: {
    // paddingVertical: mvs(5),
    // paddingHorizontal: mvs(20),
    // paddingBottom: mvs(100),
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
  acceptbutton: {
    backgroundColor: colors.white,
    // marginTop: mvs(5),
    borderRadius: mvs(10),
    // width: '45%',
  },
  rejectbutton: {
    backgroundColor: colors.white,
    // marginTop: mvs(20),
    borderRadius: mvs(10),
    width: '45%',
  },
  logobackground: {
    height: mvs(110),
    width: '100%',
    // position: 'absolute',
  },
  mapContainer: {
    height: mvs(250),
    padding: mvs(5),
    marginHorizontal: mvs(20),
    marginVertical: mvs(10),
    borderWidth: mvs(1),
    borderColor: colors.primary,
    borderRadius: mvs(10),
  },
  anyinstructionContainer: {
    padding: mvs(10),
    backgroundColor: colors.gray,
    width: '100%',
    borderRadius: mvs(5),
    marginTop: mvs(5),
  },

  reviewBtnContainer:{
    paddingHorizontal: mvs(20),
    backgroundColor: colors.primary,
    paddingTop: mvs(20),
    paddingBottom: mvs(20),
  },
  reviewContainer:{
    backgroundColor: colors.white,
    marginHorizontal: mvs(20),
    padding: mvs(10),
    borderRadius: mvs(10),
    justifyContent: 'flex-start',
    gap: mvs(20),
    bottom: mvs(20),
  }
});
export default styles;
