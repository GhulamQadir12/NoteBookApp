import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  lettercontainer:{
    flex: 1,
    marginHorizontal:mvs(20),
    paddingTop:mvs(20),
    paddingVertical:mvs(20),
    
    // marginBottom:mvs(100),
    // backgroundColor:'pink'
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
    paddingHorizontal: mvs(20),
  },
  header: {
    fontSize: mvs(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: mvs(20),
  },
  subHeader: {
    fontSize: mvs(16),
    textAlign: 'right',
    marginBottom: mvs(10),
  },
  bodyText: {
    fontSize: mvs(12),
    marginBottom: mvs(10),
    lineHeight: mvs(22),
  },
  detailsContainer: {
    marginVertical: mvs(15),
    padding: mvs(10),
    borderWidth: mvs(1),
    borderColor: '#ccc',
    borderRadius: mvs(5),
    backgroundColor: '#f9f9f9',
  },
  signatureContainer: {
    marginBottom: mvs(15),
    padding: mvs(10),
    borderWidth: mvs(1),
    borderColor: '#ccc',
    borderRadius: mvs(5),
    backgroundColor: '#f9f9f9',
  },
  incidentContainer: {
    marginBottom: mvs(15),
    padding: mvs(10),
    borderWidth: mvs(1),
    borderColor: '#ccc',
    borderRadius: mvs(5),
    backgroundColor: '#f9f9f9',
    justifyContent:'flex-start',
    alignItems:'center',
    gap:mvs(30)
  },
  detailItem: {
    fontSize: mvs(16),
    marginBottom: mvs(5),
  },
  descriptionText: {
    fontSize: mvs(16),
    marginBottom: mvs(20),
    lineHeight: mvs(22),
    height: mvs(500),
    padding: mvs(10),
  },
  signatureText: {
    fontSize: mvs(16),
    marginTop: mvs(20),
    textAlign: 'right',
  },
  issueItem:{
    justifyContent:'flex-start',
    alignItems:'center',
  },
  issueText: {
    fontSize: mvs(16),
    marginLeft: mvs(10),
    marginTop:mvs(5)
  },
  desContainer:{
    padding: mvs(10),
    borderWidth: mvs(1),
    borderColor: '#ccc',
    borderRadius: mvs(5),
    backgroundColor: '#f9f9f9',
    marginBottom:mvs(45)
  },
  containerStyle:{
    marginBottom:mvs(45),
    width:'100%',
    borderRadius:mvs(10)
  },
});
export default styles;
