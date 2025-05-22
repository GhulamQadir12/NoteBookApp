import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SVGS from 'assets/icons/tab-icons';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { useAppSelector } from 'hooks/use-store';
import { TouchableOpacity, View } from 'react-native';
import ChatList from 'screens/chat-list';
import HomeTab from 'screens/home-tab';
import MessageHomeScreen from 'screens/messageHome';
import Notifications from 'screens/notifications';
import TotalOrderScreen from 'screens/total-order-request';
import UserTab from 'screens/user-tab';

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const Icon = SVGS[`${route.name}${isFocused ? 'Active' : ''}`];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
    key={index}
    accessibilityRole="button"
    accessibilityState={isFocused ? { selected: true } : {}}
    accessibilityLabel={options.tabBarAccessibilityLabel}
    testID={options.tabBarTestID}
    onPress={onPress}
    onLongPress={onLongPress}
    style={{
      flex: 1,
      alignItems: 'center',
      height: 65,
    }}>
             <View
      style={{
        backgroundColor: isFocused ? colors.primary : colors.transparent,
        borderRadius: mvs(50),
        height: mvs(60),
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: mvs(isFocused ? -20 : 0),
      }}>
               <Icon
        height={route.name === 'Notifications' ? mvs(35) : mvs(20)}
        width={route.name === 'Notifications' ? mvs(35) : mvs(20)}
      />
    </View>
  </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ...
export const TabBar = () => {
  const Tab = createBottomTabNavigator();
  const {user} = useAppSelector(s => s);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Message" component={ChatList} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Announcements" component={Notifications} />
      <Tab.Screen name="Me" component={UserTab} />
      
    </Tab.Navigator>
  );
};
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import * as SVGS from 'assets/icons/tab-icons';
// import { colors } from 'config/colors';
// import { mvs } from 'config/metrices';
// import { useAppSelector } from 'hooks/use-store';
// import { TouchableOpacity, View } from 'react-native';
// import ChatList from 'screens/chat-list';
// import HomeTab from 'screens/home-tab';
// import MessageHomeScreen from 'screens/messageHome';
// import Notifications from 'screens/notifications';
// import TotalOrderScreen from 'screens/total-order-request';
// import UserTab from 'screens/user-tab';

// function MyTabBar({state, descriptors, navigation}) {
//   return (
//     <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//       {state.routes.map((route, index) => {
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;
//         const isFocused = state.index === index;
//         const Icon = SVGS[`${route.name}${isFocused ? 'Active' : ''}`];

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             // The `merge: true` option makes sure that the params inside the tab screen are preserved
//             navigation.navigate({name: route.name, merge: true});
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             key={index}
//             accessibilityRole="button"
//             accessibilityState={isFocused ? {selected: true} : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{
//               flex: 1,
//               alignItems: 'center',
//               height: 65,
//             }}>
//             <View
//               style={{
//                 backgroundColor: isFocused
//                   ? colors.primary
//                   : colors.transparent,
//                 borderRadius: mvs(50),
//                 height: mvs(60),
//                 width: 60,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginTop: mvs(isFocused ? -20 : 0),
//               }}>
//               <Icon height={mvs(20)} width={mvs(20)} />
//             </View>
//             {/* <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'flex-end',
//                 paddingBottom: mvs(10),
//               }}>
//               <Text
//                 style={{
//                   fontSize: mvs(12),
//                   color: colors.black,
//                 }}>
//                 {label}
//               </Text>
//             </View> */}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// // ...
// export const TabBar = () => {
//   const Tab = createBottomTabNavigator();
//   const {user} = useAppSelector(s => s);
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{headerShown: false}}
//       tabBar={props => <MyTabBar {...props} />}>
//       <Tab.Screen name="Home" component={HomeTab} />
//       <Tab.Screen name="Message" component={ChatList} />
//       <Tab.Screen name="notification" component={Notifications} />
//       <Tab.Screen name="Me" component={UserTab} />
      
//     </Tab.Navigator>
//   );
// };
