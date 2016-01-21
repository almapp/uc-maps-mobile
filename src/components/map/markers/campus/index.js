import React, { StyleSheet, Text, View, Component } from 'react-native'

import autobind from 'autobind-decorator'
import MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons'

export default class CampusMarker extends Component {

  render() {
    const campus = this.props.campus
    const geoJSON = campus.location

    var coordinates = {
      latitude: 0,
      longitude: 0,
    }
    if (geoJSON.type === 'Polygon') {
      coordinates = {
        latitude: geoJSON.coordinates[0][0][1],
        longitude: geoJSON.coordinates[0][0][0],
      }
    }

    const address = campus.address.split(',')[0]

    return (
      <MapView.Marker
        coordinate={coordinates}
        onSelect={this.func.bind(this)} >

        <View style={styles.container}>
          <View style={styles.bubble}>
            <Text style={styles.title}>
              {campus.name}
            </Text>
            <Icon name="chevron-right" style={styles.disclosure} />
            <Text style={styles.description}>
              {address}
            </Text>
          </View>
          <View style={styles.arrowBorder} />
          <View style={styles.arrow} />
        </View>

      </MapView.Marker>
    )
  }

  onPress(coordinate, position) {

  }

  func(coordinate, position) {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.campus)
    }
  }

  onDeselect(coordinate, position) {

  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    backgroundColor: 'white',
    padding: 7,
    paddingTop: 5,
    borderRadius: 5,
    borderWidth: 0,
  },
  title: {
    fontSize: 14,
    marginBottom: 1,
  },
  disclosure: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: 'blue',
  },
  description: {
    fontSize: 9,
    fontWeight: '100',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 10,
    borderColor: 'transparent',
    borderTopColor: 'white',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'white',
    alignSelf: 'center',
    marginTop: -0.5,
},
})
