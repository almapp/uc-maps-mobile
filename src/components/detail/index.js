import React, { View, Text, Component, StyleSheet, Platform } from 'react-native'
import {Actions} from 'react-native-router-flux'
import renderIf from '../../util/render-if'
import Icon from 'react-native-vector-icons/Ionicons'

import Toolbar from '../toolbar'
import Colors from '../../global/colors'
import { fetchChilds } from '../../models'

export default class DetailView extends Component {

  render() {
    const place = this.props.place
    const toolbar = (Platform.OS !== 'ios') ? <Toolbar backButton title="Detalle" actions={[]} /> : undefined
    return (
      <View style={[styles.container, this.props.style]}>
        {toolbar}
        <Text>{place.display}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 0,
    backgroundColor: 'white',
  },
})
