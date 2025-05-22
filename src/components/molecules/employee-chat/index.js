import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { mvs } from 'config/metrices'
import { colors } from 'config/colors'
import { Image } from 'react-native'
import * as IMG from 'assets/images';


const Item = ({item}) => {
  return (
     <View>
          <View style={styles.messageContainer}>
            <View style={styles.messageBubble2}>
              <Text style={styles.messageText2}>{item.text}</Text>
            </View>
            <Image source={IMG.userimg} style={styles.image2} />
          </View>
          <View style={styles.messageContainer1}>
            <Image source={IMG.userimg} style={styles.image2} />
            <View style={styles.messageBubble2}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        </View>
  )
}

export default Item

const styles = StyleSheet.create({
      messageContainer: {
        justifyContent:'center',
        alignSelf: 'flex-end',
        marginBottom: 10,
        flexDirection:'row',
         gap:mvs(10)
      },
      messageContainer1: {
        justifyContent:'center',
        alignSelf: 'flex-start',
        marginBottom: mvs(10),
        flexDirection:'row',
        gap:mvs(10)
      },
      messageBubble2: {
        backgroundColor: '#0078fe',
        padding: mvs(10),
        borderRadius: mvs(10),
        maxWidth: '70%',
        minWidth: '25%',
        borderWidth:mvs(1),
        borderColor:colors.border,
        backgroundColor:colors.white,
        // alignSelf: 'flex-end',
        marginBottom: mvs(10),
      },
      messageText: {
        color: colors.black,
        fontSize: 12,
        textAlign:'left',
        fontWeight:'600',
        fontFamily:'Nunito-Bold'
    
      },
      messageText2: {
        color: colors.black,
        fontSize: 12,
        textAlign:'left',
        fontFamily:'Nunito',
        fontWeight:'600',
        fontFamily:'Nunito-Bold'
      },
      image2:{
        width:mvs(43),
        height:mvs(43),
      },
    
})