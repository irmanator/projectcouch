// Building Offline First App in React Native using PouchDB and CouchDB
// https://aboutreact.com/react-native-offline-app-using-pouchdb-couchdb/
// Screen to view single user

import React, {useState} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import db from './config';

const ViewUser = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.get(inputUserId)
      .then((doc) => {
        console.log(doc);
        setUserData(doc);
      })
      .catch((err) => {
        alert('No user found');
        updateAllStates('', '', '');
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white', padding: 16}}>
        <View style={{flex: 1}}>
          <Mytextinput
            placeholder="Enter User Id"
            onChangeText={(inputUserId) => setInputUserId(inputUserId)}
            style={{padding: 10}}
          />
          <Mybutton title="Search User" customClick={searchUser} />
          <View style={{marginTop: 16}}>
            <Text>User Id: {userData._id}</Text>
            <Text>User Name: {userData.name}</Text>
            <Text>User Contact: {userData.contact}</Text>
            <Text>User Address: {userData.address}</Text>
          </View>
        </View>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          Offline First App in React Native using PouchDB and CouchDB
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;
