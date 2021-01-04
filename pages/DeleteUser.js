// Building Offline First App in React Native using PouchDB and CouchDB
// https://aboutreact.com/react-native-offline-app-using-pouchdb-couchdb/
// Screen to delete the user

import React, {useState} from 'react';
import {Text, View, Alert, SafeAreaView} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import db from './config';

const DeleteUser = ({navigation}) => {
  let [inputUserId, setInputUserId] = useState('');

  let deleteUser = () => {
    db.get(inputUserId)
      .then((doc) => {
        return db.remove(doc).then((doc) => {
          console.log('doc', doc);
          if (!doc.ok) {
            alert('Deletion Failed');
            return;
          }
          Alert.alert(
            'Success',
            'User Deleted successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('HomeScreen'),
              },
            ],
            {cancelable: false},
          );
        });
      })
      .catch((err) => {
        alert('No user found with inserted id');
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
          <Mybutton title="Delete User" customClick={deleteUser} />
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

export default DeleteUser;
