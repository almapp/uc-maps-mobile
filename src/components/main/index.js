import React, {StatusBarIOS, Component, Navigator, StyleSheet, Platform} from 'react-native'
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'

import InformationView from '../information'
import MapsView from '../map-view'
import CampusList from '../campus-list'
import ClassroomModal from '../classroom-modal'
import ServicesModal from '../services-modal'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router hideNavBar={true}>
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="withoutAnimation"/>

        <Route name="maps" schema="default" title="Mapa" component={MapsView} />
        <Route name="classrooms" type="modal" component={ClassroomModal} />
        <Route name="services" type="modal" component={ServicesModal} />
        <Route name="campuses" schema="default" title="Selecciona Campus" component={CampusList} initial={true} hideNavBar={false} />
      </Router>
    )
  }
}
