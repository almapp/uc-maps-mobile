import React, {StatusBarIOS, Component, Navigator, StyleSheet, Platform} from 'react-native'
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'

import InformationView from '../information'
import MapsView from '../map'

export default class Main extends Component {
  constructor(props) {
    super(props)
    if (Platform.OS === 'ios') {
      StatusBarIOS.setStyle('light-content')
    }
  }

  render() {
    return (
      <Router hideNavBar={true}>
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="withoutAnimation"/>

        <Route name="map" schema="default" title="Mapa" component={MapsView} />
      </Router>
    )
  }
}
