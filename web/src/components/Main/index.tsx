import React, { useEffect } from 'react';
import axios from 'axios';
import DevItem from '../DevItem';
import './styles.css';

export default function Main({ devs, setDevs }) {

    useEffect(() => {
        async function loadDevs() {
            const response = await axios.get('http://192.168.0.116:3333/devs');
            setDevs(response.data);
        }
        loadDevs();
    }, [setDevs]);

    return (
        <main>
            <ul>
                {devs.map(dev => <DevItem dev={dev} key={dev._id} />)}
            </ul>
        </main>);
}
