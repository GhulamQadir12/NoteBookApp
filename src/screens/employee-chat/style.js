import {StyleSheet} from 'react-native';
import {mvs} from '../../config/metrices';
import {colors} from '../../config/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: mvs(20),
    backgroundColor: colors.white,
  },
  
  image: {
    width: mvs(30),
    height: mvs(30),
  },
  header: {
    flexDirection: 'row',
    gap: mvs(20),
    alignItems:'center'
  },
  text: {
    fontSize: mvs(24),
    color: colors.black,
    fontFamily:'Nunito-Bold',
    fontWeight:'700'
  },
  flatlistcontainer:{
    // backgroundColor:'red',
    // flexGrow:1,
    height:'85%',
    paddingBottom:mvs(20)
    // marginBottom:mvs(50)
    // flex:1
  },
  bottom: {

    flex:1,
    position: 'absolute',
    // alignItems:"center",
    bottom: mvs(9),
    // gap:mvs(5),
   marginHorizontal:mvs(20),
    alignItems:'center',
    width:'100%',
    // justifyContent:'flex-start',
    // backgroundColor:'pink',
    
  },
  uploadDocuments:{
    width:'12%',
    height:mvs(45),
    backgroundColor:colors.primary,
    borderRadius:mvs(30),
    justifyContent:'center',
    alignItems:'center'
  },
    input: {
      // flex:1,
    width: '72%',
    height: mvs(45),
 
    // backgroundColor: colors.red,
    },
    sendButton:{
        width:'12%',
        height:mvs(45),
        backgroundColor:colors.primary,
        borderRadius:mvs(30),
        justifyContent:'center',
        alignItems:'center'
    },
  buttonstyle: {
    width: mvs(46),
    height: mvs(46),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:mvs(26)
  },
  buttonstyle2: {
    width: mvs(26),
    height: mvs(26),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },


  // messageBubble: {
  //   // textAlign:'right',
  //   // backgroundColor: '#0078fe',
  //   padding: mvs(10),
  //   maxWidth: '70%',
  //   minWidth: '25%',
  //   // backgroundColor:'red',
  //   // alignSelf: 'flex-end',
  //   marginBottom: mvs(10),
  // },

  lineragradient:{
    borderRadius: mvs(20),
    padding: mvs(10),
    maxWidth: '70%',
    minWidth: '20%',
    backgroundColor:'red',
    // alignSelf: 'flex-end',
    marginBottom: mvs(10),

  },

  // messageText2: {
  //   color: 'white',
  //   fontSize: 16,
  //   textAlign:'left',
  //   justifyContent:'space-evenly'
  // },

  // pickedImage: {
  //   width: mvs(100),
  //   height: mvs(100),
  //   borderRadius: mvs(50),
  //   alignSelf: 'center',
  //   marginBottom: mvs(20),
  // },
});
export default styles;
