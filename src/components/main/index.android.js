import React, { View, Text, Component, StyleSheet } from 'react-native'
import { Tab, TabLayout } from 'react-native-android-tablayout'

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
      return <CampusList></CampusList>
    } else {
      return <InformationView></InformationView>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabLayout
          style={styles.tabs}
          selectedTab={this.state.selected}
          onTabSelected={e => this.setState({ selected: e.nativeEvent.position })}>

          <Tab name="Mapas" accessibilityLabel="Mapas"/>
          <Tab name="Información" accessibilityLabel="Información"/>

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
    marginTop: 64,
  },
})
