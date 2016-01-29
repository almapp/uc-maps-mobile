import React, { View, Text, Component, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../../../global/colors'

export default class Row extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const service = this.props.service
    const enabled = (service.places.length > 0)

    const element = (
      <View style={styles.container}>

        <Text style={[styles.title, { color: (enabled) ? 'black' : 'grey' }]}>
          {service.title}
        </Text>

        <Text style={[styles.detail, { color: (enabled) ? 'black' : 'grey' }]}>
          Lugares: {service.places.length}
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
    if (this.props.onSelection) this.props.onSelection(this.props.service)
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
