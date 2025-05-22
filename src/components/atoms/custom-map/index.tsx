import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { GeoPosition } from 'react-native-geolocation-service';
import MapView, { LatLng, MapViewProps, Marker } from 'react-native-maps';
import { UTILS } from 'utils';

interface CustomMapProps extends MapViewProps {
  children?: ReactNode;
}

const CustomMap: React.FC<CustomMapProps> = ({
  children,
  initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  style = styles.map,
  ...mapProps
}) => {
  const mapRef = React.useRef<MapView>(null);

  const [currentLocation, setCurrentLocation] = React.useState<
    LatLng | undefined
  >(undefined);
  const handleRegionChange = (region: LatLng) => {
    mapRef?.current?.animateToRegion(
      {
        ...region,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000,
    );
  };
  const handleCurrentLocationPress = () => {
    // Logic to retrieve and set the current location
    // For example, using Geolocation API or a location service library
    try {
      UTILS.get_current_location(
        (position: GeoPosition) => {
          setCurrentLocation({...position.coords});
          handleRegionChange(position.coords);
        },
        error => {
          console.log('error=>>', error);
        },
      );
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        {...mapProps}
        style={style}
        initialRegion={initialRegion}>
        {children}
        {currentLocation && <Marker coordinate={currentLocation} />}
      </MapView>
      {/* <View style={[styles.currentLocationButton]}>
        <TouchableOpacity onPress={handleCurrentLocationPress}>
          <CurrentLocation height={'100%'} width={'100%'} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: '70%',
    right: 16,
    backgroundColor: colors.white,
    height: mvs(50),
    width: mvs(50),
    borderRadius: mvs(25),
    padding: mvs(8),
    ...colors.shadow,
  },
});

export default CustomMap;
