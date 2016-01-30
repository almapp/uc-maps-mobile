import React, { StyleSheet, Text, View, Component, Dimensions, Platform, StatusBarIOS } from 'react-native'

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


export default class EasyMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initial: (this.props.initial) ? parseGeoJSONPoint(this.props.initial.center) : DEFAULT_REGION,
    }
  }

  static get defaultProps() {
    return {
      areas: [],
      places: [],
    }
  }

  render() {
    const polygons = this.props.areas
                      .map(area => this.createPolygon(area))
                      .filter(p => p !== null)
    const markers = this.props.places
                      .map(place => this.createMarker(place))
                      .filter(p => p !== null)

    return (
      <MapView
        ref="maps"
        style={styles.maps}
        initialRegion={this.state.initial}
        mapType="hybrid"
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
  }

  createDisplay(place) {
    switch (place.location.type) {
      case 'Point': return this.createMarker(place)
      case 'Polygon': return this.createPolygon(place)
      default: return this.createMarker(place)
    }
  }

  createMarker(place) {
    const coordinate = parseGeoJSONPoint(place.center)
    return (
      <MapView.Marker
        key={place.identifier}
        coordinate={coordinate}
        title={place.shortName || place.name}
        description={`Piso: ${(place.location && place.location.floor) ? place.location.floor : '?'}`}
        pinColor={Colors.HIGH_CONTRAST}
        />
    )
  }

  createPolygon(place) {
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
  }

  animateToCoordinates(region) {
    this.refs.maps.animateToCoordinate(region)
  }

  onRegionChangeComplete(region) {
    // console.log(region)
  }
}

const styles = StyleSheet.create({
  maps: {
    flex: 1,
  },
})
