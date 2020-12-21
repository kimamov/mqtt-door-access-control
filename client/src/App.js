import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import {KeyList} from './components/key/key';
import KeyCreate from './components/key/KeyCreate'
import KeyEdit from './components/key/KeyEdit'
import ReaderList from './components/reader/ReaderList';
import ReaderShow from './components/reader/ReaderShow';
import './App.css';
import EventList from './components/event/EventList';
import AccessList from './components/access/AccessList'
import { NewKeyList } from './components/newKey/NewKeyList';
import authProvider from './AuthProvider';




function App() {
  const serverAdress=process.env.REACT_APP_SERVER;
  if(!serverAdress){
    return <p>
      env variable REACT_APP_SERVER point to the adress of the backend needs to be set
    </p>
  }
  return (
    <Admin dataProvider={restProvider(serverAdress)} locale="en" authProvider={authProvider}>
        <Resource name="reader" list={ReaderList} show={ReaderShow}/>
        <Resource name="key" list={KeyList} create={KeyCreate} edit={KeyEdit}/>
        <Resource name="newkey" list={NewKeyList} />
        <Resource name="event" list={EventList}   />
        <Resource name="access" list={AccessList}   />
        <Resource name="readerkey"   />
    </Admin>
  );
}

export default App;
