import React, { StyleSheet, Component, Text, View } from 'react-native'
import MapView from 'react-native-maps'

import Colors from '../../../global/colors'
import * as helper from './helper'


export default class Marker extends Component {
  static get defaultProps() {
    return {
      pinColor: Colors.HIGH_CONTRAST,
    }
  }

  render() {
    const { place } = this.props
    const coordinate = helper.parse(place.center)
    if (!coordinate) return null

    const location = place.location
    return (
      <MapView.Marker
        ref={marker => this.marker = marker}
        coordinate={coordinate}
        title={place.display}
        description={(location && location.floor) ? `Piso: ${location.floor}` : undefined}
        {...this.props}
        />
    )
  }

  showCallout() {
    if (this.marker) this.marker.showCallout()
  }
}
