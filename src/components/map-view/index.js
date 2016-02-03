import React, { StyleSheet, Text, View, Component, Dimensions, Platform, ToolbarAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Subscribable from 'Subscribable'
import TimerMixin from 'react-timer-mixin'

import EasyMap from './map'
import Footer from './footer'
import Header from './header'
import Toolbar from '../toolbar'
import Colors from '../../global/colors'

import { fetchChilds, fetchFacultiesAndBuildings } from '../../models'


export default React.createClass({
  mixins: [Subscribable.Mixin, TimerMixin],

  getInitialState: function() {
    return {
      campus: this.props.campus,
      areas: this.props.areas || [],
      places: this.props.places || [],
      selected: 0,
    }
  },

  componentDidMount: function() {
    this.addListenerOn(this.props.searchEventEmitter, 'results', ({ found, query }) => {
      this.setState({ places: found })
      if (found.length) {
        this.goToPlace(found[0])
        // this.refs.footer.scrollToIndex(2)
      }
    });
    this.addListenerOn(this.props.searchEventEmitter, 'modal', () => {
      Actions.search({ area: this.state.campus })
    });

    if (this.state.areas.length) {
      this.setTimeout(() => {
        this.goToPlace(this.state.areas[0])
      }, 1000);
    }
    this.fetch().done()
  },

  fetch: function() {
    return fetchFacultiesAndBuildings(this.props.campus)
      .then(areas => this.setState({ areas: areas, selected: 0 }))
  },

  render: function() {
    const campus = this.state.campus
    const toolbar = (Platform.OS !== 'ios') ? <Toolbar backButton search title={campus.shortName || campus.name} onActionSelected={(_) => Actions.search({ area: campus })} /> : undefined

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
          ref="footer"
          style={styles.footer}
          areas={this.state.areas}
          onAreaSelection={this.selectArea}
          onShowClassrooms={this.showClassrooms}
          onShowServices={this.showServices}
          onShowDetails={this.showDetails}
          />

      </View>
    )
  },

  goBack: function() {
    Actions.pop()
  },

  // Map point
  goToCoordinates: function(coordinates) {
    this.refs.maps.animateToCoordinates(coordinates)
  },

  // GeoJSON point
  goToPoint: function(point) {
    this.goToCoordinates({
      latitude: point.coordinates[1],
      longitude: point.coordinates[0],
    })
  },

  // API Entity
  goToPlace: function(place) {
    if (place && place.location && place.location.coordinates) {
      const center = place.center
      if (center && center.coordinates && center.coordinates[0] && center.coordinates[1]) {
        return this.goToPoint(center)
      }
    }
    this.goToPoint(this.state.campus.center)
  },

  selectArea: function(area) {
    this.goToPlace(area)
  },

  showDetails: function(area) {
    Actions.detail({ area: area })
  },

  showClassrooms: function(area) {
    const callback = (places) => {
      this.setState({ places: places })
      if (places.length) this.goToPlace(places[0])
    }
    Actions.classrooms({ area: area, callback: callback })
  },

  showServices: function(area) {
    const callback = (service) => {
      this.setState({ places: service.places })
      this.goToPlace(area)
    }
    Actions.services({ area: area, callback: callback })
  },
})

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
