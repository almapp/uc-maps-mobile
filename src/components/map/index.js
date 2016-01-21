import React, { StyleSheet, Text, View, Component } from 'react-native'

import MapView from 'react-native-maps'
import Tabs from 'react-native-tabs'

import CampusMarker from './markers/campus'

export default class MapsView extends Component {
  constructor(props) {
    super(props)

    // Why?
    // this.goTo = this.onSelect.bind(this)

    this.state = {
      initialRegion: {
        latitude: -33.45991114168568,
        longitude: -70.63080018531736,
        latitudeDelta: 0.2559724072906775,
        longitudeDelta: 0.1791658495423434,
      },
      campuses: [{
        name: "San Joaquín",
        address: "Vicuña Mackenna 4686, Macul",
        display: true,
        coordinates: {
          latitude: -33.498116,
          longitude: -70.611511,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      }, {
        name: "Casa Central",
        address: "Almirante Barroso 10, Santiago",
        display: true,
        coordinates: {
          latitude: -33.441513,
          longitude: -70.640508,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }
      }],
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
            ref="map"
            style={styles.map}
            initialRegion={this.state.initialRegion}
            region={this.state.region}
            mapType="hybrid"
            showsCompass={true}
            showsPointsOfInterest={false}
          >

          {this.state.campuses.filter(campus => campus.display).map((campus, i) => (
            <CampusMarker key={i} campus={campus} onSelect={this.onSelect.bind(this)}/>
          ))}

        </MapView>
        <View style={styles.header}>

        </View>
      </View>
    )
  }

  goTo(coordinates) {
    this.setState({
      campuses: this.state.campuses.map(campus => {
        campus.display = false
        return campus
      }),
    })
    this.refs.map.animateToRegion(coordinates)
  }

  onSelect(campus) {
    this.goTo(campus.coordinates)
  }
}

const margin = 10

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    right: margin,
    height: 46,
    top: 20 + margin,
    left: margin,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
})
