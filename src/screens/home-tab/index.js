import * as IMG from 'assets/images';
import AppHeader from 'components/atoms/headers/index';
import ServiceCard from 'components/molecules/service-card';
import {colors} from 'config/colors';
import {useAppSelector} from 'hooks/use-store';
import React, {useState, useEffect, useRef} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {getDashbaord} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
import styles from './styles';
import Medium from 'typography/medium-text';
import {mvs} from 'config/metrices';
import {Row} from 'components/atoms/row';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Regular from 'typography/regular-text';
import Bold from 'typography/bold-text';
import moment from 'moment';
import {PrimaryButton} from 'components/atoms/buttons';
import Bargraph from 'components/atoms/graph/bargraph';
import {HomeList, STORAGEKEYS} from 'config/constants';
import {navigate} from 'navigation/navigation-ref';
import CustomSwiper from 'components/atoms/swiper';
import {Text} from 'react-native';
import DrawerHomeCard from 'components/molecules/drawer-home-card';
import {InputWithIconLeavesTypeSelection} from 'components/atoms/inputs';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MenuIcon} from 'assets/icons/tab-icons';
import {useNavigation} from '@react-navigation/native';
import MyCarousel from 'components/molecules/carousal/mycarousal';


const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once
  return (
    <Row style={styles.timeContainer}>
      <Fontisto name="clock" size={25} color={colors.black} />
      <Medium
        color={colors.primary}
        fontSize={mvs(18)}
        label={currentTime.toLocaleTimeString()}
        style={{marginTop: mvs(5)}}
      />
    </Row>
  );
};

const HomeTab = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;

  const [select, setSelect] = useState('checkin');
  const [timeToggle, setTimeToggle] = useState(true);
  // const [currentTime, setCurrentTime] = useState(new Date());
  const swiperRef = useRef(null);
  const navigation = useNavigation();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const datshow = [
    {title: '2323'},
    {title: 'sdgds'},
    {title: '2323'},
    {title: 'sdgds'},
    {title: '2323'},
    {title: 'sdgds'},
  ];
  const [order, setOrder] = React.useState([]);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await getDashbaord();
      setDashboardDetails(res?.data || []);
    } catch (error) {
      console.log('dashboard and homebanners get error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  // React.useEffect(() => {
  //   getList();
  // }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []); // Empty dependency array to run the effect only once

  const announcements = [
    {
      id: 1,
      type: 'Announcement',
      title: 'Announcement 1',
      description: 'Details about announcement 1',
    },
    {
      id: 2,
      type: 'Announcement',
      title: 'Announcement 2',
      description: 'Details about announcement 2',
    },
    {
      id: 1,
      type: 'Event',
      title: 'Event 1',
      description: 'Details about event 1',
    },
  ];

  const myData = [
    { title: 'Announcement 1', description: 'This is the first item of the crosal.' },
    { title: 'Announcement 2', description: 'Here some info about the second one' },
    { title: 'Announcement 3', description: 'And this is the third item in the carousel.' },
  ];

  // const events = [
  //   {id: 1, title: 'Event 1', description: 'Details about event 1'},
  //   {id: 2, title: 'Event 2', description: 'Details about event 2'},
  // ];

  // const slides = [
  //   ...announcements.map(item => ({
  //     ...item,
  //     type: 'Announcement',
  //   })),
  //   ...events.map(item => ({
  //     ...item,
  //     type: 'Event',
  //   })),
  // ];

  // const EmployeeData = async () => {
  //     console.log('data :', await UTILS.getItem(STORAGEKEYS.token));
  // };
  // EmployeeData();
  console.log("user data",userInfo)
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: colors.primary}}>
        <Row
          style={{
            alignItems: 'center',
            backgroundColor: colors.primary,
            marginHorizontal: mvs(10),
            marginVertical: mvs(15),
          }}>
          <Bold label={'Prismatic HRMS'} style={styles.title} />
          <TouchableOpacity onPress={() => navigation?.toggleDrawer()}>
            <MenuIcon />
          </TouchableOpacity>
        </Row>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={IMG.homebackgroundimg}
          resizeMode="stretch"
          style={styles.backgroundimg}>
          {/* <AppHeader
        title={'Prismatic LMS'}
        style={{backgroundColor: colors.primary,marginTop:mvs(-15)}}
      /> */}
        </ImageBackground>

        <View style={{marginTop: mvs(-130), padding: mvs(20)}}>
        <View style={styles.infoContainer}>
            <Row>
              <View style={{flex: 1}}>
                <Bold
                  label={'Welcome Back'}
                  color={colors.primary}
                  fontSize={mvs(18)}
                />
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
                  <View style={{width: '35%'}}>
                    <Regular color={colors.placeholder} label={'Name:'} />
                  </View>
                  <View style={{flex: 1}}>
                    <Medium fontSize={mvs(14)} color={colors.primary} label={userInfo?.employee_Name} numberOfLines={2}/>
                  </View>
                </Row>
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
                  <View style={{width: '35%'}}>
                    <Regular color={colors.placeholder} label={'Position:'} />
                  </View>
                  <View style={{flexGrow: 1}}>
                    <Medium fontSize={mvs(14)}
                      color={colors.primary}
                      label={'Graphic & UIUX Designer'}
                      numberOfLines={3}
                    />
                  </View>
                </Row>
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
                  <View style={{width: '35%'}}>
                    <Regular numberOfLines={3} fontSize={mvs(12)} color={colors.placeholder} label={'Department:'} />
                  </View>
                  <View style={{flexGrow: 1}}>

                  <Medium fontSize={mvs(14)} color={colors.primary} label={'Marketing'} />
                  </View>
                </Row>
                {/* <Row style={styles.timeContainer}>
                  <Fontisto name="clock" size={25} color={colors.black} />
                  <Medium
                    color={colors.primary}
                    fontSize={mvs(18)}
                    label={currentTime.toLocaleTimeString()}
                  />
                </Row> */}
              </View>
              <Image
                style={{
                  width: mvs(70),
                  height: mvs(70),
                  borderRadius: mvs(35),
                  marginRight: mvs(-15),
                  marginTop: mvs(-15),
                }}
                source={IMG.userimg}
              />
            </Row>
            <Row style={{marginTop: mvs(10)}}>
              {!(select === 'checkout') ? (
                <PrimaryButton
                  onPress={() => {setSelect('checkout'), setTimeToggle(false)}}
                  textStyle={{color: colors.white}}
                  containerStyle={{
                    ...styles.checkBtn,
                    backgroundColor: colors.primary,
                  }}
                  title="Start Working"
                />
              ) : (
               
                <TimeDisplay />
              )}
              {!(select === 'checkin') ? (
              <PrimaryButton
                onPress={() => setSelect('checkin')}
                disabled={!(select === 'checkout') ? true : false}
                containerStyle={{
                  ...styles.checkBtn,
                  backgroundColor:
                    select === 'checkout' ? colors.primary : colors.blur,
                }}
                title="End Working"
                textStyle={{color: colors.white}}
              />
                ) : (
               
               <TimeDisplay />
             )}
            </Row>
            {/* <Row style={{marginTop: mvs(10)}}>
              <PrimaryButton
                onPress={() => setSelect('checkin')}
                textStyle={{color: colors.white}}
                containerStyle={{
                  ...styles.checkBtn,
                  backgroundColor:
                    select === 'checkin' ? colors.primary : colors.blur,
                }}
                title="Start Working"
              />
              <PrimaryButton
                onPress={() => setSelect('checkout')}
                containerStyle={{
                  ...styles.checkBtn,
                  backgroundColor:
                    select === 'checkout' ? colors.primary : colors.blur,
                }}
                title="End Working"
                textStyle={{color: colors.white}}
              />
            </Row> */}
          </View>
        </View>
        {/* <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1,backgroundColor:colors.white,marginHorizontal:mvs(20)}}> */}
        {/* <View
          style={{
            height: mvs(90),

            // paddingHorizontal: mvs(20),
            borderRadius: mvs(10),
            backgroundColor: colors.silver,
            marginHorizontal: mvs(20),
          }}>
          <CustomSwiper
            autoplay={false}
            ref={swiperRef}
            s
            showsPagination
            onIndexChanged={index => console.log(`Current Slide: ${index}`)}>
            {announcements.map(slide => (
              <View key={slide.id} style={styles.slide}>
                <Row
                  style={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    gap: mvs(30),
                  }}>
                  <Text style={styles.slidertitle}>{slide.title}</Text>
                  {slide.type == 'Announcement' ? (
                    <Icon name="megaphone" size={25} color="#000" />
                  ) : (
                    <MaterialIcons name="event" size={25} color="#000" />
                  )}
                </Row>
                <Text style={styles.description}>{slide.description}</Text>
              </View>
            ))}
          </CustomSwiper>
        </View> */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginVertical:mvs(8) }}>
              <MyCarousel data={myData} />
            </View>

        <Row style={{marginTop: mvs(10), alignItems: 'center',marginHorizontal:mvs(20)}}>
                <Medium
                  color={colors.primary}
                  fontSize={mvs(14)}
                  label={'Working Statistics'}
                />
                <InputWithIconLeavesTypeSelection
                  containerStyle={{
                    backgroundColor: colors.white,
                    borderColor: colors.border,
                    marginTop: mvs(10),
                    height: mvs(35),
                  }}
                  placeholder="Filter"
                  // items={leaveType}
                  // id={values?.leaveType}
                  // value={values?.leaveType?.LeaveName}
                  // onChangeText={LeaveName =>
                  //   setFieldValue('leaveType', LeaveName)
                  // }
                  // error={touched?.leaveType ? t(errors.leaveType) : ''}
                />
              </Row>
              <Bargraph />
              <View style={{    marginHorizontal:mvs(20),
}}>
              <DrawerHomeCard
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
              />
              </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: mvs(20),
            marginBottom: mvs(100),
            marginHorizontal: mvs(20),
          }}>
          {HomeList.map((item, index) => {
            return (
              <ServiceCard
                onPress={() => {
                  console.log('move to :', item?.moveTo),
                    navigate(item?.moveTo);
                }}
                key={item?.id || index}
                backgroundColor={
                  index % 4 === 0 || index % 4 === 3
                    ? colors.homecard2
                    : colors.homecard1
                }
                item={item}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeTab;
