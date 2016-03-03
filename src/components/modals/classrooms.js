import React, { View, Text, Component, StyleSheet } from 'react-native'
import { ListView } from 'realm/react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'

import realm, { Place } from '../../realm'
import { PlacesFetcher } from '../../fetcher'

import Colors from '../../global/colors'
import BaseModal from './base'
import ModalCell from './cell'


export default class ClassroomModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: this.load(),
    }
    this.fetch().done()
  }

  load() {
    const categories = ['classroom', 'lab', 'auditorium']
    return realm.objects('Place')
      .filtered('_ancestorsId CONTAINS $0', this.props.area.id)
      .filtered(categories.map(cat => `_categories CONTAINS "${cat}"`).join(' OR '))
      .sorted('identifier')
      .snapshot()
  }

  fetch() {
    return PlacesFetcher.classrooms(this.props.area)
      .then(places => realm.write(() => {
        places.forEach(place => realm.create('Place', place, true))
      }))
      .then(() => this.setState({ places: this.load() }))
  }

  get datasource() {
    return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.identifier !== r2.identifier })
  }

  render() {
    return (
      <BaseModal onAll={this.all.bind(this)} onClose={this.close.bind(this)}>
        <ListView
          style={styles.list}
          dataSource={this.datasource.cloneWithRows(this.state.places)}
          showsVerticalScrollIndicator={true}
          renderRow={(place) => this.cell(place)}
          />
      </BaseModal>
    )
  }

  cell(place) {
    const sub = place.location && place.location.floor ? `Piso: ${place.location.floor}` : undefined
    return (
      <ModalCell title={place.display} subtitle={sub} enabled={place.hasPosition} onSelection={this.onSelection.bind(this, place)}/>
    )
  }

  onSelection(...place) {
    Actions.dismiss()
    this.props.callback(place)
    return true
  }

  close() {
    return this.onSelection()
  }

  all() {
    return this.onSelection(...this.state.places)
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 12,
    marginBottom: 6,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
})
