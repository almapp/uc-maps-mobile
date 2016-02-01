import React, { StyleSheet, ToolbarAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'

import Colors from '../../global/colors'


export default function Toolbar(props) {
  return (
    <ToolbarAndroid
      style={styles.toolbar}
      title={`  ${props.title}`}
      titleColor="white"
      logo={require('./img/logo.png')}
      actions={[
        {title: 'Buscar', show: 'always'},
      ]}
      onActionSelected={(position) => Actions.search()} />
  )
}

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    // elevation: 20, // FIXME: Not working
    backgroundColor: Colors.MAIN,
  },
})
