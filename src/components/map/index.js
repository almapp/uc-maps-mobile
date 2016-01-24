import React, { StyleSheet, Text, View, Component, Dimensions, Platform, StatusBarIOS } from 'react-native'

import MapView from 'react-native-maps'
import Tabs from 'react-native-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper'
import Button from 'react-native-button'
import { RadioButtons } from 'react-native-radio-buttons'
import { Actions } from 'react-native-router-flux'

import CampusMarker from './markers/campus'
import { fetchFaculties, fetchBuildings } from '../../models'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0091;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const FLAT_SAND = 'rgba(235, 216, 159, 0.6)'
const FLAT_BLUE = 'rgba(49, 130, 217, 0.6)'
const FLAT_PURPLE = 'rgba(71, 47, 151, 1.0)'

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
      sectors: [],
      selected: 0,
    }
    this.fetch()
  }

  fetch() {
    return Promise.all([
      fetchFaculties(this.props.campus),
      fetchBuildings(this.props.campus),
    ])
    .then(results => results[0].concat(results[1]))
    .then(sectors => this.setState({ sectors: sectors, selected: 0 }))
  }

  render() {
    const swipers = this.state.sectors ? (
      <Swiper ref="swiper" style={styles.swiper} height={85} index={this.state.selected} showsButtons={true} showsPagination={false} onMomentumScrollEnd={this.selectSelector.bind(this)}>
        {this.state.sectors.map((sector, i) => (
          <View key={i} style={styles.slide}>
            <Text style={styles.footerTitle} numberOfLines={2}>{sector.shortName}</Text>
            <Text style={styles.footerSubTitle}>a 10 minutos</Text>
          </View>
        ))}
      </Swiper>
    ) : null

    const polygons = []
    this.state.sectors.forEach((sector, i) => {
      const polygon = sector.polygon
      if (polygon) {
        polygons.push((<MapView.Polygon
          key={i}
          coordinates={polygon}
          fillColor={this.state.selected === i ? FLAT_SAND : FLAT_SAND}
          strokeColor="rgba(0,0,0,0.5"
          strokeWidth={1}
          />))
      }
    })

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

          {polygons}

        </MapView>
        <View style={styles.header}>
          <Icon.Button borderRadius={0} name="chevron-left" style={styles.backButton} onPress={this.goBack} />
          <View>
            <Text style={styles.search}>
              Búsqueda
            </Text>
          </View>
        </View>

        <View style={styles.tabView}>
          <Tabs selected="second" style={styles.tabs} iconStyle={{ height: TAB_HEIGHT }}>
            {['man', 'woman', 'fork', 'trash-a', 'card', 'printer', 'ios-bookmarks', 'android-bicycle'].map((icon, i) => (
              <Icon key={i} color="white" size={25} name={icon} style={styles.tab} />
            ))}
          </Tabs>
        </View>

        <View style={styles.footer}>
          {swipers}
        </View>

        <View style={styles.selector}>
          <Button style={styles.details}>Detalles</Button>
          <Button style={styles.classrooms}>Ver Salas</Button>
        </View>

      </View>
    )
  }

  goBack() {
    Actions.pop()
  }

  goTo(coordinates) {
    this.refs.maps.animateToRegion(coordinates)
  }

  // GeoJSON point
  goToPoint(point) {
    this.goTo({
      latitude: point.coordinates[1] ||  this.state.initialRegion.latitude,
      longitude: point.coordinates[0] || this.state.initialRegion.longitude,
    })
  }

  scrollTo(index) {
    this.refs.swiper.scrollTo(index)
  }

  onSelect() {
    // this.goTo(this.state.campus.location.coordinates[0][0])
  }

  selectSelector(e, state, context) {
    const center = this.state.sectors[state.index].center
    if (center) {
      this.goToPoint(center)
    }
    // this.setState({ selected: state.index })
  }

  onRegionChangeComplete(region) {
    console.log(region)
  }
}

const margin = 10
const TAB_HEIGHT = 39

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    right: margin,
    height: 44,
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
  tabView: {
    // backgroundColor: 'rgba(49, 130, 217, 1.0)', //'rgba(0,0,0,0)',
    backgroundColor: 'rgba(39, 105, 176, 1.0)', //'rgba(0,0,0,0)',
    height: TAB_HEIGHT,
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 125,
    // shadowOffset: {
    //   width: 0,
    //   height: -5,
    // },
    // shadowRadius: 2,
    // shadowColor: 'black',
    // shadowOpacity: 0.8,
  },
  tabs: {
    // backgroundColor: 'rgba(49, 130, 217, 1.0)', //'rgba(0,0,0,0)',
    backgroundColor: 'rgba(39, 105, 176, 1.0)', //'rgba(0,0,0,0)',
    height: TAB_HEIGHT,
    paddingBottom: 1,
  },
  tab: {
    // backgroundColor: FLAT_PURPLE, //'rgba(0,0,0,0)',
  },
  maps: {
    flex: 1,
  },
  backButton: {
    // textAlign: 'center', is not working
    paddingLeft: 15,
    height: 44,
    width: 44,
    borderRadius: 0,
  },
  search: {
    marginLeft: 8,
  },
  footer: {
    backgroundColor: 'white',
    height: 85,
    alignSelf: 'flex-end',
    shadowOffset: {
      width: 0,
      height: -3,
      // height: -(TAB_HEIGHT + 5),
    },
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  swiper: {

  },
  slide: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  footerTitle: {
    fontSize: 19,
    fontWeight: '500',
    marginLeft: 40,
    marginTop: 10,
    marginRight: 40,
  },
  footerSubTitle: {
    marginLeft: 40,
    marginTop: 3,
    fontWeight: '200',
  },
  footerAction: {
    position: 'absolute',
    bottom: 8,
    right: 40,
    width: 100,
    height: 22,
  },
  selector: {
    // backgroundColor: 'red',
    height: 30,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  details: {
    paddingLeft: 25,
  },
  classrooms: {
    paddingRight: 25,
  },
})
