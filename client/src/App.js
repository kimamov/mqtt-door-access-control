import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import {KeyList, KeyEdit, KeyCreate} from './components/key/key';
import './App.css';

function App() {
  return (
    <Admin dataProvider={restProvider('http://localhost:5000')}>
        <Resource name="key" list={KeyList} edit={KeyEdit} create={KeyCreate}  />
    </Admin>
  );
}

export default App;
