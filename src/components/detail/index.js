import React, { View, Text, Component, StyleSheet } from 'react-native'
import {Actions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'

import { fetchChilds } from '../../models'

export default class DetailView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
