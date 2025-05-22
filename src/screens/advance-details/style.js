import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // marginBottom:mvs(25)
  },
  cardcontainer:{
    backgroundColor: colors.white,
    width:'100%',
    alignSelf:'center',
    padding:mvs(10),
    marginTop:mvs(20),
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  taskBtn: {
    width: mvs(60),
    height: mvs(60),
    borderRadius: mvs(30),
    backgroundColor: colors.yellow,
    position: 'absolute',
    bottom: mvs(20),
    right: mvs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePicker: {
    width: '100%',
    paddingHorizontal: 20,
  },
  text:{
    fontSize:mvs(16),
    color:colors.primary,
    width:'40%',
    // backgroundColor:colors.yellow,
  },
  textdetail:{
    fontSize:mvs(14),
    color:colors.black,
    width:'60%',
    // backgroundColor:colors.green,
  },
  title:{
    alignSelf:'center',
    marginTop:mvs(20),
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    padding: mvs(10),
    marginBottom: mvs(5),
    marginTop:mvs(10),
  },
  headerText: {
    flex: 1,
    fontSize: mvs(16),
    textAlign: 'center',
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
    padding: mvs(10),
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: colors.silver,
    marginBottom: mvs(5),
  },
  column: {
    flex: 1,
    textAlign: 'center',
    fontSize: mvs(14),
  },
});
export default styles;
