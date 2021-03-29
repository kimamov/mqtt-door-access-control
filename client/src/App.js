import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import KeyList from './components/key/KeyList';
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
import {Fingerprint, VpnKey, FiberNew, Event, LockOpen, VerifiedUser, LocationCity, Lock, Camera} from '@material-ui/icons';
import UserList from './components/user/UserList';
import UserCreate from './components/user/UserCreate';
import UserEdit from './components/user/UserEdit';
import LockList from './components/lock/LockList';
import LockShow from './components/lock/LockShow';
import LockCreate from './components/lock/LockCreate';
import LockEdit from './components/lock/LockEdit';
import BuildingList from './components/building/BuildingList';
import BuildingCreate from './components/building/BuildingCreate';
import Dashboard from './components/dashboard';
import ApartmentCreate from './components/apartment/ApartmentCreate';
import ApartmentList from './components/apartment/ApartmentList';
import CameraList from './components/camera/CameraList';
import CameraCreate from './components/camera/CameraCreate';
import CameraShow from './components/camera/CameraShow';



const isAdmin=permissions=>{
  console.log(permissions)
  return permissions==="admin"
}

function App() {
  const serverAdress=process.env.REACT_APP_SERVER;
  if(!serverAdress){
    return <p>
      env variable REACT_APP_SERVER point to the adress of the backend needs to be set
    </p>
  }
  return (
    <Admin dataProvider={restProvider(serverAdress)} dashboard={Dashboard} locale="en" authProvider={authProvider}>
      {permissions=>[
        <Resource icon={LocationCity} name="building" list={BuildingList} create={BuildingCreate}/>,
        <Resource icon={LocationCity} name="apartment" list={ApartmentList} create={ApartmentCreate}/>,
        <Resource icon={Camera} name="camera" list={CameraList} create={CameraCreate} show={CameraShow}/>,

        <Resource icon={Lock} name="lock" list={LockList} create={LockCreate} edit={LockEdit} show={LockShow} options={{label: 'Locks'}}/>,
        <Resource icon={Lock} name="lockkey" options={{label: 'Locks'}}/>,
        <Resource icon={Fingerprint} name="reader" list={ReaderList} show={ReaderShow} edit={ReaderEdit} options={{label: 'Controllers'}}/>,
        <Resource icon={VpnKey} name="key" list={KeyList} create={KeyCreate} edit={KeyEdit} show={KeyShow}/>,
        <Resource icon={FiberNew} name="newkey" list={NewKeyList} options={{label: 'Unknown Keys'}}/>,
        isAdmin(permissions) && <Resource icon={Event} name="event" list={EventList}   />,
        isAdmin(permissions) && <Resource icon={LockOpen} name="access" list={AccessList} />,
        isAdmin(permissions) && <Resource icon={VerifiedUser} name="user" list={UserList} create={UserCreate} edit={UserEdit}/>,
        /* TODO ADD USER RESOURCE */
        <Resource name="readerkey" />,
        <Resource name="devicekey" />
      ]}
    </Admin>
  );
}

export default App;

