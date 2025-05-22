import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  backgroundimg: {
    width: '100%',
    height: mvs(120),
  },
  infoContainer: {
    width: '100%',
    padding: mvs(20),
    backgroundColor: colors.silver,
    borderRadius: mvs(10),
    
  },
  slide: {
    flex: 1,
    paddingVertical: mvs(20),
    
  },
  title: {
    fontSize: mvs(20),
    color: colors.white,

  },
  slidertitle: {
    fontSize: mvs(20),
    color: colors.primary,

  },
  description: {
    fontSize: mvs(12),
    color: '#999',
  },
  checkBtn: {
    width: '45%',
  },
   timeContainer: {
    justifyContent: 'flex-start',
    gap: mvs(15),
    // marginTop: mvs(10),
    alignItems: 'center',
  },
  helpStyle:{
    borderWidth:1,
    borderTopRightRadius:mvs(10),
    borderBottomRightRadius:mvs(10),
    borderTopLeftRadius:mvs(10),
    borderBottomLeftRadius:mvs(10),
    borderColor:colors.primary,
    width:'100%',
    marginBottom:mvs(0),
    marginTop:mvs(15),
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:colors.white
  },
});
export default styles;
