import React, { View, Text, TextInput, Component, StyleSheet, ListView, ToolbarAndroid, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import SearchBar from 'react-native-search-bar'
import Fulltextsearchlight from 'full-text-search-light'

import Colors from '../../global/colors'
import { Entity, fetchChilds } from '../../models'

import PlacesList from '../places-list'


export default class SearchView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: this.props.query || '',
      area: this.props.area,
      store: new Map(),
      data: [],
      found: this.props.found || [],
      engine: new Fulltextsearchlight(),
    }
    this.state.store.set(this.state.area._id, this.state.area)
    this.fetch().done()
  }

  fetch() {
    return fetchChilds(this.props.area, ...['classroom', 'faculty', 'building', 'lab']).then(places => {
      const data = places.map(place => {
        const entity = {
          place: place,
          keyword: place.shortName || place.name,
        }
        this.state.store.set(place._id, place)
        this.state.engine.add(entity.keyword)
        return entity
      })
      places.forEach(place => {
        place.ancestors = (place.ancestors || []).map(id => this.state.store.get(id))
      })
      return this.setState({ data: data })
    })
  }

  placeholder(area) {
    return area ? `Sala, edificio o campus en ${area.shortName || area.name}` : 'Sala, edificio o campus'
  }

  render() {
    const places = this.state.query.length ? this.state.found : this.state.data.map(d => d.place)
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.container}>
          <SearchBar
            style={styles.searchBar}
            ref='searchBar'
            tintColor={Colors.MAIN}
            hideBackground={false}
            placeholder={this.placeholder(this.state.area)}
            onChangeText={this.onChangeText.bind(this)}
            onSearchButtonPress={this.onInput.bind(this)}
            />

          <PlacesList places={places} onSelection={this.onSelection.bind(this)}/>

        </View>
      )
    } else {
      const icon = require('../toolbar/img/back.png')
      return (
        <View style={{ flex: 1 }}>
          <ToolbarAndroid
            style={styles.toolbar}
            titleColor="white"
            navIcon={icon}
            onIconClicked={() => Actions.pop()}
            >

            <TextInput
              style={{ height: 56, fontSize: 15 }}
              autoCorrect={false}
              autoFocus={true}
              onChangeText={this.onChangeText.bind(this)}
              onSubmitEditing={this.onInput.bind(this)}
              underlineColorAndroid={Colors.COMPLEMENT}
              color="white"
              defaultValue={this.state.query}
              placeholder={this.placeholder(this.state.area)}
              placeholderTextColor="white"
              />

          </ToolbarAndroid>

          <PlacesList places={places} onSelection={this.onSelection.bind(this)}/>

        </View>
      )
    }
  }

  close(query, ...places) {
    Actions.pop()
    this.props.searchEventEmitter.emit('results', {
      found: places,
      query: query,
    })
  }

  onChangeText(text) {
    const prediction = this.state.engine.search(text)
    this.setState({
      query: text,
      found: this.state.data.filter(e => prediction.indexOf(e.keyword) > 0).map(e => e.place),
    })
  }

  onInput(text) {
    this.close(this.state.query, ...this.state.found)
  }

  onSelection(place) {
    this.close(this.state.query, place)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  searchBar: {
    height: 44,
  },
  toolbar: {
    height: 56,
    // elevation: 20, // FIXME: Not working
    backgroundColor: Colors.MAIN,
  },
})
