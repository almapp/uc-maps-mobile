import React, { View, Component, StyleSheet } from 'react-native'
import { ListView } from 'realm/react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'

import realm, { Place } from '../../realm'
import { PlacesFetcher } from '../../fetcher'
import * as R from '../../util/realm-patch'

import Cell from './cell'


export default class CampusList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      campuses: this.load(),
    }
    this.fetch().done()
  }

  load() {
    return realm.objects('Place').filtered('_categories CONTAINS "campus"').snapshot()
  }

  fetch() {
    return PlacesFetcher.campuses()
      .then(places => realm.write(() => {
        places.forEach(place => realm.create('Place', place, true))
      }))
      .then(() => this.setState({ campuses: this.load() }))
  }

  get datasource() {
    return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.identifier !== r2.identifier })
  }

  render() {
    const campuses = R.toArray(this.state.campuses)
    return (
      <ListView
        style={[styles.container, this.props.style]}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        dataSource={this.datasource.cloneWithRows(this.state.campuses)}
        renderRow={(campus, i) => <Cell key={i} campus={campus} onPress={this.selectCampus.bind(this)}/>}
        renderSeparator={(section, row) => <View key={row} style={styles.separator}></View>}
        />
    )
  }

  selectCampus(campus) {
    Actions.maps({ campus: campus, title: campus.display })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    // marginBottom: 5,
  },
})
