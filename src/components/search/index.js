import React, { View, Text, TextInput, Component, StyleSheet, ToolbarAndroid, Platform, BackAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import SearchBar from 'react-native-search-bar'
import renderIf from '../../util/render-if'

import realm, { Place } from '../../realm'
import { PlacesFetcher } from '../../fetcher'
import * as R from '../../util/realm-patch'

import Colors from '../../global/colors'
import PlacesList from '../places-list'


export default class SearchView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: this.props.query,
      found: this.search(this.props.query),
    }

    if (Platform.OS !== 'ios') {
      BackAndroid.addEventListener('hardwareBackPress', this.close)
    }

    this.fetch().done()
  }

  static get defaultProps() {
    return {
      query: '',
      categories: [
        'campus',
        'faculty',
        'building',
        'other',
        'classroom',
        'auditorium',
        'bank',
        'computers',
        'printer',
        'photocopy',
        'library',
        'lab',
        'study',
        'food_lunch',
      ],
      sorted: ['parentId', 'identifier'],
      searchFields: ['name', 'shortName'],
    }
  }

  search(text) {
    let builder = realm.objects('Place')
    if (this.props.area) builder = builder.filtered('_ancestorsId CONTAINS $0', this.props.area.id)
    if (this.props.categories) builder = builder.filtered(this.props.categories.map(cat => `_categories CONTAINS "${cat}"`).join(' OR '))
    if (text) builder = builder.filtered(this.props.searchFields.map(prop => `${prop} CONTAINS "${text}"`).join(' OR '))
    if (this.props.sorted) builder = builder.sorted(this.props.sorted)
    return builder.snapshot()
  }

  fetch() {
    return PlacesFetcher.childs(this.props.area, { categories: this.props.categories })
      .then(places => realm.write(() => {
        InteractionManager.runAfterInteractions(() => {
          places.forEach(place => realm.create('Place', place, true))
          this.setState({ found: this.search(this.state.query) })
        })
      }))
      //.then(() => this.setState({ found: this.search(this.state.query) }))
  }

  placeholder(area) {
    return area ? `Sala, edificio o campus en ${area.display}` : 'Sala, edificio o campus'
  }

  render() {
    return (
      <View style={styles.container}>

        {renderIf(Platform.OS === 'ios')(
          <SearchBar
            style={styles.searchBar}
            ref='searchBar'
            tintColor={Colors.MAIN}
            hideBackground={false}
            placeholder={this.placeholder(this.props.area)}
            onChangeText={this.onChangeText.bind(this)}
            onSearchButtonPress={this.onInput.bind(this)}
            />
        )}

        {renderIf(Platform.OS !== 'ios')(
          <ToolbarAndroid
            style={styles.toolbar}
            titleColor="white"
            navIcon={require('../toolbar/img/back.png')}
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
              placeholder={this.placeholder(this.props.area)}
              placeholderTextColor="white"
              />
          </ToolbarAndroid>
        )}

        <PlacesList places={this.state.found} onSelection={this.onSelection.bind(this)}/>

      </View>
    )
  }

  close() {
    Actions.pop()
    return true
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.refs.searchBar.focus()
    }
  }

  componentWillUnmount() {
    if (Platform.OS !== 'ios') {
      BackAndroid.removeEventListener('hardwareBackPress', this.close)
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
    this.setState({ found: this.search(text) })
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
    paddingTop: Platform.OS === 'ios' ? 64 : 0,
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
