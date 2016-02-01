import React, { Text, StyleSheet } from 'react-native'
import Parallax from 'react-native-parallax'
import Icon from 'react-native-vector-icons/Ionicons'


export default function Cell(props) {
  const campus = props.campus
  return (
    <Parallax.Image
      onPress={props.onCampusSelect}
      style={styles.image}
      overlayStyle={styles.overlay}
      source={{uri: props.image}}>

      <Text numberOfLines={2} style={styles.name}>{campus.name}</Text>
      <Text numberOfLines={2} style={styles.address}>{campus.address}</Text>
      <Icon name="chevron-right" style={styles.disclosure} />

    </Parallax.Image>
  )
}

const text = {
  color: 'white',
  textAlign: 'center',
  marginLeft: 25,
  marginRight: 25,
  marginBottom: 2,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 1,
  shadowColor: 'black',
  shadowOpacity: 0.8,
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    // marginTop: 5,
    // marginLeft: 5,
    // marginRight: 5,
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  name: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 'bold',
    ...text,
  },
  address: {
    fontWeight: '100',
    fontSize: 12,
    ...text,
  },
  disclosure: {
    position: 'absolute',
    width: 10,
    height: 10,
    right: 10,
    top: (100 / 2) - (10 / 2),
    color: 'white',
  },
})
