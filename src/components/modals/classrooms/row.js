import React, { View, Text, Component, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../../../global/colors'

export default class Row extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const place = this.props.place
    const enabled = place.hasPosition

    const element = (
      <View style={styles.container}>

        <Text style={[styles.title, { color: (enabled) ? 'black' : 'grey' }]}>
          {place.shortName || place.name}
        </Text>

        <Text style={[styles.detail, { color: (enabled) ? 'black' : 'grey' }]}>
          Piso: {(place.location && place.location.floor) ? place.location.floor : '?'}
        </Text>

        <Icon name="chevron-right" style={styles.disclosure} />

      </View>
    )

    if (enabled) {
      return (
        <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor={Colors.CONTRAST}>
          {element}
        </TouchableHighlight>
      )
    }
    return element
  }

  onPress() {
    if (this.props.onSelection) this.props.onSelection(this.props.place)
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  title: {
    fontWeight: 'bold'
  },
  detail: {
    fontSize: 12,
    fontWeight: '100'
  },
  disclosure: {
    position: 'absolute',
    width: 10,
    height: 10,
    right: 10,
    top: 10,
    color: Colors.MAIN,
  },
})
