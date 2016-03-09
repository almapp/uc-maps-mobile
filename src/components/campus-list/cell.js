import React, { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


export default function Cell({ campus, ...props}) {
  return (
    <TouchableHighlight style={[styles.container, props.style]} onPress={() => props.onPress && props.onPress(campus)} underlayColor="rgba(0,0,0,0.8)">
      <Image style={[styles.content, styles.image]} source={{uri: getCampusImage(campus)}}>
        <View style={styles.overlay}>
          <Text numberOfLines={2} style={[styles.text, styles.name]}>{campus.name}</Text>
          <Text numberOfLines={2} style={[styles.text, styles.address]}>{campus.address}</Text>
          <Icon name="chevron-right" style={styles.disclosure} />
        </View>
      </Image>
    </TouchableHighlight>
  )
}

function getCampusImage(campus) {
  return `https://almapp.github.io/uc-maps-assets/images/campuses/${campus.identifier}.jpg`
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  content: {
    flex: 1,
  },
  image: {

  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text: {
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
  },
  name: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 'bold',
  },
  address: {
    fontWeight: '100',
    fontSize: 12,
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
