import React, { StyleSheet, Text, View, Component } from 'react-native'

import MapView from 'react-native-maps'
import Tabs from 'react-native-tabs'
import { Actions } from 'react-native-router-flux'

import CampusMarker from './markers/campus'

export default class MapsView extends Component {
  constructor(props) {
    super(props)

    // Why?
    // this.goTo = this.onSelect.bind(this)

    this.state = {
      initialRegion: {
        longitudeDelta: 0.09766039646630986,
        latitude: -33.45093681992992,
        longitude: -70.61507084839033,
        latitudeDelta: 0.139540891650725
      },
      campus: this.props.campus,
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
            showsTraffic={false}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >

          <CampusMarker campus={this.state.campus} onSelect={this.onSelect.bind(this)}/>

        </MapView>
        <View style={styles.header}>

        </View>
      </View>
    )
  }

  goBack() {
    Actions.pop()
  }

  goTo(coordinates) {
    this.refs.map.animateToRegion(coordinates)
  }

  onSelect() {
    // this.goTo(this.state.campus.location.coordinates[0][0])
  }

  onRegionChangeComplete(region) {
    console.log(region)
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
