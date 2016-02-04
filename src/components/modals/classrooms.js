import React, { View, Text, Component, StyleSheet, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'

import { Entity, fetchClasrooms } from '../../models'
import Colors from '../../global/colors'
import BaseModal from './base'
import ModalCell from './cell'


export default class ClassroomModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: this.props.places || [],
    }
    this.fetch().done()
  }

  fetch() {
    return fetchClasrooms(this.props.area)
      .then(places => this.setState({ places: places }))
  }

  get datasource() {
    return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.identifier !== r2.identifier })
  }

  render() {
    const places = this.state.places.sort(Entity.compare)
    const datasource = this.datasource.cloneWithRows(places)

    return (
      <BaseModal onAll={this.all.bind(this)} onClose={this.close.bind(this)}>
        <ListView
          style={styles.list}
          dataSource={datasource}
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
