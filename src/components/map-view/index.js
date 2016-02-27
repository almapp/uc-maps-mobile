import React, { StyleSheet, Text, View, Component, BackAndroid, Dimensions, Platform, ToolbarAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Subscribable from 'Subscribable'
import TimerMixin from 'react-timer-mixin'
import renderIf from '../../util/render-if'

import EasyMap from './map'
import Footer from './footer'
import Header from './header'
import Toolbar from '../toolbar'
import Colors from '../../global/colors'

import realm, { Place } from '../../realm'
import { PlacesFetcher } from '../../fetcher'
import * as R from '../../util/realm-patch'


export default React.createClass({
  mixins: [Subscribable.Mixin, TimerMixin],

  getInitialState: function() {
    return {
      campus: this.props.campus,
      areas: this.load(),
      places: this.props.places || [],
      showingModal: false,
    }
  },

  componentDidMount: function() {
    // When search results arrive
    this.addListenerOn(this.props.searchEventEmitter, 'results', ({ found, query }) => {
      this.setState({ places: found, showingModal: false })
      if (found.length) {
        this.goToPlace(found[0])
        // this.refs.footer.scrollToIndex(2)
      }
    })

    // On search button press
    this.addListenerOn(this.props.searchEventEmitter, 'modal', this.showSearch)

    // Focus on first area if present
    if (this.state.areas.length) {
      this.setTimeout(() => {
        if (this.state.areas.length) this.goToPlace(this.state.areas[0])
      }, 1000)
    }

    // Download new data
    this.fetch().done()

    // Add Android back button responder
    this.setupBackButton()
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    // Prevent only if showingModal changed
    if (nextState.showingModal !== this.state.showingModal && nextState.places === this.state.places) {
      return false
    }
    return true
  },

  showSearch: function() {
    this.setState({ showingModal: true })
    Actions.search({ area: this.state.campus })
  },

  setupBackButton: function() {
    if (Platform.OS !== 'ios') {
      BackAndroid.addEventListener('hardwareBackPress', this.goBack)
    }
  },

  removeBackButton: function() {
    if (Platform.OS !== 'ios') {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack)
    }
  },

  load: function() {
    const categories = ['faculty', 'building', 'school', 'department']
    const query = categories.map(cat => `_categories CONTAINS "${cat}"`).join(' OR ')
    return realm.objects('Place').filtered(query)
  },

  fetch: function() {
    const query = { categories: ['faculty', 'building', 'school', 'department'] }
    return PlacesFetcher.childs(this.props.campus, query)
      .then(areas => realm.write(() => {
        areas.forEach(area => realm.create('Place', area, true))
      }))
      .then(() => this.forceUpdate())
  },

  render: function() {
    const campus = this.state.campus
    const areas = R.toArray(this.state.areas)
    return (
      <View style={styles.container}>

        {renderIf(Platform.OS !== 'ios')(
          <Toolbar backButton search title={campus.display} onActionSelected={this.showSearch} />
        )}

        <EasyMap
          ref="maps"
          style={styles.map}
          initial={campus}
          areas={areas}
          places={this.state.places}
          />

        <Footer
          ref="footer"
          style={styles.footer}
          areas={areas}
          onAreaSelection={this.selectArea}
          onShowClassrooms={this.showClassrooms}
          onShowServices={this.showServices}
          onShowDetails={this.showDetails}
          />

      </View>
    )
  },

  goBack: function() {
    if (!this.state.showingModal) Actions.pop()
    return true
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
    // TODO: improve conditions
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
    Actions.detail({ place: area })
  },

  showClassrooms: function(area) {
    // Pass callback to update view
    const callback = (places) => {
      this.setState({ places: places, showingModal: false })
      if (places.length) this.goToPlace(places[0])
    }
    this.setState({ showingModal: true })
    Actions.classrooms({ area: area, callback: callback })
  },

  showServices: function(area) {
    // Pass callback to update view
    const callback = (service) => {
      const places = service ? service.places : []
      this.setState({ places: places, showingModal: false })
      if (places.length) this.goToPlace(places[0])
    }
    this.setState({ showingModal: true })
    Actions.services({ area: area, callback: callback })
  },

  componentWillUnmount: function() {
    this.removeBackButton()
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    margin: 10,
    height: 44,
    // maxWidth: 320,
  },
  maps: {
    flex: 1,
  },
  footer: {

  },
})
