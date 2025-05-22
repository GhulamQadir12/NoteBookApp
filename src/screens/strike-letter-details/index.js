import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import ComplainRequestCard from 'components/molecules/complain-request-card';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect, useState} from 'react';
import {ScrollViewBase, TouchableOpacity, View} from 'react-native';
import Bold from 'typography/bold-text';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import ReimbursementRequestCard from 'components/molecules/Reimbursement-request-card';
import {Row} from 'components/atoms/row';
import {
  getReimbursementDetails,
  getReimbursementList,
  getStrikeLetterDetail,
} from 'services/api/auth-api-actions';
import {Button, Text} from 'react-native';
import DatePickered from 'components/atoms/date-picker/currentmonth';
import styles from './style';
import ReimbursementDetailsCard from 'components/molecules/Reimbursement-details-card';
import ReimbursementDetailCard from 'components/molecules/Reimbursement-details-card';
import Regular from 'typography/regular-text';
import {ScrollView} from 'react-native';
import {Checkbox} from 'components/atoms/checkbox';
import {Formik} from 'formik';
import {PrimaryInput, TextAreaInput} from 'components/atoms/inputs';
import {PlusButton, PrimaryButton} from 'components/atoms/buttons';
import Medium from 'typography/medium-text';
import AntDesign from 'react-native-vector-icons/AntDesign';

const StrikeLetterDetails = props => {
  const {strikeId} = props?.route?.params;
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [data, setdata] = useState([]); // Data for the list
  const [allData, setallData] = useState(null); // Data for the list
  console.log('in strike detail screen props', strikeId);
  // console.log("in detail screen props",props.route.params.reimbursementId);

  // const values = {
  //   groupId: 1,
  //   companyId: 8,
  //   reimbursementId: ReimbursementId,
  // };
  const fetchStrikeLetterDetails = async () => {
    try {
      setLoading(true);

      const response = await getStrikeLetterDetail(strikeId);
      // console.log('response ', response);
      setdata(response?.result);
      //   setallData(response);
      console.log('all data  ', data.result);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStrikeLetterDetails(); // Fetch data on component mount
  }, []);

  const issues = [
    {label: 'Misconduct', value: data.IfMisconduct},
    {label: 'Attendance Issues (Late)', value: data.Attendance_Late},
    {label: 'Insubordination', value: data.Insubordination},
    {label: 'Policy Violation', value: data.IfPolicyViolation},
    {label: 'Negligence', value: data.IfNegligence},
    {label: 'Damage', value: data.IfDamage},
    {label: 'Handling Misconduct', value: data.IfmisHandling},
    {label: 'Harassment', value: data.ifHarass},
  ];
  const responsiblePersons = [
    {label: 'Operation Manager', id: data.OperationMangerID},
    {label: 'QC Manager', id: data.QCManagerID},
    {label: 'HR Manager', id: data.HRMmangerID},
    {label: 'Team Lead', id: data.TeamLeadID},
  ];
  const incidents = [
    {label: 'Yes', value: data.IsFrist_IncidentYes},
    {label: 'No', value: data.IsFrist_IncidentNo},
  ];
  const strikes = [
    {label: 'Strike 1', value: data.StrikeOne},
    {label: 'Strike 2', value: data.StrikeTwo},
    {label: 'Strike 3', value: data.StrikeThree},
  ];
  console.log('first incidents', incidents);
  //   const handlePress = id => {
  //     // Toggle expansion for the selected card
  //     setExpandedCard(prevState => (prevState === id ? null : id));
  //   };

  // const renderItem = ({item}) => (
  //   <ReimbursementDetailCard
  //     item={item}
  //     //   onPress={() => handlePress(item.id)} // Toggle expansion on press
  //   />
  // );

  const initialValues = {
    reimbursementType: '',
    amount: data.EmployeeName,
    totalAmount: '',
    advancedPaid: '',
    document: '',
    reason: '',
  };

  const handleFormSubmit = async values => {
    try {
      // navigate('Drawer');
      // navigate.goBack();
      // setLoading(true)
      console.log('values are', values);
    } catch (error) {
      console.log('error=>', error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header1x2x
        back={true}
        title={'Strike Letter'}
        // style={{height: mvs(100)}}
      />
      {/* <Text>
        {data.result?.EmployeeName}
      </Text> */}

      <ScrollView style={styles.lettercontainer} showsVerticalScrollIndicator={false}>
        {/* <Text style={styles.header}>Strike Letter</Text> */}
        {/* <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            touched,
            values,
            errors,
            resetForm,
          }) => (
            <>
              {console.log('errror2', errors)} */}

              <Regular style={styles.subHeader} label={`Date: ${new Date(data.DateTime).toLocaleDateString()}`} />
                
              <PrimaryInput
                value={data.EmployeeName}
                editable={false}
              />

              <PrimaryInput
                value={data.EmployeeID}
                editable={false}
              />
              <Regular style={styles.bodyText} numberOfLines={5} label={
                'This letter serves as a formal notice regarding the misconduct observed in your recent actions. Below are the specific details of the incident:'} />

              <View style={styles.detailsContainer}>
                {issues.map((issue, index) => (
                  <Row key={index} style={styles.issueItem}>
                    <Checkbox checked={issue.value} onPress={() => {}} />
                    <Regular style={styles.issueText} label={issue.label} />
                  </Row>
                ))}
              </View>
              <Bold
                style={styles.bodyText}
                label={'Description of Incident: '}
              />
              <View style={styles.desContainer}>
                <Text style={styles.descriptionText}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
              </View>
              <Bold
                style={styles.bodyText}
                label={'Is this the first incident of this problem ?: '}
                multiline={true}
              />
              <Row style={styles.incidentContainer}>
                {incidents.map((incident, index) => (
                  <Row key={index} style={styles.issueItem}>
                    <Checkbox checked={incident.value} onPress={() => {}} />
                    <Regular style={styles.issueText} label={incident.label} />
                  </Row>
                ))}
              </Row>

              <Row style={styles.incidentContainer}>
                {strikes.map((strike, index) => (
                  <Row key={index} style={styles.issueItem}>
                    <Checkbox checked={strike.value} onPress={() => {}} />
                    <Text style={styles.issueText}>{strike.label}</Text>
                  </Row>
                ))}
              </Row>

              <Bold
                style={styles.bodyText}
                label={'Immediate action taken '}
              />
              <View style={styles.desContainer}>
                <Text style={styles.descriptionText}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
              
                </Text>
              </View>
              <Bold
                style={styles.bodyText}
                label={'Employee comments: '}
              />
              <View style={styles.desContainer}>
                <Text style={styles.descriptionText}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
               
                </Text>
              </View>
            {/* </> */}
          {/* )}
        </Formik> */}
        <Bold
                style={styles.bodyText}
                label={'Signatures '}
              />
        <View style={styles.signatureContainer}>
          {responsiblePersons.map((person, index) => (
            <View key={index} style={styles.personItem}>
              <Text style={styles.personText}>
                {person.label} : {person.id}
              </Text>
            </View>
          ))}
        </View>

        <View style={{marginBottom: mvs(60)}}></View>
      </ScrollView>
    </View>
  );
};

export default StrikeLetterDetails;

// import CustomFlatList from 'components/atoms/custom-flatlist';
// import FormHeader from 'components/atoms/headers/header';
// import {Loader} from 'components/atoms/loader';
// import ComplainRequestCard from 'components/molecules/complain-request-card';
// import {colors} from 'config/colors';
// import {height, mvs, width} from 'config/metrices';
// import {navigate} from 'navigation/navigation-ref';
// import React, {useEffect, useState} from 'react';
// import {ScrollViewBase, TouchableOpacity, View} from 'react-native';
// import Bold from 'typography/bold-text';
// import Header1x2x from 'components/atoms/headers/header-1x-2x';
// import ReimbursementRequestCard from 'components/molecules/Reimbursement-request-card';
// import {Row} from 'components/atoms/row';
// import {
//   getReimbursementDetails,
//   getReimbursementList,
//   getStrikeLetterDetail,
// } from 'services/api/auth-api-actions';
// import {Button, Text} from 'react-native';
// import DatePickered from 'components/atoms/date-picker/currentmonth';
// import styles from './style';
// import ReimbursementDetailsCard from 'components/molecules/Reimbursement-details-card';
// import ReimbursementDetailCard from 'components/molecules/Reimbursement-details-card';
// import Regular from 'typography/regular-text';
// import {ScrollView} from 'react-native';
// import { Checkbox } from 'components/atoms/checkbox';

// const StrikeLetterDetails = props => {
//   const {strikeId} = props?.route?.params;
//   const [loading, setLoading] = useState(false);
//   const [select, setSelect] = useState('all');
//   const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
//   const [data, setdata] = useState([]); // Data for the list
//   const [allData, setallData] = useState(null); // Data for the list
//   console.log('in strike detail screen props', strikeId);
//   // console.log("in detail screen props",props.route.params.reimbursementId);

//   // const values = {
//   //   groupId: 1,
//   //   companyId: 8,
//   //   reimbursementId: ReimbursementId,
//   // };
//   const fetchStrikeLetterDetails = async () => {
//     try {
//       setLoading(true);

//       const response = await getStrikeLetterDetail(strikeId);
//       // console.log('response ', response);
//       setdata(response?.result);
//       //   setallData(response);
//       console.log('all data  ', data.result);
//     } catch (err) {
//       console.error('Failed to fetch data', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStrikeLetterDetails(); // Fetch data on component mount
//   }, []);

//   const issues = [
//     {label: 'Misconduct', value: data.IfMisconduct},
//     {label: 'Attendance Issues (Late)', value: data.Attendance_Late},
//     {label: 'Insubordination', value: data.Insubordination},
//     {label: 'Policy Violation', value: data.IfPolicyViolation},
//     {label: 'Negligence', value: data.IfNegligence},
//     {label: 'Damage', value: data.IfDamage},
//     {label: 'Handling Misconduct', value: data.IfmisHandling},
//     {label: 'Harassment', value: data.ifHarass},
//   ];
//   const responsiblePersons = [
//     { label: 'Operation Manager', id: data.OperationMangerID },
//     { label: 'QC Manager', id: data.QCManagerID },
//     { label: 'HR Manager', id: data.HRMmangerID },
//     { label: 'Team Lead', id: data.TeamLeadID },
//   ];
//   console.log('first issue', issues);
//   //   const handlePress = id => {
//   //     // Toggle expansion for the selected card
//   //     setExpandedCard(prevState => (prevState === id ? null : id));
//   //   };

//   // const renderItem = ({item}) => (
//   //   <ReimbursementDetailCard
//   //     item={item}
//   //     //   onPress={() => handlePress(item.id)} // Toggle expansion on press
//   //   />
//   // );

//   return (
//     <View style={styles.container}>
//       <Header1x2x
//         back={true}
//         title={'Strike Letter'}
//         // style={{height: mvs(100)}}
//       />
//       {/* <Text>
//         {data.result?.EmployeeName}
//       </Text> */}

//       <ScrollView style={styles.lettercontainer}>
//         {/* <Text style={styles.header}>Strike Letter</Text> */}

//         <Text style={styles.subHeader}>
//           Date: {new Date(data.DateTime).toLocaleDateString()}
//         </Text>

//         <Text style={styles.bodyText}>{data.EmployeeName}</Text>
//         <Text style={styles.bodyText}>{data.EmployeeID}</Text>

//         <Text style={styles.bodyText}>Subject: Notice of Strike</Text>

//         <Text style={styles.bodyText}>
//           This letter serves as a formal notice regarding the misconduct
//           observed in your recent actions. Below are the specific details of the
//           incident:
//         </Text>
//         <View style={styles.detailsContainer}>
//           {issues.map((issue, index) => (
//             <Row key={index} style={styles.issueItem}>
//               <Checkbox checked={issue.value} onPress={() => {}} />
//               <Text style={styles.issueText}>{issue.label}</Text>
//             </Row>
//           ))}
//         </View>

//         <Bold style={styles.bodyText} label={'Description of Incident: '}/>
//         {/* <Text style={styles.descriptionText}>{data.StrikeDescription.replace(/\u003C.*?\u003E/g, '')}</Text> */}

//         <Text style={styles.bodyText}>
//           Immediate Action Taken: {data.ImmediateAtion}
//         </Text>
//         <Text style={styles.bodyText}>
//           Employee Comment: {data.Employeecomment}
//         </Text>

//         <Text style={styles.bodyText}>
//           This is considered{' '}
//           {data.StrikeOne
//             ? 'Strike One'
//             : data.StrikeTwo
//             ? 'Strike Two'
//             : 'Strike Three'}{' '}
//           in our disciplinary process.
//         </Text>

//         <Text style={styles.bodyText}>
//         Below are the individuals involved in the strike process:
//       </Text>
//       <View style={styles.detailsContainer}>
//         {responsiblePersons.map((person, index) => (
//           <View key={index} style={styles.personItem}>
//             <Text style={styles.personText}>{person.label}: {person.id}</Text>
//           </View>
//         ))}
//       </View>

//         <View style={{marginBottom:mvs(60)}}>

//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default StrikeLetterDetails;
