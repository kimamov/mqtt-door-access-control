import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import {KeyList, KeyEdit, KeyCreate} from './components/key/key';
import ReaderList from './components/reader/ReaderList';
import './App.css';
import EventList from './components/event/EventList';
import AccessList from './components/access/AccessList'
import { NewKeyList } from './components/newKey/NewKeyList';

function App() {
  return (
    <Admin dataProvider={restProvider('http://localhost:5000')}>
        <Resource name="key" list={KeyList} edit={KeyEdit} create={KeyCreate}  />
        <Resource name="newkey" list={NewKeyList} />
        <Resource name="reader" list={ReaderList}   />
        <Resource name="event" list={EventList}   />
        <Resource name="access" list={AccessList}   />
    </Admin>
  );
}

export default App;
