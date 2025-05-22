import Header1x2x from 'components/atoms/headers/header-1x-2x';
import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import SelfPortalCard from 'components/molecules/self-portal-card';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import {navigate} from 'navigation/navigation-ref';
const SelfServicePortal = props => {
  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Self-Service Portal'} />
      <ScrollView style={{paddingHorizontal: mvs(20)}}>
        <SelfPortalCard
          containerStyle={{backgroundColor: colors.homecard2}}
          title={'1.'}
          title1={'Leave Request'}
          onPress={() => navigate('LeaveRequestList')}
        />
        <SelfPortalCard
          onPress={() => navigate('WorkFromHomeRequestList')}
          containerStyle={{backgroundColor: colors.homecard1}}
          title={'2.'}
          title1={'Work From Home Request'}
        />
        <SelfPortalCard
          onPress={() => navigate('AdvanceRequestList')}
          containerStyle={{backgroundColor: colors.homecard2}}
          title={'3.'}
          title1={'Advances Request'}
        />
        <SelfPortalCard
          onPress={() => navigate('LoanRequestList')}
          containerStyle={{backgroundColor: colors.homecard1}}
          title={'4.'}
          title1={'Loan Request'}
        />
        <SelfPortalCard
          onPress={() => navigate('ComplainRequestList')}
          containerStyle={{backgroundColor: colors.homecard1}}
          title={'5.'}
          title1={'Complaints Request'}
        />
        {/* <SelfPortalCard
          onPress={() => navigate('ResourceRequestList')}
          containerStyle={{backgroundColor: colors.homecard2}}
          title={'6.'}
          title1={'Resource Request'}
        /> */}
        <SelfPortalCard
          onPress={() => navigate('ReimbursementRequestList')}
          containerStyle={{backgroundColor: colors.homecard2}}
          title={'7.'}
          title1={'Reimbursement Request'}
        />
        <SelfPortalCard
          onPress={() => navigate('AttendanceCorrectionRequestList')}
          containerStyle={{backgroundColor: colors.homecard1}}
          title={'8.'}
          title1={'Attendance Correction'}
        />

        <SelfPortalCard
          onPress={() => navigate('EventCalender')}
          containerStyle={{backgroundColor: colors.homecard2}}
          title={'9.'}
          title1={'Event Calendar'}
        />
      </ScrollView>
    </View>
  );
};
export default SelfServicePortal;
