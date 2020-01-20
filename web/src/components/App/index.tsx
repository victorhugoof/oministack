import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Main from '../Main';
import './styles.css';

export default function App() {
    let [devs, setDevs] = useState([]);

    return (
        <div id="app">
            <Sidebar devs={devs} setDevs={setDevs} />
            <Main devs={devs} setDevs={setDevs} />
        </div>
    )
}
