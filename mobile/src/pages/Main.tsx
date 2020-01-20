import { MaterialIcons } from "@expo/vector-icons";
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Api from '../services/Api';

export default function Main({ navigation }) {
    let [currentRegion, setCurrentRegion] = useState(null);
    let [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadDevs() {
            const response = await Api.get('/devs');
            setDevs(response.data);
        }
        loadDevs();
    }, []);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                });
            }
        }
        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView style={styles.mapStyle} initialRegion={currentRegion} >
                {devs.map(dev =>
                    (<Marker coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0] }} key={dev._id}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                        <Callout onPress={() => navigation.navigate('Profile', { github_username: dev.github_username })} >
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>)
                )}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999999"
                    autoCapitalize="words"
                    autoCorrect={false} />
                <TouchableOpacity
                    style={styles.loadButton}
                    onPress={() => { }}>
                    <MaterialIcons name="my-location" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mapStyle: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFFFFF'
    },
    callout: {
        width: 260,
        borderRadius: 5
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row",
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFFFFF",
        color: "#333333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 1.5
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: "#BE4DFF",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15
    }
});
