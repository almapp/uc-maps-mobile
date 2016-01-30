import React, {StatusBarIOS, Component, Navigator, StyleSheet, Platform} from 'react-native'
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'

import InformationView from '../information'
import MapsView from '../map-view'
import Main from '../main'
import ClassroomModal from '../modals/classrooms'
import ServicesModal from '../modals/services'

export default class AppRouter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router hideNavBar={true}>
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="withoutAnimation"/>

        <Route name="campuses" schema="default" title="Selecciona Campus" component={Main} hideNavBar={false} initial={true} />
        <Route name="information" schema="default" title="Información" component={InformationView} hideNavBar={false} />
        <Route name="maps" schema="default" title="Mapa" component={MapsView} />

        <Route name="classrooms" type="modal" component={ClassroomModal} />
        <Route name="services" type="modal" component={ServicesModal} />
      </Router>
    )
  }
}
