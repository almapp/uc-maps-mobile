import React, { View, Text, Component, StyleSheet } from 'react-native'
import { ListView } from 'realm/react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import sortBy from 'sort-by'

import realm, { Place } from '../../realm'
import { PlacesFetcher } from '../../fetcher'

import Colors from '../../global/colors'
import BaseModal from './base'
import ModalCell from './cell'


export default class ServiceModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      services: this.loadServices(this.props.services),
    }
    this.fetch().done()
  }

  static get defaultProps() {
    return {
      services: [
        { title: 'Baños hombre', icon: 'man', categories: ['bath_men'] },
        { title: 'Baños mujer', icon: 'woman', categories: ['bath_women'] },
        { title: 'Almuerzo', icon: 'pizza', categories: ['lunch'] },
        { title: 'Máquinas de comida', icon: 'pizza', categories: ['food_dispenser'] },
        { title: 'Kiosko', icon: 'pizza', categories: ['snack', 'food_cart'] },
        { title: 'Basureros de reciclaje', icon: 'trash-a', categories: ['trash', 'recycle'] },
        { title: 'Cajeros', icon: 'card', categories: ['cash'] },
        { title: 'Banco', icon: 'card', categories: ['bank'] },
        { title: 'Fotocópias', icon: 'printer', categories: ['photocopy'] },
        { title: 'Computadores', icon: 'printer', categories: ['computers'] },
        { title: 'Laboratorios', icon: 'printer', categories: ['lab'] },
        { title: 'Biblioteca', icon: 'ios-bookmarks', categories: ['library'] },
        { title: 'Salas de estudio', icon: 'ios-bookmarks', categories: ['study'] },
        { title: 'Estacionamiento bicicleta', icon: 'android-bicycle', categories: ['park_bicycle'] },
        { title: 'Estacionamiento autos', icon: 'android-bicycle', categories: ['park_car'] },
      ],
    }
  }

  loadServices(services) {
    return services.map(s => ({ ...s, places: this.load(s.categories) }))
  }

  load(categories) {
    return realm.objects('Place')
      .filtered('_ancestorsId CONTAINS $0', this.props.area.id)
      .filtered(categories.map(cat => `_categories CONTAINS "${cat}"`).join(' OR '))
      .sorted('identifier')
      .snapshot()
  }

  fetch() {
    // Flat categories
    const categories = this.props.services.reduce((total, current) => {
      return current.categories.concat(total)
    }, [])

    // Perform only one request
    return PlacesFetcher.childs(this.props.area, { categories: categories })
      .then(places => realm.write(() => {
        places.forEach(place => realm.create('Place', place, true))
      }))
      .then(() => this.setState({ services: this.loadServices(this.props.services) }))
  }

  get datasource() {
    return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.places.length !== r2.places.length })
  }

  render() {
    const services = this.state.services.sort((a, b) => {
      if (a.places.length < b.places.length) return 1
      if (a.places.length > b.places.length) return -1
      else return 0
    }) // .filter(s => s.places.length > 0)

    return (
      <BaseModal onClose={this.close.bind(this)}>
        <ListView
          style={styles.list}
          dataSource={this.datasource.cloneWithRows(services)}
          renderRow={service => this.cell(service)}
          />
      </BaseModal>
    )
  }

  cell(service) {
    const length = service.places.length
    const options = {
      title: service.title,
      subtitle: `Lugares: ${length ? length : '0 ?'}`,
      enabled: length > 0,
    }
    return (
      <ModalCell {...options} onSelection={this.onSelection.bind(this, service)} />
    )
  }

  onSelection(service = null) {
    Actions.dismiss()
    this.props.callback(service)
    return true
  }

  close() {
    return this.onSelection()
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
