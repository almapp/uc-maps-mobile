import React, { StyleSheet, Component, Text, View } from 'react-native'
import MapView from 'react-native-maps'

import Colors from '../../../global/colors'


export default class Polygon extends Component {
  static get defaultProps() {
    return {
      fillColor: Colors.CONTRAST,
      strokeColor: 'rgba(0,0,0,0.5)',
      strokeWidth: 1,
    }
  }

  render() {
    const polygon = this.props.place.polygon
    if (!polygon) return null
    else return (
      <MapView.Polygon
        coordinates={polygon}
        {...this.props}
        />
    )
  }
}
