// Building Offline First App in React Native using PouchDB and CouchDB
// https://aboutreact.com/react-native-offline-app-using-pouchdb-couchdb/

import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import db from './config';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white', padding: 16}}>
        <View style={{flex: 1}}>
          <Mytext text="Offline First App in React Native using PouchDB and CouchDB" />
          <Mybutton
            title="Register User (Add Data)"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="Update User (Update Data)"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View User (Get Single Record, filtered)"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All (Get All Records)"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete (Delete Single Record)"
            customClick={() => navigation.navigate('Delete')}
          />
          <Mybutton
            title="RealTime Record Add/Remove"
            customClick={() => navigation.navigate('RealTimeAddUpdate')}
          />
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

export default HomeScreen;
