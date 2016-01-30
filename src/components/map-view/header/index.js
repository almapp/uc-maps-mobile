import React, { StyleSheet, Text, View, Component, Dimensions, Platform, StatusBarIOS } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Button from 'react-native-button'

import Colors from '../../../global/colors'


export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Icon.Button borderRadius={0} name="chevron-left" style={styles.button} iconStyle={styles.icon} onPress={this.props.onBackButton} />
        <View>
          <Text style={styles.search}>
            Búsqueda
          </Text>
        </View>
      </View>
    )
  }
}

const margin = 10

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    height: 44,
    width: 60,
    backgroundColor: Colors.MAIN,
    borderRadius: 0,
  },
  icon: {
    textAlign: 'center',
    paddingLeft: 15,
  },
  search: {
    marginLeft: 8,
  },
})
