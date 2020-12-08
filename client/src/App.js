import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import {KeyList, KeyEdit} from './components/key/key';
import KeyCreate from './components/key/KeyCreate'
import ReaderList from './components/reader/ReaderList';
import './App.css';
import EventList from './components/event/EventList';
import AccessList from './components/access/AccessList'
import { NewKeyList } from './components/newKey/NewKeyList';

function App() {
  return (
    <Admin dataProvider={restProvider('http://localhost:5000')}>
        <Resource name="key" list={KeyList} create={KeyCreate}  />
        <Resource name="newkey" list={NewKeyList} />
        <Resource name="reader" list={ReaderList}   />
        <Resource name="event" list={EventList}   />
        <Resource name="access" list={AccessList}   />
    </Admin>
  );
}

export default App;
