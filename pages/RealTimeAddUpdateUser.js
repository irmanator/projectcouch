// Building Offline First App in React Native using PouchDB and CouchDB
// https://aboutreact.com/react-native-offline-app-using-pouchdb-couchdb/

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';

import _ from 'lodash';
import Mybutton from './components/Mybutton';
import db from './config';

const RealTimeAddUpdateUser = () => {
  let [docs, setDocs] = useState([]);
  let [inputDoc, setInputDoc] = useState('');

  useEffect(() => {
    db.allDocs({include_docs: true})
      .then((results) => {
        let temp = results.rows.map((row) => row.doc);
        setDocs(temp);
        addLiveUpdateListner();
      })
      .catch((err) => {
        alert('Error in fetching data: ', err);
        addLiveUpdateListner();
      });
  }, []);

  const addLiveUpdateListner = () => {
    db.changes({
      live: true,
      include_docs: true,
      ascending: true,
    })
      .on('change', (change) => {
        // console.log('[Change:Change]', change);
        let doc = change.doc;
        if (!doc) return;
        if (doc._deleted) {
          console.log('delete doc => ', doc);
          removeDoc(doc);
        } else {
          console.log('add doc => ', doc);
          addDoc(doc);
        }
      })
      .on('complete', console.log.bind(console, '[Change:Complete]'))
      .on('error', console.log.bind(console, '[Change:Error]'));
  };

  const addDoc = (newDoc) => {
    setDocs((docs) => {
      if (!_.find(docs, {_id: newDoc._id})) {
        return docs.concat(newDoc);
      } else {
        return docs.map((item) => (item._id === newDoc._id ? newDoc : item));
      }
    });
  };

  const removeDoc = (oldDoc) => {
    setDocs((docs) => docs.filter((doc) => doc._id !== oldDoc._id));
  };

  const onDocSubmit = () => {
    db.post({name: inputDoc, contact: '', address: ''})
      .then((doc) => {
        console.log('doc', doc);
        if (!doc.ok) {
          alert('Insertion Failed');
          return;
        }
        setInputDoc('');
      })
      .catch((error) => alert('Error Inserting -> ' + error));
  };

  const onDocRemove = (oldDoc) => {
    db.remove(oldDoc)
      .then((doc) => {
        console.log('doc', doc);
        if (!doc.ok) {
          alert('Removal Failed');
          return;
        }
      })
      .catch((error) => alert('Error -> ' + error));
  };

  const renderDoc = (doc, index) => {
    return (
      <View
        style={{
          padding: 16,
          marginVertical: 10,
          backgroundColor: 'white',
          borderColor: '#E8E8E8',
          borderWidth: 1,
          borderBottomColor: '#D4D4D4',
          borderBottomWidth: 1,
          borderRadius: 2,
        }}
        key={index}>
        <Text>Id: {doc._id}</Text>
        <Text>Name: {doc.name}</Text>
        <Text>Contact: {doc.contact}</Text>
        <Text>Address: {doc.address}</Text>
        <Mybutton title="Remove" customClick={() => onDocRemove(doc)} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{
              flex: 1,
              borderColor: 'black',
              height: 40,
              borderWidth: 0.5,
              marginTop: 14,
              backgroundColor: 'white',
              padding: 10,
            }}
            placeholder="Enter Name"
            onChangeText={(inputDoc) => setInputDoc(inputDoc)}
            value={inputDoc}
          />
          <Mybutton title="Submit" customClick={onDocSubmit} />
        </View>
        <ScrollView>
          {docs.map((doc, index) => renderDoc(doc, index))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //containerForm
  containerForm: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: 40,
    backgroundColor: '#EEEEEE',
  },

  //containerStatus
  containerStatus: {
    backgroundColor: 'red',
    height: 20,
    marginBottom: 20,
    borderRadius: 20,
  },

  //Status Text
  statusText: {
    color: 'white',
    flexDirection: 'row',
    textAlign: 'center',
  },

  //containerList
  containerList: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  //Separator - Add form/List
  separator: {
    height: 0,
    backgroundColor: 'aliceblue',
  },
});

export default RealTimeAddUpdateUser;
