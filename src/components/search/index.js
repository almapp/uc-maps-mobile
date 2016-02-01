import React, { View, Text, Component, StyleSheet, Platform, StatusBarIOS } from 'react-native'
import { Actions } from 'react-native-router-flux'

import Toolbar from '../toolbar'
import Colors from '../../global/colors'
import { fetchChilds } from '../../models'

export default class SearchView extends Component {
  render() {
    const toolbar = (Platform.OS !== 'ios') ? <Toolbar backButton title="Buscar" actions={[]} /> : undefined
    return (
      <View style={styles.container}>
        {toolbar}
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
