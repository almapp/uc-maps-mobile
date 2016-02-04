import React, { View, Text, Component, StyleSheet, ToolbarAndroid } from 'react-native'
import { Tab, TabLayout } from 'react-native-android-tablayout'
import { Actions } from 'react-native-router-flux'

import Toolbar from '../toolbar'
import CampusList from '../campus-list'
import InformationView from '../information'
import Colors from '../../global/colors'


export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
    }
  }

  view() {
    if (this.state.selected === 0) {
      return (<CampusList />)
    } else {
      return (<InformationView />)
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Toolbar title="Mapas UC"/>

        <TabLayout
          style={styles.tabs}
          selectedTabIndicatorColor="white"
          selectedTab={this.state.selected}
          onTabSelected={e => this.setState({ selected: e.nativeEvent.position })}>

          <Tab name="Mapas" accessibilityLabel="Mapas" textColor={this.state.selected === 0 ? 'white' :'#d3d3d3'} />
          <Tab name="Información" accessibilityLabel="Información" textColor={this.state.selected === 1 ? 'white' :'#d3d3d3'} />

        </TabLayout>

        {this.view()}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#EFEFF4',
  },
  tabs: {
    elevation: 10,
    backgroundColor: Colors.MAIN,
    // marginTop: 64,
  },
})
