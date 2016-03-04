import React, { View, Component, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Parallax from 'react-native-parallax'
import Icon from 'react-native-vector-icons/Ionicons'

import realm, { Place } from '../../realm'
import { PlacesFetcher } from '../../fetcher'
import * as R from '../../util/realm-patch'

import Cell from './cell'


export default class CampusList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      campuses: this.load(),
    }
    this.fetch().done()
  }

  load() {
    return realm.objects('Place').filtered('_categories CONTAINS "campus"').snapshot()
  }

  fetch() {
    return PlacesFetcher.campuses()
      .then(places => realm.write(() => {
        places.forEach(place => realm.create('Place', place, true))
      }))
      .then(() => this.setState({ campuses: this.load() }))
  }

  getCampusImage(campus) {
    return `https://almapp.github.io/uc-maps-assets/images/campuses/${campus.identifier}.jpg`
  }

  render() {
    const campuses = R.toArray(this.state.campuses)
    return (
      <View style={[styles.container, this.props.style]}>
        <Parallax.ScrollView style={styles.scrollView}>

          {campuses.map((campus, i) => (
            <Cell key={i} campus={campus} image={this.getCampusImage(campus)} onCampusSelect={this.selectCampus.bind(this, campus)}/>
          ))}

        </Parallax.ScrollView>
      </View>
    )
  }

  selectCampus(campus) {
    Actions.maps({ campus: campus })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    // marginBottom: 5,
  },
})
