import React from 'react';
import { Text,View,Image,SafeAreaView } from 'react-native' ;
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TabOneScreen from '../screens/TabOneScreen';
import {Feather, AntDesign,FontAwesome} from '@expo/vector-icons';
import { TabOneParamList } from '../types';
const logo = require ('../assets/images/logo.png');


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<TabOneParamList>();

function CustomHeader()  {
    
    
  
    return (
      
      <View
        style={{
            top:15,
            margin: 10,
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center', 
            justifyContent: "space-between" , 
            height:60,         
        }}>
            <Image resizeMode='contain' style={{width:100, height:50}} source={logo} />

            <View style ={{flexDirection: 'row', width:150, justifyContent: "space-between"}}>
            <Feather name="cast" size={22} color="white" /> 
            <AntDesign name="bells" size={22} color="white" /> 
            <AntDesign name="search1" size={22} color="white" /> 
            <FontAwesome name="user-circle-o" size={22} color="white" />
            </View>
      
             


      </View> 
      
    );
  };

function HomeStackComponent() {
  return (
    <HomeStack.Navigator 
    screenOptions={{

        header: () => <CustomHeader />,

    }}
    >
      <HomeStack.Screen
        name="TabOneScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackComponent;