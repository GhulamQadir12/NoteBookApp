import * as IMG from 'assets/images';
import DrawerHomeCard from 'components/molecules/drawer-home-card';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {t} from 'i18next';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {onLogoutPress} from 'services/api/auth-api-actions';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
const CustomDrawerContent = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  const [toggle, setToggle] = React.useState(false);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.header}>
        <View style={styles.drawerheader}>
          <Image
            source={{
              uri:
                userInfo?.avatar ||
                'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
            }}
            style={styles.drawerman}
          />
        </View>
        <Medium
          label={userInfo?.name || 'Guest Mode'}
          fontSize={mvs(18)}
          color={colors.white}
          style={{marginTop: mvs(6)}}
        />
        {/* <Medium
          label={`${userInfo?.email || 'guest@gmail.com'}`}
          fontSize={mvs(14)}
          color={colors.black}
          style={{marginTop: mvs(6)}}
        /> */}
      </View>
      <ScrollView style={styles.scrololstyle}>
        <DrawerHomeCard
          onPress={() => navigate('Me')}
          icon1={IMG.payroll}
          label1={'Payslips'}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => setToggle(!toggle)}
          icon1={IMG.draweruserimg}
          label1={'Employee Engagement'}
          containerStyle={styles.helpStyle}
        />
        {toggle ? 
        (
          <>
        <TouchableOpacity onPress={() => navigate('StrikeLetter')}>
          <Regular label={'1-  Strike Letter'} style={[{marginLeft:mvs(80)},{marginTop: toggle && mvs(-20) }]} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigate('LettersList')}>
          <Regular label={'Other Letter'} style={[{marginLeft:mvs(80)},{marginTop: toggle && mvs(0) }]} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigate('EmployeeLetters')}>
          <Regular label={'2-  Employee Letters'} style={[{marginLeft:mvs(80)},{marginTop: toggle && mvs(5) }]} />
        </TouchableOpacity>
      
        </>
       )
       : null
       }
       
        {/* <DrawerHomeCard
          onPress={() => navigate('SelfServicePortal')}
          icon1={IMG.drawerselfserviceimg}
          label1={'Self-Service Portal'}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => navigate('AssignedTaskList')}
          icon1={IMG.drawertaskmanagmentimg}
          label1={'Task Management'}
          containerStyle={styles.helpStyle}
        /> */}
        <DrawerHomeCard
          onPress={() => navigate('HelpUs')}
          icon1={IMG.drawertrainingimg}
          label1={'Training And Development'}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => navigate('HelpUs')}
          icon1={IMG.benefits}
          label1={'Benefits and Compensation'}
          containerStyle={styles.helpStyle}
        />
        <DrawerHomeCard
          onPress={() => navigate('HelpUs')}
          icon1={IMG.policies}
          label1={'Policies and Guidelines'}
          containerStyle={styles.helpStyle}
        />
      </ScrollView>

      <DrawerHomeCard
        onPress={() =>
          userInfo
            ? dispatch(onLogoutPress())
            : props?.navigation?.navigate('Login')
        }
        icon1={IMG.drawerLogoutIcon}
        label1={t('logout')}
        br={8}
        containerStyle={styles.helpStyle}
      />
    </View>
  );
};
export default CustomDrawerContent;
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: mvs(220),
    width: width - 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: mvs(1),
    backgroundColor: colors.primary,
    borderColor: colors.border,
  },
  needHelpContainer: {
    backgroundColor: colors.primary,
    width: width - 100,
    marginHorizontal: mvs(17),
    borderRadius: mvs(8),
    // paddingHorizontal: mvs(17.5),
    marginVertical: mvs(8),
    alignItems: 'center',
    ...colors.shadow,
  },
  helpStyle: {margin: mvs(10), width: width - 120, height: mvs(27)},
  drawerlogo: {
    width: mvs(200),
    // height: mvs(100),
    resizeMode: 'contain',
  },
  drawerheader: {
    height: mvs(100),
    width: mvs(100),
    borderRadius: mvs(50),
    borderWidth: mvs(3),
    borderColor: colors.primary,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  drawerman: {
    height: '90%',
    width: '90%',
    borderRadius: mvs(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  scrololstyle: {
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginTop: mvs(50),
  },
});
