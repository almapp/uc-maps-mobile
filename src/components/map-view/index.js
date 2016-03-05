import React, { StyleSheet, Text, View, Component, BackAndroid, Dimensions, Platform, ToolbarAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Subscribable from 'Subscribable'
import TimerMixin from 'react-timer-mixin'
import renderIf from '../../util/render-if'

import EasyMap from './map'
import Footer from './footer'
import Toolbar from '../toolbar'
import Colors from '../../global/colors'

import realm, { Place } from '../../realm'
import { PlacesFetcher } from '../../fetcher'
import * as R from '../../util/realm-patch'


export default React.createClass({
  mixins: [Subscribable.Mixin, TimerMixin],

  getInitialState: function() {
    return {
      areas: this.props.areas || this.load(),
      places: this.props.places,
      showingModal: false,
    }
  },

  getDefaultProps: function() {
    return { areas: [], places: [] }
  },

  componentDidMount: function() {
    // When search results arrive
    this.addListenerOn(this.props.searchEventEmitter, 'results', ({ found, query }) => {
      this.setState({ places: found, showingModal: false })
      if (found.length) {
        this.goToPlace(found[0])
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
    Actions.search({ area: this.props.campus })
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
    return realm.objects('Place')
      .filtered('_ancestorsId CONTAINS $0', this.props.campus.id)
      .filtered(categories.map(cat => `_categories CONTAINS "${cat}"`).join(' OR '))
      .sorted('shortName')
      .snapshot()
  },

  fetch: function() {
    const query = { categories: ['faculty', 'building', 'school', 'department'] }
    return PlacesFetcher.childs(this.props.campus, query)
      .then(areas => realm.write(() => {
        areas.forEach(area => realm.create('Place', area, true))
      }))
      .then(() => this.setState({ areas: this.load() }))
  },

  render: function() {
    const campus = this.props.campus
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
          onAreaSelection={area => this.refs.footer.goToArea(area)}
          />

        <Footer
          ref="footer"
          style={styles.footer}
          areas={areas}
          buttons={['Detalle', 'Salas', 'Servicios']}
          onAreaSelection={area => this.goToPlace(area, true)}
          onButtonPress={(area, index) => {
            switch (index) {
            case 0: return this.showDetails(area)
            case 1: return this.showClassrooms(area)
            case 2: return this.showServices(area)
            default: return null
            }
          }}
          onShowServices={this.showServices}
          onShowDetails={this.showDetails}
          />

      </View>
    )
  },

  onAreaSelection: function(area) {
    this.refs.footer.goToArea(area)
  },

  goBack: function() {
    if (!this.state.showingModal) Actions.pop()
    return true
  },

  // Map point
  goToCoordinates: function(coordinates, duration = 500) {
    this.refs.maps.animateToCoordinates(coordinates, duration)
  },

  // GeoJSON point
  goToPoint: function(point, duration) {
    if (point && point.coordinates && point.coordinates[0] && point.coordinates[1]) {
      this.goToCoordinates({
        latitude: point.coordinates[1],
        longitude: point.coordinates[0],
      }, duration)
      return true
    }
    return false
  },

  // API Entity
  goToPlace: function(place, showCallout = false, duration = 500, delay = 30) {
    const success = this.goToPoint(place.center, duration)
    if (success && this.calloutTimer) {
      this.clearTimeout(this.calloutTimer)
    }
    if (success && showCallout) {
      this.calloutTimer = this.setTimeout(() => this.refs.maps.showCallout(place), duration + delay)
    }
  },

  showDetails: function(area) {
    Actions.detail({ place: area })
  },

  showClassrooms: function(area) {
    // Pass callback to update view
    const callback = (places) => {
      if (places.length) {
        this.setState({ places: places, showingModal: false })
        this.goToPlace(places[0])
      } else {
        this.setState({ showingModal: false })
      }
    }
    this.setState({ showingModal: true })
    Actions.classrooms({ area: area, callback: callback })
  },

  showServices: function(area) {
    // Pass callback to update view
    const callback = (service) => {
      const places = service ? service.places : []
      if (places.length) {
        this.setState({ places: places, showingModal: false })
        this.goToPlace(places[0])
      } else {
        this.setState({ showingModal: false })
      }
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
  maps: {
    flex: 1,
  },
  footer: {
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOpacity: 0.7,
    elevation: 20,
  },
})
