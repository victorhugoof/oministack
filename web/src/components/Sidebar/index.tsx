import React from 'react';
import axios from 'axios';
import DevForm from '../DevForm';
import './styles.css';

export default function Sidebar({ devs, setDevs }) {

    async function handleAddDev(data) {
        const response = await axios.post('http://192.168.0.116:3333/devs', data);
        const { _id } = response.data;

        if (devs.map(dev => dev._id).filter(id => id === _id).length <= 0) {
            setDevs([...devs, response.data]);
        }
    }

    return (<aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
    </aside>);
}
