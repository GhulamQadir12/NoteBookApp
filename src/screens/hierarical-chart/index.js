import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { mvs } from 'config/metrices';
import * as IMG from 'assets/images';


// Recursive component to render the tree structure with collapsible functionality
const EmployeeTree = ({ employee, level = 0, loggedInId }) => {
  // Define a set of colors for each level
  const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#8A2BE2'];

  // Assign a color based on the level
  const circleColor = colors[level % colors.length];

  // State to track if the node is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(true);

  // Toggle the expand/collapse state
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Style to visually indent each level of the tree
  const indentStyle = { marginLeft: mvs(20) * level };

  // Check if the employee has subordinates
  const hasSubordinates = employee.subordinates && employee.subordinates.length > 0;

  // Highlight the node if it's the logged-in employee
  const isLoggedIn = employee.id === loggedInId;

  // Style for the circle when the employee is logged in
  const circleStyle = isLoggedIn
    ? [styles.circle, { backgroundColor: circleColor, borderWidth: mvs(5), borderColor: '#000000'}]
    : [styles.circle, { backgroundColor: circleColor }];

  return (
    <View style={[styles.employeeContainer, indentStyle]}>
      <View style={styles.employeeNode}>
        {/* Circle representing the employee */}
        <TouchableOpacity onPress={toggleExpand}>
          <View style={circleStyle}>
            <Text style={styles.employeeInitials}>{employee.name.charAt(0)}</Text>
            {/* <Image style={{width:'100%',height:mvs(43),borderRadius:mvs(25)}} source={IMG.Drawerman}/> */}
          </View>
        </TouchableOpacity>
        <View style={styles.employeeInfo}>
          <Text style={styles.employeeName}>{employee.name}</Text>
          <Text style={styles.employeePosition}>{employee.position}</Text>
        </View>
      </View>

      {/* Render subordinates if available and expanded */}
      {hasSubordinates && isExpanded && (
        <FlatList
          data={employee.subordinates}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EmployeeTree employee={item} level={level + 1} loggedInId={loggedInId} />}
        />
      )}
    </View>
  );
};

const EmployeeHierarchy = () => {
  // Simulate the logged-in employee's ID
  const loggedInEmployeeId = '2'; // Assume the employee with ID '2' is logged in

  return (
    <View style={{flex:1}}>
         <Header1x2x
        back={true}
        title={'Organizational Chart'}
        style={{height: mvs(60)}}
      />
    <ScrollView style={styles.verticalScroll} showsVerticalScrollIndicator={false}>
      <ScrollView horizontal contentContainerStyle={styles.horizontalScroll} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {employees.map((employee) => (
            <EmployeeTree key={employee.id} employee={employee} loggedInId={loggedInEmployeeId} />
          ))}
        </View>
      </ScrollView>
    </ScrollView>
    </View>

  );
};

// Sample data
const employees = [
    {
      id: '1',
      name: 'John Doe',
      position: 'CEO',
      subordinates: [
        {
          id: '2',
          name: 'Jane Smith',
          position: 'CTO',
          subordinates: [
            {
              id: '3',
              name: 'Bob Johnson',
              position: 'Dev Lead',
              subordinates: [
                {
                  id: '6',
                  name: 'Michael Davis',
                  position: 'Junior Dev',
                  subordinates: [
                    {
                      id: '8',
                      name: 'James Wilson',
                      position: 'Intern',
                      subordinates: [
                        {
                          id: '10',
                          name: 'Linda Brown',
                          position: 'Intern',
                          subordinates: []
                        },
                        {
                          id: '11',
                          name: 'William Lee',
                          position: 'Intern',
                          subordinates: []
                        },
                      ]
                  },
                    {
                      id: '12',
                      name: 'Sophia Miller',
                      position: 'Intern',
                      subordinates: []
                    }
                  //   {
                  //     id: '9',
                  //     name: 'Emily White',
                  //     position: 'Intern',
                  //     subordinates: [
                  //         {
                  //             id: '13',
                  //             name: 'David Harris',
                  //             position: 'Intern',
                  //             subordinates: []
                  //         },
                  //         {
                  //             id: '14',
                  //             name: 'Jessica Martinez',
                  //             position: 'Intern',
                  //             subordinates: []
                  //         }
                  //     ]
                  //   }
                  ]
                },
                {
                  id: '7',
                  name: 'Emma Clark',
                  position: 'Junior Dev',
                  subordinates: []
                }
              ]
            },
            {
              id: '4',
              name: 'Alice Brown',
              position: 'Dev',
              subordinates: []
            }
          ]
        },
        {
          id: '5',
          name: 'Chris Green',
          position: 'CFO',
          subordinates: []
        }
      ]
    },
    //   {
    //       id: '13',
    //       name: 'Mark Wilson',
    //       position: 'COO',
    //       subordinates: [
    //       {
    //           id: '14',
    //           name: 'Sarah Taylor',
    //           position: 'HR Lead',
    //           subordinates: [],
    //       },
    //       {
    //           id: '15',
    //           name: 'Olivia Moore',
    //           position: 'HR',
    //           subordinates: [],
    //       },
    //       ],
    //   }
  ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: mvs(20),
    paddingLeft: mvs(20),
    marginBottom: mvs(50),
  },
  verticalScroll: {
    flex: 1,
  },
  horizontalScroll: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    paddingRight: mvs(20),
  },
  employeeContainer: {
    flexDirection: 'column',
    marginBottom: mvs(15),
  },
  employeeNode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: mvs(5),
  },
  circle: {
    width: mvs(40),
    height: mvs(40),
    borderRadius: mvs(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: mvs(10),
  },
  employeeInitials: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: mvs(18),
  },
  employeeInfo: {
    flexDirection: 'column',
  },
  employeeName: {
    fontSize: mvs(18),
    fontWeight: 'bold',
  },
  employeePosition: {
    fontSize: mvs(14),
    color: '#666',
  },
});

export default EmployeeHierarchy;
