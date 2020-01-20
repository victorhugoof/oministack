import React from 'react';
import './styles.css';

export default function DevItem({ dev }) {
    return (<li className="dev-item">
        <header>
            <img src={dev.avatar_url} alt={dev.github_username} />
            <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
            </div>
        </header>
        <p>{dev.bio}</p>
        <a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Acessar perfil no Github</a>
    </li>)
}
