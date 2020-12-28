import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import {KeyList} from './components/key/key';
import KeyCreate from './components/key/KeyCreate'
import KeyShow from './components/key/KeyShow'
import KeyEdit from './components/key/KeyEdit'
import ReaderList from './components/reader/ReaderList';
import ReaderShow from './components/reader/ReaderShow';
import './App.css';
import EventList from './components/event/EventList';
import AccessList from './components/access/AccessList'
import { NewKeyList } from './components/newKey/NewKeyList';
import authProvider from './AuthProvider';
import ReaderEdit from './components/reader/ReaderEdit';
import {Fingerprint, VpnKey, FiberNew, Event, LockOpen} from '@material-ui/icons';




function App() {
  const serverAdress=process.env.REACT_APP_SERVER;
  if(!serverAdress){
    return <p>
      env variable REACT_APP_SERVER point to the adress of the backend needs to be set
    </p>
  }
  return (
    <Admin dataProvider={restProvider(serverAdress)} locale="en" authProvider={authProvider}>
        <Resource icon={Fingerprint} name="reader" list={ReaderList} show={ReaderShow} edit={ReaderEdit}/>
        <Resource icon={VpnKey} name="key" list={KeyList} create={KeyCreate} edit={KeyEdit} show={KeyShow}/>
        <Resource icon={FiberNew} name="newkey" list={NewKeyList} options={{label: 'Unknown Keys'}}/>
        <Resource icon={Event} name="event" list={EventList}   />
        <Resource icon={LockOpen} name="access" list={AccessList}   />
        <Resource name="readerkey" />
        <Resource name="devicekey" />
    </Admin>
  );
}

export default App;
