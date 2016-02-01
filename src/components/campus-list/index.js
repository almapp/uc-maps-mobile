import React, { View, Text, Component, StyleSheet, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Parallax from 'react-native-parallax'
import Icon from 'react-native-vector-icons/Ionicons'

import { fetchCampuses } from '../../models'

export default class CampusList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      campuses: [],
    }
    this.fetch();
  }

  fetch() {
    return fetchCampuses()
      .then(campuses => this.setState({ campuses: campuses }))
  }

  getImage(campus) {
    return `https://almapp.github.io/uc-maps-assets/images/campuses/${campus.identifier}.jpg`
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Parallax.ScrollView style={styles.scrollView}>

          {this.state.campuses.map((campus, i) => (
            <Parallax.Image
              key={i}
              onPress={this.selectCampus.bind(this, campus)}
              style={cellStyles.image}
              overlayStyle={cellStyles.overlay}
              source={{uri: this.getImage(campus)}}>

              <Text numberOfLines={2} style={cellStyles.name}>{campus.name}</Text>
              <Text numberOfLines={2} style={cellStyles.address}>{campus.address}</Text>
              <Icon name="chevron-right" style={cellStyles.disclosure} />

            </Parallax.Image>
          ))}

        </Parallax.ScrollView>
      </View>
    )
  }

  selectCampus(campus, element) {
    Actions.maps({ campus: campus })
  }
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

const cellStyles = StyleSheet.create({
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    // marginBottom: 5,
  },
})
