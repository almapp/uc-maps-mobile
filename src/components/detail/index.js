import React, { View, Text, Component, StyleSheet, Platform } from 'react-native'
import {Actions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'

import Toolbar from '../toolbar'
import Colors from '../../global/colors'
import { fetchChilds } from '../../models'

export default class DetailView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const toolbar = (Platform.OS !== 'ios') ? <Toolbar backButton title="Detalle" actions={[]} /> : undefined
    return (
      <View style={[styles.container, this.props.style]}>
        {toolbar}
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
