import React, { View, Text, Component, StyleSheet, TouchableHighlight, ListView, BackAndroid, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import renderIf from '../../util/render-if'

import Colors from '../../global/colors'


export default class BaseModal extends Component {

  constructor(props) {
    super(props)

    if (Platform.OS !== 'ios') {
      BackAndroid.addEventListener('hardwareBackPress', this.close)
    }
  }

  render() {
    const all = this.props.onAll ? this.allButton : undefined
    const close = this.props.onClose ? this.closeButton : undefined

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={[styles.content, styles.shadow]}>

          {this.props.children}

          <View style={styles.buttons}>
            {close}
            {all}
          </View>

        </View>
      </View>
    )
  }

  get allButton() {
    const style = {
      backgroundColor: Colors.MAIN,
      borderBottomLeftRadius: this.props.onClose ? 0 : radius,
      borderBottomRightRadius: radius,
    }
    return (
      <TouchableHighlight style={[styles.button, style]} onPress={this.props.onAll} underlayColor={Colors.DARK}>
        <Text style={styles.text}>Todas</Text>
      </TouchableHighlight>
    )
  }

  get closeButton() {
    const style = {
      backgroundColor: Colors.COMPLEMENT,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: this.props.onAll ? 0 : radius,
    }
    return (
      <TouchableHighlight style={[styles.button, style]} onPress={this.props.onClose} underlayColor={Colors.DARK}>
        <Text style={styles.text}>Cerrar</Text>
      </TouchableHighlight>
    )
  }

  close() {
    Actions.dismiss()
    return true
  }

  componentWillUnmount() {
    if (Platform.OS !== 'ios') {
      BackAndroid.removeEventListener('hardwareBackPress', this.close)
    }
  }
}

const radius = 15

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.7,
    elevation: 20,
  },
  content: {
    width: 250,
    height: 300,
    borderRadius: radius,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttons: {
    backgroundColor: 'white',
    width: 250,
    height: 40,
    flexDirection: 'row',
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})
