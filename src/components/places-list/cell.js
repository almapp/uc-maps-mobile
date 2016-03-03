import React, { View, Text, Component, StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import renderIf from '../../util/render-if'

import realm, { Place } from '../../realm'
import { PlacesFetcher } from '../../fetcher'
import * as R from '../../util/realm-patch'

import Colors from '../../global/colors'
import PlaceIcons from '../../global/icons'


export default class Cell extends Component {

  render() {
    const place = this.props.place
    const enabled = place.hasPosition
    const element = this.element(place, enabled)

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
    const style = { color: (enabled) ? 'black' : 'grey' }
    const location = place.location
    const annotation = (location && location.floor) ? <Text style={styles.annotation}> |  Piso {location.floor}</Text> : undefined
    const ancestors = place.ancestorsId.map(id => {
      return realm.objects('Place')
        .filtered('id = $0', id)
        .snapshot()[0]
    }).filter(Boolean)

    return (
      <View style={[styles.container, this.props.style]}>

        <Icon name={this.getIcon(ancestors)} size={25} style={styles.icon} />

        <Text style={[styles.title, style]}>
          {place.display} {annotation}
        </Text>

        <Text style={[styles.detail, style]}>
          {ancestors.map(place => place.display).join(' · ')}
        </Text>

        <Icon name="chevron-right" style={styles.disclosure} />
      </View>
    )
  }

  getIcon(ancestors) {
    const winner = ancestors.reverse().find(anc => anc && PlaceIcons[anc.identifier])
    return winner ? PlaceIcons[winner.identifier] : 'location'
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
