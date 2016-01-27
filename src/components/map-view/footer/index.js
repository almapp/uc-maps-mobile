import React, { StyleSheet, Text, View, Component } from 'react-native'
import Swiper from 'react-native-swiper'
import Button from 'react-native-button'
import Tabs from 'react-native-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../../../global/colors'

const HEIGHT = 85;
const TAB_HEIGHT = 39

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }

  static get defaultProps() {
    return {
      areas: [],
      tabs: [{ icon: 'load-a' }],
    }
  }

  render() {
    return (
      <View style={styles.view.container}>

        <View style={styles.tabView.container}>
          <Tabs onSelect={this.selectService.bind(this)} style={styles.tabView.tabs} iconStyle={{ height: TAB_HEIGHT }}>
            {this.props.tabs.map((tab, i) => (
              <Icon key={i} color={tab.color || "white"} size={25} index={i} name={tab.icon} style={styles.tabView.tab} />
            ))}
          </Tabs>
        </View>

        <Swiper ref="swiper" style={styles.swiper.container} height={HEIGHT} showsButtons={true} showsPagination={false} onMomentumScrollEnd={this.selectArea.bind(this)}>
          {this.props.areas.map((area, i) => (
            <View key={i} style={styles.swiper.slide}>
              <Text style={styles.swiper.title} numberOfLines={2}>{area.shortName}</Text>
              <Text style={styles.swiper.detail}>a 10 minutos</Text>
            </View>
          ))}
        </Swiper>

        <View style={styles.selector.container}>
          <Button style={styles.selector.details} onPress={this.showDetails.bind(this)}>Detalles</Button>
          <Button style={styles.selector.classrooms} onPress={this.showClassrooms.bind(this)}>Ver Salas</Button>
        </View>

    </View>
    )
  }

  showDetails() {
    // TODO: get index
    const index = 0
    if (this.props.onShowDetails) this.props.onShowDetails(this.props.areas[index])
  }

  showClassrooms() {
    // TODO: get index
    const index = 0
    if (this.props.onShowClassrooms) this.props.onShowClassrooms(this.props.areas[index])
  }

  selectArea(e, state, context) {
    const index = state.index
    if (this.props.onAreaSelection) this.props.onAreaSelection(this.props.areas[index])
  }

  selectService(element) {
    const index = element.props.index
    if (this.props.onServiceSelection) this.props.onServiceSelection(this.props.tabs[index])
    return { style: { color: 'transparent' } } // ?
  }
}

const styles = {
  view: StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: 'white',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowRadius: 1,
      shadowColor: 'black',
      shadowOpacity: 0.7,
    },
  }),

  tabView: StyleSheet.create({
    container: {
      backgroundColor: Colors.MAIN,
      height: TAB_HEIGHT,

    },
    tabs: {
      backgroundColor: Colors.MAIN,
      height: TAB_HEIGHT,
      paddingBottom: 1,
    },
    tab: {
      // backgroundColor: Colors.MAIN, //'rgba(0,0,0,0)',
    },
  }),

  swiper: StyleSheet.create({
    container: {
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowRadius: 1,
      shadowColor: 'black',
      shadowOpacity: 0.9,
    },
    slide: {
      flex: 1,
      backgroundColor: 'white',
    },
    title: {
      fontSize: 19,
      fontWeight: '500',
      marginLeft: 40,
      marginTop: 10,
      marginRight: 40,
    },
    detail: {
      marginLeft: 40,
      marginTop: 3,
      fontWeight: '200',
    },
  }),

  selector: StyleSheet.create({
    container: {
      height: 30,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
      justifyContent: 'space-around',
    },
    details: {
      color: Colors.COMPLEMENT,
      // paddingLeft: 25,
    },
    classrooms: {
      color: Colors.COMPLEMENT,
      // paddingLeft: 25,
    },
  }),
}
