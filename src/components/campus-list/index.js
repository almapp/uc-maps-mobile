import React, {View, Text, Component, StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Parallax from 'react-native-parallax'
import Icon from 'react-native-vector-icons/Ionicons'

import Campus from '../../models/campus'

export default class CampusList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campuses: [],
    }
    this.fetchCampuses();
  }

  fetchCampuses() {
    return Campus.all()
    .then(campuses => this.setState({ campuses: campuses }))
    .done()
  }

  getImage(campus) {
    return `https://almapp.github.io/uc-maps-assets/images/campuses/${campus.identifier}.jpg`
  }

  render() {
    return (
      <View style={styles.container}>
        <Parallax.ScrollView style={styles.scrollView}>

          <View style={{height: 64}}></View>

          {this.state.campuses.map((campus, i) => (
            <Parallax.Image
              key={i}
              onPress={this.selectCampus.bind(this, campus)}
              style={cellStyles.image}
              overlayStyle={cellStyles.overlay}
              source={{uri: this.getImage(campus)}}>

              <Text numberOfLines={1} style={cellStyles.name}>{campus.name}</Text>
              <Text numberOfLines={1} style={cellStyles.address}>{campus.address}</Text>
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

const cellStyles = StyleSheet.create({
  image: {
    height: 100,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  name: {
    fontSize: 20,
    marginLeft: 7,
    marginRight: 7,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
  address: {
    color: 'white',
    fontWeight: '100',
    fontSize: 12,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 7,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
  disclosure: {
    position: 'absolute',
    width: 10,
    height: 10,
    right: 10,
    bottom: 29,
    color: 'white',
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    marginBottom: 5,
  },
})
