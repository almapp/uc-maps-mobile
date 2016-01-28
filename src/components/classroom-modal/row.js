import React, { View, Text, Component, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../../global/colors'

export default class Row extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const place = this.props.place
    if (place.location && place.location.floor) {
      var floor = <Text style={styles.detail}>Piso {place.location.floor}</Text>
    }
    return (
      <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor={Colors.CONTRAST}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {place.shortName || place.name}
          </Text>
          {floor}
          <Icon name="chevron-right" style={styles.disclosure} />
        </View>
      </TouchableHighlight>
    )
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
