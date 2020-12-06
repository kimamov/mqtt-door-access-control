import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import {KeyList, KeyEdit, KeyCreate} from './components/key/key';
import ReaderList from './components/reader/ReaderList';
import './App.css';

function App() {
  return (
    <Admin dataProvider={restProvider('http://localhost:5000')}>
        <Resource name="key" list={KeyList} edit={KeyEdit} create={KeyCreate}  />
        <Resource name="reader" list={ReaderList}   />
    </Admin>
  );
}

export default App;
