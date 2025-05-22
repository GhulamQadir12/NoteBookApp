import { Platform, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

type IProps = {
  type?: any;
  text1?: string;
  text2?: string;
};

const showToast = ({ type, text1, text2 }: IProps) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    position:Platform.OS == 'ios' ? 'bottom':'top'
  });
};

const styles = StyleSheet.create({});

export default showToast;
