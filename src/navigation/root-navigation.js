// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Attendance from 'screens/attendance';
import ForgotPasswordScreen from 'screens/forgot-password';
import FurnitureItemsScreen from 'screens/furniture-items';
import HelpUs from 'screens/help-us';
import InboxScreen from 'screens/inbox-screen';
import LanguageScreen from 'screens/language-screen';
import LoginScreen from 'screens/login-screen';
import {
  default as MessageHomeScreen,
  default as MesssageHomeScreen,
} from 'screens/messageHome';
import Notifications from 'screens/notifications';
import Onboarding from 'screens/on-boarding';
import OrderDetailsScreen from 'screens/order-details';
import OurServicesScreen from 'screens/our-services';
import PrivacyPolicyScreen from 'screens/privacy-policy';
import ResetPasswordScreen from 'screens/reset-password';
import SelfServicePortal from 'screens/self-service-portal';
import ShoppingScreen from 'screens/shopping';
import Splash from 'screens/splash';
import TermsandConditionsScreen from 'screens/terms-and-conditions';
import TotalOrderScreen from 'screens/total-order-request';
import WhereToMoveScreen from 'screens/where-to-move';
import {horizontalAnimation} from '../utils';
import DrawerNavigation from './drawer-navigation/drawer-navigation';
import LeaveRequestList from 'screens/leave-request-list';
import LeaveRequest from 'screens/leave-request';
import WorkFromHomeRequestList from 'screens/work-from-home-request-list';
import WorkFromHomeRequest from 'screens/work-from-home-request';
import AdvanceRequestList from 'screens/advance-request-list';
import AdvanceRequest from 'screens/advance-request';
import LoanRequestList from 'screens/loan-request-list';
import LoanRequest from 'screens/loan-request';
import ComplainRequestList from 'screens/complain-request-list';
import ComplainRequest from 'screens/complain-request';
import ResourceRequestList from 'screens/resource-request-list';
import ResourceRequest from 'screens/resource-request';
import ReimbursementRequestList from 'screens/reimbursement-request-list';
import ReinbursmentRequest from 'screens/reinbursement-request';
import ReimbursementDetails from 'screens/reimbursement-details/index';
import LoanDetails from 'screens/loan-details';
import AttendanceCorrectionRequestList from 'screens/attendance-correction-list';
import AttendanceCorrectionRequest from 'screens/attendance-correction-request';
import AdvanceDetails from 'screens/advance-details';
import OverTimeRequestList from 'screens/overtime-request-list';
import OverTimeRequest from 'screens/overtime-request';
import EventCalender from 'screens/event-list';
import AddEvent from 'screens/add-event';
import EmployeeHierarchy from 'screens/hierarical-chart';
import AddTodo from 'screens/add-todo';
import TodoList from 'screens/Todo-list';
import StrikeLetter from 'screens/strike-letter-list';
import StrikeLetterDetails from 'screens/strike-letter-details';
import ChatList from 'screens/chat-list';
import EmployeeChat from 'screens/employee-chat';
import LettersList from 'screens/letters-list';
import EmployeeLetters from 'screens/letter-list';
import EmployeeLetterDetails from 'screens/letter-details';
import AssignedTaskList from 'screens/assigned-tasks-list';
import AssignedTaskDetails from 'screens/assigned-tasks-details';
import ReinbursmentAdded from 'screens/reinbursement-added';
import CompanyCalender from 'screens/company-calender';
import LinePaper from 'screens/copy-pages';
import CardsScreen from 'screens/cards-screen';
import CardsDetailScreen from 'screens/cards-detail-screen';
const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: colors.primary}} />
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'white'}
      />
      <Stack.Navigator
        // initialRouteName="Drawer" 
         initialRouteName="Splash"
        // initialRouteName="SelfServicePortal"
       // initialRouteName="CardsScreen"

        screenOptions={horizontalAnimation}>
        <Stack.Group>
          <Stack.Screen name="LinePaper" component={LinePaper} />
          <Stack.Screen name="CardsScreen" component={CardsScreen} />
          <Stack.Screen name="CardsDetailScreen" component={CardsDetailScreen} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
          <Stack.Screen name="Attendance" component={Attendance} />
          <Stack.Screen name="LeaveRequestList" component={LeaveRequestList} />
          <Stack.Screen name="LeaveRequest" component={LeaveRequest} />
          <Stack.Screen name="AdvanceRequestList" component={AdvanceRequestList} />
          <Stack.Screen name="AdvanceRequest" component={AdvanceRequest} />
          <Stack.Screen name="AdvanceDetails" component={AdvanceDetails} />
          <Stack.Screen name="ReinbursmentRequest" component={ReinbursmentRequest} />
          <Stack.Screen name="LoanRequestList" component={LoanRequestList} />
          <Stack.Screen name="LoanRequest" component={LoanRequest} />
          <Stack.Screen name="LoanDetails" component={LoanDetails} />
          <Stack.Screen name="ComplainRequest" component={ComplainRequest} />
          <Stack.Screen name="ResourceRequest" component={ResourceRequest} />
          <Stack.Screen
            name="ResourceRequestList"
            component={ResourceRequestList}
          />
          <Stack.Screen
            name="ComplainRequestList"
            component={ComplainRequestList}
          />
          <Stack.Screen
            name="AttendanceCorrectionRequestList"
            component={AttendanceCorrectionRequestList}
          />
          <Stack.Screen
            name="AttendanceCorrectionRequest"
            component={AttendanceCorrectionRequest}
          />
          <Stack.Screen
            name="WorkFromHomeRequest"
            component={WorkFromHomeRequest}
          />
          <Stack.Screen
            name="WorkFromHomeRequestList"
            component={WorkFromHomeRequestList}
          />
          <Stack.Screen
            name="ReimbursementRequestList"
            component={ReimbursementRequestList}
          />
          <Stack.Screen
            name="OverTimeRequestList"
            component={OverTimeRequestList}
          />
          <Stack.Screen
            name="OverTimeRequest"
            component={OverTimeRequest}
          />
          <Stack.Screen
            name="EventCalender"
            component={EventCalender}
          />
          <Stack.Screen
            name="CompanyCalender"
            component={CompanyCalender}
          />
          <Stack.Screen
            name="AddEvent"
            component={AddEvent}
          />
          <Stack.Screen
            name="TodoList"
            component={TodoList}
          />
          <Stack.Screen
            name="AddTodo"
            component={AddTodo}
          />
          <Stack.Screen
            name="EmployeeHierarchy"
            component={EmployeeHierarchy}
          />
          <Stack.Screen
            name="StrikeLetter"
            component={StrikeLetter}
          />
          <Stack.Screen
            name="StrikeLetterDetails"
            component={StrikeLetterDetails}
          />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="EmployeeChat" component={EmployeeChat} />
          <Stack.Screen
            name="LettersList"
            component={LettersList}
          />
          <Stack.Screen
            name="EmployeeLetters"
            component={EmployeeLetters}
          />
          <Stack.Screen
            name="EmployeeLetterDetails"
            component={EmployeeLetterDetails}
          />
          <Stack.Screen
            name="ReimbursementDetails"
            component={ReimbursementDetails}
          />

          <Stack.Screen
            name="MesssageHomeScreen"
            component={MesssageHomeScreen}
          />
          <Stack.Screen
            name="AssignedTaskList"
            component={AssignedTaskList}
          />
          <Stack.Screen
            name="AssignedTaskDetails"
            component={AssignedTaskDetails}
          />
          <Stack.Screen
            name="OrderDetailsScreen"
            component={OrderDetailsScreen}
          />
          <Stack.Screen
            name="MessageHomeScreen"
            component={MessageHomeScreen}
          />
          <Stack.Screen name="ShoppingScreen" component={ShoppingScreen} />
          <Stack.Screen
            name="SelfServicePortal"
            component={SelfServicePortal}
          />
          <Stack.Screen
            name="ReinbursmentAdded"
            component={ReinbursmentAdded}
          />
        </Stack.Group>

        <Stack.Group></Stack.Group>
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
        <Stack.Screen name="HelpUs" component={HelpUs} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
