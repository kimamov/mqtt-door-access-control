import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import {KeyList} from './components/key/key';
import KeyCreate from './components/key/KeyCreate'
import ReaderList from './components/reader/ReaderList';
import ReaderShow from './components/reader/ReaderShow';
import './App.css';
import EventList from './components/event/EventList';
import AccessList from './components/access/AccessList'
import { NewKeyList } from './components/newKey/NewKeyList';
import authProvider from './AuthProvider';
import KeyShow from './components/key/KeyShow';




function App() {
  return (
    <Admin dataProvider={restProvider('http://localhost:5000')} locale="en" authProvider={authProvider}>
        <Resource name="reader" list={ReaderList} show={ReaderShow}/>
        <Resource name="key" list={KeyList} create={KeyCreate} show={KeyShow}/>
        <Resource name="newkey" list={NewKeyList} />
        <Resource name="event" list={EventList}   />
        <Resource name="access" list={AccessList}   />
        <Resource name="readerkey"   />
    </Admin>
  );
}

export default App;
