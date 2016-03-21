import React, { StatusBarIOS, Component, Navigator, StyleSheet, Platform } from 'react-native'
import { Router, Route, Schema, Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import EventEmitter from 'EventEmitter'

import DetailView from '../detail'
import MapsView from '../map-view'
import SearchView from '../search'
import Main from '../main'
import ClassroomModal from '../modals/classrooms'
import ServiceModal from '../modals/services'

import Colors from '../../global/colors'


export default class AppRouter extends Component {

  static get defaultProps() {
    return {
      searchEventEmitter: new EventEmitter(),
    }
  }

  render() {
    const isAndroid = Platform.OS !== 'ios'
    const search = {
      onRight: () => this.props.searchEventEmitter.emit('modal'),
      rightTitle: 'Buscar',
      searchEventEmitter: this.props.searchEventEmitter,
    }

    const noSwipe = {
      FloatFromRight: Object.assign(Navigator.SceneConfigs.FloatFromRight, { gestures: null }),
      FloatFromBottom: Object.assign(Navigator.SceneConfigs.FloatFromBottom, { gestures: null }),
    }

    return (
      <Router
        hideNavBar={isAndroid}
        barButtonTextStyle={styles.barButtonTextStyle}
        rightButtonTextStyle={styles.barButtonTextStyle}
        leftButtonTextStyle={styles.barButtonTextStyle}
        barButtonIconStyle={styles.barButtonIconStyle}>

        <Schema name="modal" sceneConfig={isAndroid ? Navigator.SceneConfigs.FadeAndroid : noSwipe.FloatFromBottom} />
        <Schema name="default" sceneConfig={isAndroid ? Navigator.SceneConfigs.FadeAndroid : noSwipe.FloatFromRight} />
        <Schema name="withoutAnimation"/>

        <Route name="main" schema="default" title="Mapas UC" component={Main} />
        <Route name="detail" schema="default" title="Detalle" component={DetailView} initial={true} />
        <Route name="search" schema="modal" title="Buscar" component={SearchView} searchEventEmitter={this.props.searchEventEmitter}/>
        <Route name="maps" schema="default" title="Mapa" component={MapsView} leftTitle={" "} {...search} />

        <Route name="classrooms" type="modal" component={ClassroomModal} />
        <Route name="services" type="modal" component={ServiceModal} />
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  barButtonTextStyle: {
    color: Colors.MAIN,
  },
  barButtonIconStyle: {
    tintColor: Colors.MAIN,
  },
})
