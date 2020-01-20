import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 30,
            '& .input-group': {
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "1fr 1fr",
            },
            '& .MuiTextField-root': {
                margin: theme.spacing(1.5, 0),
            },
            '& button[type=submit]': {
                // width: 100,
                marginTop: 30,
                background: "#7d40e7",
                padding: "8px 16px",
                fontSize: 16,
                fontWeight: "bold",
                color: "#FFFFFF",
                transition: "background 0.5s"
            },
            '& button[type=submit]:hover': {
                background: "#6931ca"
            }
        },
    }),
);

export default function DevForm({ onSubmit }) {

    const classes = useStyles();
    let [github_username, setGithubUsername] = useState('');
    let [techs, setTechs] = useState('');
    let [latitude, setLatitude] = useState('');
    let [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude.toString());
            setLongitude(longitude.toString());
        }, error => {
            console.log(error);
        }, {
            timeout: 30000
        });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });
        setGithubUsername('');
        setTechs('');
    }

    return (
        <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
            <TextField
                label="Usuário"
                name="github_username"
                id="github_username"
                size="small"
                variant="outlined"
                fullWidth
                value={github_username}
                onChange={e => setGithubUsername(e.target.value)}
                required
            />
            <TextField
                label="Tecnologias"
                name="techs"
                id="techs"
                size="small"
                variant="outlined"
                fullWidth
                value={techs}
                onChange={e => setTechs(e.target.value)}
                required />

            <div className="input-group">
                <TextField
                    label="Latitude"
                    type="number"
                    name="latitude"
                    id="latitude"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={latitude}
                    onChange={e => setLatitude(e.target.value)}
                    required />
                <TextField
                    label="Longitude"
                    type="number"
                    name="longitude"
                    id="longitude"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={longitude}
                    onChange={e => setLongitude(e.target.value)}
                    required />
            </div>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disableElevation>
                Salvar
            </Button>
        </form>
    );
}
