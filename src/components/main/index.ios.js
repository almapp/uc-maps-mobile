import React, { View, Text, Component, StyleSheet, TabBarIOS } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

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

  render() {
    return (
      <TabBarIOS
        tintColor={Colors.MAIN}
        barTintColor="white">

        <Icon.TabBarItem
          title="Mapas"
          iconName="map"
          selected={this.state.selected === 0}
          onPress={() => this.setState({ selected: 0 })}>
          <CampusList style={{marginTop: 44}}></CampusList>
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="Información"
          iconName="information"
          selected={this.state.selected === 1}
          onPress={() => this.setState({ selected: 1 })}>
          <InformationView style={{marginTop: 44}}></InformationView>
        </Icon.TabBarItem>

      </TabBarIOS>
    )
  }
}
