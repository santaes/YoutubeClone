import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { LogBox } from 'react-native';
import { User } from './src/models';

import {withAuthenticator} from 'aws-amplify-react-native';
import Amplify, {Auth, DataStore} from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

 function App() {
  const isLoadingComplete = useCachedResources();
  
  useEffect(() => {
   const saveUserToDB = async () => {
     // get user from cognito
      const userInfo = await Auth.currentAuthenticatedUser();
      if (!userInfo) {
        return;
      }
      const userId = userInfo.attributes.sub;
      
     // check if user exist in DB 
      const user = (await DataStore.query(User)).find(user => user.sub  === userId);
      if (!user) {
        // if not , save User
        await DataStore.save(new User({
          sub: userId,
          name: userInfo.attributes.email,
          subscribers: 0,

        }))
      } else {
        
      }
     
   };
   saveUserToDB();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={'dark'}   />
       
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
export default withAuthenticator(App);