import React, { View, Text, Component, StyleSheet, ListView } from 'react-native'

import Colors from '../../global/colors'
import Cell from './cell'


export default class PlacesList extends Component {

  static get defaultProps() {
    return { places: [] }
  }

  get datasource() {
    return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.identifier !== r2.identifier })
  }

  render() {
    return (
      <ListView
        style={this.props.style}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={true}
        dataSource={this.datasource.cloneWithRows(this.props.places)}
        renderRow={(place) => <Cell key={place.identifier} place={place} onSelection={this.props.onSelection}/>}
        renderSeparator={(section, row) => <View key={row} style={styles.separator}></View>}
        />
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    marginLeft: 16,
    marginRight: 8,
    backgroundColor: '#CCCCCC',
  },
})
