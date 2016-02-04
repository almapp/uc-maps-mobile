import React, { View, Text, Component, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../../global/colors'


export default class ModalCell extends Component {

  static get defaultProps() {
    return { enabled: true }
  }

  render() {
    const enabled = this.props.enabled
    const element = this.element(this.props.title, this.props.subtitle, enabled)

    if (enabled && this.props.onSelection) {
      return (
        <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor={Colors.CONTRAST}>
          {element}
        </TouchableHighlight>
      )
    } else {
      return element
    }
  }

  element(title, subtitle, enabled = true) {
    const touchable = { color: (enabled) ? 'black' : 'grey' }
    return (
      <View style={[styles.container, this.props.style]}>

        <Text style={[styles.title, touchable]} numberOfLines={2}>
          {title}
        </Text>

        <Text style={[styles.detail, touchable]} numberOfLines={2}>
          {subtitle}
        </Text>

        <Icon name="chevron-right" style={styles.disclosure} />

      </View>
    )
  }

  onPress() {
    if (this.props.onSelection) this.props.onSelection()
  }
}

const disclosure = {
  position: 'absolute',
  width: 11,
  height: 11,
  right: 10,
  top: 10,
  color: Colors.MAIN,
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  title: {
    fontWeight: 'bold',
    marginRight: disclosure.right + disclosure.width + 10,
  },
  detail: {
    fontSize: 12,
    fontWeight: '100',
    marginRight: disclosure.right + disclosure.width + 10,
  },
  disclosure: disclosure,
})
