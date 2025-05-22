import React, {useEffect} from 'react';

import MapViewDirections from 'react-native-maps-directions';
const MapDirections = props => {
  const {origin, destination, strokeWidth, strokeColor, handleGetDirections} =
    props;
  // const origin = {latitude: 37.78825, longitude: -122.4324};
  // const destination = {latitude: 37.7749, longitude: -122.4194};

  return (
    <MapViewDirections
      origin={origin}
      destination={destination}
      // apikey={'AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98'}
      apikey={'AIzaSyBxP_tL24fzdEqNKA5kicip7vyAExtNdPE'}
      strokeWidth={strokeWidth} // strokeWidth={3}
      strokeColor={strokeColor} // strokeColor="hotpink"
      onReady={handleGetDirections}
    />
  );
};

export default MapDirections;
