import React, { View, Text, Component, StyleSheet, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Parallax from 'react-native-parallax'
import Icon from 'react-native-vector-icons/Ionicons'

import Cell from './cell'
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
            <Cell key={i} campus={campus} image={this.getImage(campus)} onCampusSelect={this.selectCampus.bind(this, campus)}/>
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
