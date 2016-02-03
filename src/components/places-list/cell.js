import React, { View, Text, Component, StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../../global/colors'
import PlaceIcons from './icons'


export default class Cell extends Component {

  render() {
    const place = this.props.place
    const enabled = this.props.place.hasPosition
    const element = this.element(this.props.place, enabled)

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

  element(place, enabled) {
    const touchable = { color: (enabled) ? 'black' : 'grey' }
    const detail = `${place.ancestors.map(a => a.display).join(' · ')}`
    const annotation = (place.location && place.location.floor) ? <Text style={styles.annotation}> |  Piso {place.location.floor}</Text> : undefined

    return (
      <View style={[styles.container, this.props.style]}>

        <Icon name={this.icon(place)} size={25} style={styles.icon} />

        <Text style={[styles.title, touchable]}>
          {place.name || place.shortName} {annotation}
        </Text>

        <Text style={[styles.detail, touchable]}>
          {detail}
        </Text>

        <Icon name="chevron-right" style={styles.disclosure} />
      </View>
    )
  }

  icon(place) {
    for (let ancestor of place.ancestors.reverse()) {
      const icon = PlaceIcons[ancestor.identifier]
      if (icon) return icon
    }
    return 'location'
  }

  onPress() {
    this.props.onSelection(this.props.place)
  }
}

const margin = 8
const disclosure = {
  position: 'absolute',
  width: 11,
  height: 11,
  right: 10,
  top: 10,
  color: Colors.MAIN,
}

const icon = {
  position: 'absolute',
  top: 3,
  left: 5,
  width: 30,
  height: 30,
  textAlign: 'center',
}

const styles = StyleSheet.create({
  container: {
    marginLeft: margin,
    marginRight: margin,
    marginTop: margin,
    marginBottom: margin,
  },
  icon: icon,
  title: {
    fontWeight: 'bold',
    marginLeft: icon.left + icon.width + 12,
    marginRight: disclosure.right + disclosure.width + 10,
  },
  annotation: {
    fontWeight: '100',
    color: 'grey',
  },
  detail: {
    fontSize: 12,
    fontWeight: '100',
    marginTop: 1,
    marginLeft: icon.left + icon.width + 12,
  },
  disclosure: disclosure,
})
