import React, { StyleSheet, Text, View, Component, Dimensions, Platform, StatusBarIOS } from 'react-native'
import TimerMixin from 'react-timer-mixin'
import MapView from 'react-native-maps'

import * as helper from './helper'
import Colors from '../../../global/colors'
import Polygon from './polygon'
import Marker from './marker'

const DEFAULT_REGION = {
  latitude: -33.45093681992992,
  longitude: -70.61507084839033,
  longitudeDelta: 0.09766039646630986,
  latitudeDelta: 0.139540891650725,
}


export default React.createClass({
  displayName: 'EasyMap',
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      initial: (this.props.initial) ? helper.parse(this.props.initial.center) : DEFAULT_REGION,
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
    // if (this.props.places.length) {
    //   this.setTimeout(() => {
    //     if (this.props.places.length && this.props.places[0].identifier) {
    //       const reference = this.refs[this.props.places[0].identifier]
    //       if (reference) reference.showCallout()
    //     }
    //   }, 700)
    // }

    // Marker icon for areas
    const dot = require('./img/dot.png')

    return (
      <MapView
        ref="maps"
        style={[styles.maps, this.props.style]}
        initialRegion={this.state.initial}
        mapType={this.props.mapType}
        showsPointsOfInterest={false}
        showsUserLocation={true}
        onRegionChangeComplete={this.onRegionChangeComplete}
        >

        {this.props.areas.map((area, i) => (
          <Polygon key={i} place={area} />
        ))}
        {this.props.areas.map(area => (
          <Marker ref={area.identifier} key={area.identifier} place={area} image={dot} onPress={coords => this.onAreaSelection(area)} />
        ))}
        {this.props.places.map(place => (
          <Marker ref={place.identifier} key={place.identifier} place={place} onPress={coords => this.onPlaceSelection(place)} />
        ))}

      </MapView>
    )
  },

  onAreaSelection: function(area) {
    if (this.props.onAreaSelection) this.props.onAreaSelection(area)
  },

  onPlaceSelection: function(place) {
    if (this.props.onPlaceSelection) this.props.onPlaceSelection(place)
  },

  onRegionChangeComplete: function(region) {
    // console.log(region)
  },

  showCallout(place) {
    const marker = this.refs[place.identifier]
    if (marker) marker.showCallout()
  },

  hideCallout(place) {
    const marker = this.refs[place.identifier]
    if (marker) marker.hideCallout()
  },

  animateToCoordinates: function(region) {
    this.refs.maps.animateToCoordinate(region)
  },
})

const styles = StyleSheet.create({
  maps: {
    flex: 1,
  },
})
