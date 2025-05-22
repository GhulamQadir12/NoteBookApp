import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  itemContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f1f1',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 2,
  },
  label: {
    color: colors.primary,
    fontWeight: 'bold',
    color: '#343a40',
  },
  assinedByContainer:{
    flexDirection:'column',
    justifyContent:'flex-start',
    // alignItems:'center',
  },
  containerStyle:{
    marginBottom:mvs(45),
    width:'100%',
    borderRadius:mvs(10)
  },
  containerStyle2:{height:mvs(50),alignSelf:'flex-end',marginTop:mvs(10)}

});
export default styles;
