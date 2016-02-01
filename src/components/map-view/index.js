import React, { StyleSheet, Text, View, Component, Dimensions, Platform, ToolbarAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

import EasyMap from './map'
import Footer from './footer'
import Header from './header'
import Toolbar from '../toolbar'
import Colors from '../../global/colors'

import { fetchChilds, fetchFacultiesAndBuildings } from '../../models'


export default class MapsView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      campus: this.props.campus,
      areas: [],
      places: [],
      selected: 0,
    }
    this.fetch()
  }

  fetch() {
    return fetchFacultiesAndBuildings(this.props.campus)
      .then(areas => this.setState({ areas: areas, selected: 0 }))
  }

  render() {
    const campus = this.state.campus
    const toolbar = (Platform.OS !== 'ios') ? <Toolbar backButton title={campus.shortName || campus.name}/> : undefined

    return (
      <View style={styles.container}>

        {toolbar}

        <EasyMap
          ref="maps"
          style={styles.map}
          initial={campus}
          areas={this.state.areas}
          places={this.state.places}
          />

        <Footer
          style={styles.footer}
          areas={this.state.areas}
          onAreaSelection={this.selectArea.bind(this)}
          onShowClassrooms={this.showClassrooms.bind(this)}
          onShowServices={this.showServices.bind(this)}
          onShowDetails={this.showDetails.bind(this)}
          />

      </View>
    )
  }

  goBack() {
    Actions.pop()
  }

  // Map point
  goToCoordinates(coordinates) {
    this.refs.maps.animateToCoordinates(coordinates)
  }

  // GeoJSON point
  goToPoint(point) {
    this.goToCoordinates({
      latitude: point.coordinates[1],
      longitude: point.coordinates[0],
    })
  }

  // API Entity
  goToPlace(place) {
    if (place && place.location && place.location.coordinates) {
      const center = place.center
      if (center && center.coordinates && center.coordinates[0] && center.coordinates[1]) {
        return this.goToPoint(center)
      }
    }
    this.goToPoint(this.state.campus.center)
  }

  selectArea(area) {
    this.goToPlace(area)
  }

  showDetails(area) {
    Actions.detail({ area: area })
  }

  showClassrooms(area) {
    const callback = (places) => this.setState({ places: places })
    Actions.classrooms({ area: area, callback: callback })
  }

  showServices(area) {
    const callback = (service) => this.setState({ places: service.places })
    Actions.services({ area: area, callback: callback })
  }
}

const margin = 10

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    margin: margin,
    height: 44,
    // maxWidth: 320,
  },
  maps: {
    flex: 1,
  },
  footer: {

  },
})
