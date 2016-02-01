import React, { StyleSheet, ToolbarAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../../global/colors'


export default function Toolbar(props) {
  const icon = props.backButton ? require('./img/back.png') : require('./img/logo.png')
  return (
    <ToolbarAndroid
      style={styles.toolbar}
      titleColor="white"
      navIcon={icon}
      actions={[
        {title: 'Buscar', show: 'always'},
      ]}
      onIconClicked={() => props.backButton ? Actions.pop() : undefined}
      onActionSelected={(position) => Actions.search()}
      {...props} />
  )
}

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    // elevation: 20, // FIXME: Not working
    backgroundColor: Colors.MAIN,
  },
})
