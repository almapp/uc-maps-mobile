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
        <Icon.Button borderRadius={0} name="chevron-left" style={styles.button} onPress={this.props.onBackButton} />
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    // textAlign: 'center', is not working
    paddingLeft: 15,
    height: 44,
    width: 44,
    backgroundColor: Colors.MAIN,
    borderRadius: 0,
  },
  search: {
    marginLeft: 8,
  },
})
