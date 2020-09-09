import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import axois from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { ApiConfig } from '../../util/config';
import Mapstyle from '../../util/maps.json'
import { Icon } from '@ui-kitten/components';

const Maps = () => {
  const { googleAPIKey, placeType } = ApiConfig;
  const [petshop, setPetShops] = useState([]);
  const [location, setLoaction] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  })
  let radius = 10 * 1000;
  const url =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
  location.latitude +
  ',' +
  location.longitude +
  '&radius=' +
  radius +
 '&type=' +
 placeType +
  '&key=' +
    googleAPIKey;
  
  const getShops = async () => {
    await axois.get(url).then(res => {
      // console.log(res.data.results)
      setPetShops(res.data.results)
    })
  }
  
  
  useEffect(() => {
    Geolocation.getCurrentPosition(res => {
      setLoaction({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
        latitudeDelta: res.coords.altitudeAccuracy,
        longitudeDelta: res.coords.altitude
      })
      setTimeout(() => {getShops()}, 2000)
    })
  }, [getShops])

  return (
    <View style={{width: "100%", height: "100%"}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%" }}
        showsUserLocation
        customMapStyle={Mapstyle}
        minZoomLevel={15}
        mapPadding={{bottom: 400}}
        region={location}
      >
        {/* <Marker coordinate={{latitude:location.latitude, longitude:location.longitude}} /> */}
        {petshop.map((marker, i) => 
          <Marker coordinate={{latitude:marker.geometry.location.lat, longitude:marker.geometry.location.lng}} />
        )}
      </MapView>
    </View>
  );
};

export default Maps;
