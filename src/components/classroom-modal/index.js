import React, { View, Text, Component, StyleSheet, ListView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'

import { fetchClasrooms } from '../../models'
import Colors from '../../global/colors'
import Row from './row'

export default class ClassroomModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
    }
    this.fetch()
  }

  fetch() {
    return fetchClasrooms(this.props.area)
      .then(places => this.setState({ places: places }))
  }

  get datasource() {
    return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.identifier !== r2.identifier })
  }

  render() {
    const datasource = this.datasource.cloneWithRows(this.state.places)
    return (
      <View style={styles.container}>
        <View style={[styles.content, styles.shadow]}>
          <ListView
            style={{ marginTop: 12, marginBottom: 12 }}
            dataSource={datasource}
            renderRow={(place) => <Row place={place} onSelection={this.onSelection.bind(this)}/>}
            />
        </View>
        <View style={[styles.buttons, styles.shadow]}>
          <Button style={styles.close} onPress={this.close.bind(this)}>Cerrar</Button>
          <Button style={styles.all} onPress={this.all.bind(this)}>Todas</Button>
        </View>
      </View>
    )
  }

  onSelection(...place) {
    Actions.dismiss()
    this.props.callback(place)
  }

  close() {
    Actions.dismiss()
  }

  all() {
    this.onSelection(...this.state.places)
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
    width: 250 / 2,
    color: 'white',
    backgroundColor: Colors.COMPLEMENT,
    paddingTop: 9,
  },
  all: {
    height: 40,
    width: 250 / 2,
    color: 'white',
    backgroundColor: Colors.MAIN,
    paddingTop: 9,
  },
})
