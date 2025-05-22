import { colors } from "config/colors";
import { mvs } from "config/metrices";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  crossButton: {
    // position: "absolute",
    top: mvs(8),
    // right: 0,
    width: mvs(40),
    height: mvs(40),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: mvs(20),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf:'flex-end',
    backgroundColor:colors.primary,
  },
    card: {
      backgroundColor: colors.white,
      padding: mvs(20),
      borderWidth: 1,
      marginHorizontal: mvs(20),
      marginVertical: mvs(8),
      borderRadius: 10,
      width:'100%',
      alignSelf:'center',
      // height: mvs(200),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      marginBottom: 30,
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
      
    },
    row: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    label: {
        color:colors.primary,
        flex: 1,
    },
    value: {
      flex: 2,
      color: colors.black,
      // backgroundColor:colors.red,
    },
    noDocument: {
      color: '#999',
      marginTop: 5,
    },
  });