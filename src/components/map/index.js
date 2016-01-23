import React, { StyleSheet, Text, View, Component, Dimensions, Platform, StatusBarIOS } from 'react-native'

import MapView from 'react-native-maps'
import Tabs from 'react-native-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux'

import CampusMarker from './markers/campus'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0091;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DEFAULT_REGION = {
  longitudeDelta: 0.09766039646630986,
  latitude: -33.45093681992992,
  longitude: -70.61507084839033,
  latitudeDelta: 0.139540891650725,
}

export default class MapsView extends Component {
  constructor(props) {
    super(props)

    if (Platform.OS === 'ios') {
      StatusBarIOS.setStyle('light-content', true)
    }

    const place = this.props.campus.center
    this.state = {
      initialRegion: {
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA,
        longitude: place.coordinates[0],
        latitude: place.coordinates[1],
      },
      campus: this.props.campus,
    }

  }

  render() {
    return (
      <View style={styles.container}>

        <MapView
            ref="maps"
            style={styles.maps}
            initialRegion={this.state.initialRegion}
            region={this.state.region}
            mapType="hybrid"
            showsCompass={true}
            showsPointsOfInterest={false}
            showsTraffic={false}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >

        </MapView>
        <View style={styles.header}>
          <Icon.Button borderRadius={0} name="chevron-left" style={styles.backButton} onPress={this.goBack} />
          <View>
            <Text style={styles.search}>
              Búsqueda
            </Text>
          </View>
        </View>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" >
            <Icon name="android-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" >
            <Icon name="android-notifications-none" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" >
            <Icon name="android-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>
    )
  }

  goBack() {
    Actions.pop()
  }

  goTo(coordinates) {
    this.refs.map.animateToRegion(coordinates)
  }

  onSelect() {
    // this.goTo(this.state.campus.location.coordinates[0][0])
  }

  onRegionChangeComplete(region) {
    console.log(region)
  }
}

const margin = 10

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    right: margin,
    height: 46,
    top: 20 + margin,
    left: margin,
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
  maps: {
    flex: 1,
  },
  backButton: {
    // textAlign: 'center', is not working
    paddingLeft: 15,
    height: 46,
    width: 46,
    borderRadius: 0,
  },
  search: {
    marginLeft: 8,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})
