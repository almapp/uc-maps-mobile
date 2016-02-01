import React, { StatusBarIOS, Component, Navigator, StyleSheet, Platform } from 'react-native'
import { Router, Route, Schema, Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'

import DetailView from '../detail'
import MapsView from '../map-view'
import SearchView from '../search'
import Main from '../main'
import ClassroomModal from '../modals/classrooms'
import ServicesModal from '../modals/services'

import Colors from '../../global/colors'


export default class AppRouter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const search = {
      onRight: () => Actions.search(),
      rightTitle: 'Buscar',
    }

    return (
      <Router
        hideNavBar={Platform.OS !== 'ios'}
        barButtonTextStyle={styles.barButtonTextStyle}
        rightButtonTextStyle={styles.barButtonTextStyle}
        leftButtonTextStyle={styles.barButtonTextStyle}
        barButtonIconStyle={styles.barButtonIconStyle}>

        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="withoutAnimation"/>

        <Route name="main" schema="default" title="Mapas UC" component={Main} initial={true} {...search} />
        <Route name="detail" schema="default" title="Detalle" component={DetailView} />
        <Route name="search" schema="default" title="Buscar" component={SearchView} />
        <Route name="maps" schema="default" title="Mapa" component={MapsView} leftTitle={" "} {...search} />

        <Route name="classrooms" type="modal" component={ClassroomModal} />
        <Route name="services" type="modal" component={ServicesModal} />
      </Router>
    )
  }

  searchButton() {
    return (
      <Icon.Button name="search" onPress={() => Actions.main()} />
    );
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
