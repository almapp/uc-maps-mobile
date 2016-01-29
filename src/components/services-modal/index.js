import React, { View, Text, Component, StyleSheet, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'

import { fetchChilds } from '../../models'
import Colors from '../../global/colors'
import Row from './row'

export default class ServicesModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // Add 'places' array to each 'service'
      services: this.props.services.map(s => Object.assign(s, { places: [] }))
    }
    this.fetch()
  }

  static get defaultProps() {
    return {
      services: [
        { title: 'Baños hombre', icon: 'man', categories: ['bath_men'] },
        { title: 'Baños mujer', icon: 'woman', categories: ['bath_women'] },
        { title: 'Almuerzo', icon: 'pizza', categories: ['lunch'] },
        { title: 'Máquina dispensadora de comida', icon: 'pizza', categories: ['food_dispenser'] },
        { title: 'Kiosko', icon: 'pizza', categories: ['snack', 'food_cart'] },
        { title: 'Basureros de reciclaje', icon: 'trash-a', categories: ['trash', 'recycle'] },
        { title: 'Cajeros', icon: 'card', categories: ['cash'] },
        { title: 'Banco', icon: 'card', categories: ['bank'] },
        { title: 'Fotocopias', icon: 'printer', categories: ['photocopy'] },
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

        // Update view
        this.setState({ services: this.state.services })
      })
  }

  get datasource() {
    return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.places !== r2.places })
  }

  render() {
    const services = this.state.services.sort((a, b) => {
      a = a.places.length
      b = b.places.length
      if (a < b) return 1;
      else if (a > b) return -1;
      else return 0;
    })
    const datasource = this.datasource.cloneWithRows(services)

    return (
      <View style={styles.container}>
        <View style={[styles.content, styles.shadow]}>
          <ListView
            style={{ marginTop: 12, marginBottom: 12 }}
            dataSource={datasource}
            renderRow={(service) => <Row service={service} onSelection={this.onSelection.bind(this)}/>}
            />
        </View>
        <View style={[styles.buttons, styles.shadow]}>
          <Button style={styles.close} onPress={this.close.bind(this)}>Cerrar</Button>
        </View>
      </View>
    )
  }

  onSelection(service) {
    Actions.dismiss()
    this.props.callback(service)
  }

  close() {
    Actions.dismiss()
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  content: {
    width: 250,
    height: 300,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  buttons: {
    backgroundColor: 'white',
    width: 250,
    height: 40,
    flexDirection: 'row',
  },
  close: {
    // TODO: center vertically
    height: 40,
    width: 250,
    color: 'white',
    backgroundColor: Colors.COMPLEMENT,
    paddingTop: 9,
  },
})
