import React, { View, Text, Component, StyleSheet, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'

import { Entity, fetchChilds } from '../../models'
import Colors from '../../global/colors'
import BaseModal from './base'
import ModalCell from './cell'


export default class ServiceModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      services: this.props.services.map(s => Object.assign(s, { places: [] })),
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

  fetch() {
    // Flat categories
    const services = this.props.services.reduce((total, current) => {
      return current.categories.concat(total)
    }, [])

    // Perform only one request
    return fetchChilds(this.props.area, ...services)
      .then(places => {
        // Create hash
        const myMap = new Map()
        places.forEach(place => {
          place.categories.forEach(category => {
            var array = myMap.get(category)
            if (!array) array = []
            array.push(place)
            myMap.set(category, array)
          })
        })

        // Remap to services with categories
        this.state.services.forEach(service => {
          service.places = []
          service.categories.forEach(category => {
            service.places.push(...(myMap.get(category) || []))
          })
        })

        // Update view with fetched and sorted services
        return this.setState({ services: this.state.services })
      })
  }

  get datasource() {
    return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.places.length !== r2.places.length })
  }

  render() {
    const services = this.state.services.filter(s => s.places.length > 0)
    const datasource = this.datasource.cloneWithRows(services)

    return (
      <BaseModal onClose={this.close.bind(this)}>
        <ListView
          style={styles.list}
          dataSource={datasource}
          renderRow={(service) => this.cell(service)}
          />
      </BaseModal>
    )
  }

  cell(service) {
    const enabled = service.places.length > 0
    return (
      <ModalCell title={service.title} subtitle={`Lugares: ${service.places.length}`} enabled={enabled} onSelection={this.onSelection.bind(this, service)} />
    )
  }

  onSelection(service) {
    Actions.dismiss()
    this.props.callback(service)
    return true
  }

  close() {
    return this.onSelection(null)
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
