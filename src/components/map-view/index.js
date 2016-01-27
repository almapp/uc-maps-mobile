import React, { StyleSheet, Text, View, Component, Dimensions, Platform, StatusBarIOS } from 'react-native'
import { Actions } from 'react-native-router-flux'

import EasyMap from './map'
import Footer from './footer'
import Header from './header'

import { fetchChilds, fetchFacultiesAndBuildings } from '../../models'

export default class MapsView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      campus: this.props.campus,
      areas: [],
      selected: 0,
      places: [],
      services: [
        { icon: 'man', categories: [] },
        { icon: 'woman', categories: [] },
        { icon: 'fork', categories: [] },
        { icon: 'trash-a', categories: [] },
        { icon: 'card', categories: [] },
        { icon: 'printer', categories: [] },
        { icon: 'ios-bookmarks', categories: [] },
        { icon: 'android-bicycle', categories: [] },
      ],
    }
    this.fetch()
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      StatusBarIOS.setStyle('light-content', true)
    }
  }

  fetch() {
    return fetchFacultiesAndBuildings(this.props.campus)
      .then(areas => this.setState({ areas: areas, selected: 0 }))
  }

  fetchWithCategory(...categories) {
    return fetchChilds(this.state.areas[this.state.selected], ...categories)
      .then(places => this.setState({ places: places }))
  }

  render() {
    return (
      <View style={styles.container}>

        <EasyMap ref="maps" style={styles.map} initial={this.state.campus} areas={this.state.areas}>
        </EasyMap>

        <Header style={styles.header} onBackButton={this.goBack}>
        </Header>

        <Footer
          style={styles.footer}
          tabs={this.state.services}
          areas={this.state.areas}
          onServiceSelection={this.selectService.bind(this)}
          onAreaSelection={this.selectArea.bind(this)}
          onShowClassrooms={this.showClassrooms.bind(this)}
          onShowDetails={this.showDetails.bind(this)}
          >
        </Footer>

      </View>
    )
  }

  goBack() {
    Actions.pop()
  }

  // Map point
  goToCoordinates(coordinates) {
    this.refs.maps.animateToRegion(coordinates)
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

  scrollTo(index) {
    this.refs.swiper.scrollTo(index)
  }

  selectArea(area) {
    this.goToPlace(area)
    // this.goTo(this.state.campus.location.coordinates[0][0])
  }

  selectService(service) {
    // this.fetchWithCategory("bath")
  }

  showClassrooms(area) {
    console.log(area);
  }

  showDetails(area) {
    console.log(area);
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
    height: 44,
    top: 20 + margin,
    left: margin,
  },
  maps: {
    flex: 1,
  },
  footer: {
    alignSelf: 'flex-end',
  }
})
