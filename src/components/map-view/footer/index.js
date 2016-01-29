import React, { StyleSheet, Text, View, Component } from 'react-native'
import ViewPager from 'react-native-viewpager'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../../../global/colors'


export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
    }
  }

  static get defaultProps() {
    return {
      areas: [],
    }
  }

  get datasource() {
    return new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1.identifier !== p2.identifier })
  }

  render() {
    const datasource = this.datasource.cloneWithPages(this.props.areas)

    return (
      <View style={styles.view.container}>

        <ViewPager
          style={styles.swiper.container}
          dataSource={datasource}
          renderPage={this.renderPage.bind(this)}
          isLoop={true}
          onChangePage={this.selectArea.bind(this)}
          autoPlay={false}/>

    </View>
    )
  }

  renderPage(area, page) {
    return (
      <View style={styles.swiper.slide}>
        <View style={styles.swiper.texts}>
          <Text style={styles.swiper.title} numberOfLines={2}>{area.shortName}</Text>
          <Text style={styles.swiper.detail}>a 10 minutos</Text>
        </View>

        <View style={styles.swiper.selector}>
          <Button style={styles.swiper.button} onPress={this.showDetails.bind(this)}>Detalles</Button>
          <Button style={styles.swiper.button} onPress={this.showClassrooms.bind(this)}>Salas</Button>
          <Button style={styles.swiper.button} onPress={this.showServices.bind(this)}>Servicios</Button>
        </View>
      </View>
    )
  }

  showDetails() {
    const index = this.state.selected
    if (this.props.onShowDetails) this.props.onShowDetails(this.props.areas[index])
  }

  showClassrooms() {
    const index = this.state.selected
    if (this.props.onShowClassrooms) this.props.onShowClassrooms(this.props.areas[index])
  }

  showServices() {
    const index = this.state.selected
    if (this.props.onShowServices) this.props.onShowServices(this.props.areas[index])
  }

  selectArea(index) {
    this.setState({
      selected: index,
    })
    if (this.props.onAreaSelection) this.props.onAreaSelection(this.props.areas[index])
  }
}

const SIDE_MARGIN = 40

const styles = {
  view: StyleSheet.create({
    container: {
      paddingBottom: 4,
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

  swiper: StyleSheet.create({
    container: {
      height: 420,
    },
    slide: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
      justifyContent: 'space-between',
    },
    texts: {
      height: 75,
    },
    title: {
      fontSize: 19,
      fontWeight: '500',
      marginLeft: SIDE_MARGIN,
      marginTop: 12,
      marginRight: SIDE_MARGIN,
    },
    detail: {
      marginLeft: SIDE_MARGIN,
      marginTop: 3,
      fontWeight: '200',
    },
    selector: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
      marginTop: 13,
      marginLeft: SIDE_MARGIN,
      marginRight: SIDE_MARGIN,
      justifyContent: 'space-between',
    },
    button: {
      color: Colors.COMPLEMENT,
    },
  }),
}
