import React, { StyleSheet, Text, View, Component, Dimensions, Platform, StatusBarIOS } from 'react-native'
import TimerMixin from 'react-timer-mixin'
import MapView from 'react-native-maps'

import Colors from '../../../global/colors'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0091;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DEFAULT_REGION = {
  longitudeDelta: 0.09766039646630986,
  latitude: -33.45093681992992,
  longitude: -70.61507084839033,
  latitudeDelta: 0.139540891650725,
}

function parseGeoJSONPoint(json) {
  return {
    latitude: json.coordinates[1],
    longitude: json.coordinates[0],
    longitudeDelta: LONGITUDE_DELTA,
    latitudeDelta: LATITUDE_DELTA,
  }
}


export default React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      initial: (this.props.initial) ? parseGeoJSONPoint(this.props.initial.center) : DEFAULT_REGION,
    }
  },

  getDefaultProps: function() {
    return {
      areas: [],
      places: [],
      mapType: 'hybrid',
    }
  },

  render: function() {
    const polygons = this.props.areas.map(this.createPolygon).filter(p => p !== null)
    const markers = this.props.places.map(this.createMarker).filter(p => p !== null)

    if (this.props.places.length) {
      this.setTimeout(() => {
        const reference = this.refs[this.props.places[0].identifier]
        if (reference) reference.showCallout()
      }, 700);
    }

    return (
      <MapView
        ref="maps"
        style={styles.maps}
        initialRegion={this.state.initial}
        mapType={this.props.mapType}
        showsCompass={false}
        showsPointsOfInterest={false}
        showsTraffic={false}
        showsUserLocation={false}
        onRegionChangeComplete={this.onRegionChangeComplete}
        >

        {polygons}
        {markers}

      </MapView>
    )
  },

  createMarker: function(place, index) {
    const coordinate = parseGeoJSONPoint(place.center)
    const description = place.location && place.location.floor ? `Piso: ${place.location.floor}` : undefined
    return (
      <MapView.Marker
        ref={place.identifier}
        key={place.identifier}
        coordinate={coordinate}
        title={place.shortName || place.name}
        description={description}
        pinColor={Colors.HIGH_CONTRAST}
        />
    )
  },

  createPolygon: function(place, index) {
    const polygon = place.polygon
    if (!polygon) return null

    return (
      <MapView.Polygon
        key={place.identifier}
        coordinates={polygon}
        fillColor={Colors.CONTRAST}
        strokeColor="rgba(0,0,0,0.5)"
        strokeWidth={1}
      />
    )
  },

  animateToCoordinates: function(region) {
    this.refs.maps.animateToCoordinate(region)
  },

  onRegionChangeComplete: function(region) {
    // console.log(region)
  },
})

const styles = StyleSheet.create({
  maps: {
    flex: 1,
  },
})
