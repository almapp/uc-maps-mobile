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
      loop: false,
    }
  }

  get datasource() {
    return new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1.identifier !== p2.identifier })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.goToPage(nextProps.selected)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.areas && nextProps.areas.length !== this.props.areas.length
  }

  render() {
    return (
      <View style={[styles.view.container, this.props.style]}>
        <ViewPager
          ref="pager"
          style={styles.swiper.container}
          dataSource={this.datasource.cloneWithPages(this.props.areas)}
          renderPage={this.renderPage.bind(this)}
          isLoop={this.props.loop}
          onChangePage={this.selectArea.bind(this)}
          autoPlay={false}/>
      </View>
    )
  }

  renderPage(area, page) {
    return (
      <View style={styles.slide.container}>

        <Text style={styles.slide.title} numberOfLines={2}>{area.name || area.shortName}</Text>
        <Text style={styles.slide.detail}>a 10 minutos</Text>

        <View style={styles.slide.selector}>
          <Button style={styles.slide.button} onPress={this.showDetails.bind(this, page)}>Detalles</Button>
          <Button style={styles.slide.button} onPress={this.showClassrooms.bind(this, page)}>Salas</Button>
          <Button style={styles.slide.button} onPress={this.showServices.bind(this, page)}>Servicios</Button>
        </View>
      </View>
    )
  }

  goToArea(area) {
    this.goToPage(this.props.areas.map(a => a.id).indexOf(area.id))
  }

  goToPage(index) {
    return this.refs.pager.goToPage(index)
  }

  showDetails(index) {
    if (this.props.onShowDetails) this.props.onShowDetails(this.props.areas[index])
  }

  showClassrooms(index) {
    if (this.props.onShowClassrooms) this.props.onShowClassrooms(this.props.areas[index])
  }

  showServices(index) {
    if (this.props.onShowServices) this.props.onShowServices(this.props.areas[index])
  }

  selectArea(index) {
    this.setState({ selected: index })
    if (this.props.onAreaSelection) this.props.onAreaSelection(this.props.areas[index])
  }
}

const SIDE_MARGIN = 40
const HEIGHT = 140

const styles = {
  view: StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingBottom: 7,
    },
  }),

  swiper: StyleSheet.create({
    container: {
      height: HEIGHT,
    },
  }),

  slide: StyleSheet.create({
    container: {
      flex: 1,
      height: HEIGHT,
      paddingTop: 12,
      paddingRight: SIDE_MARGIN,
      paddingBottom: 30,
      paddingLeft: SIDE_MARGIN,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 19,
      fontWeight: '500',
    },
    detail: {
      flex: 1,
      marginTop: 3,
      fontWeight: '200',
    },
    selector: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 14,
      justifyContent: 'space-between',
    },
    button: {
      color: Colors.COMPLEMENT,
    },
  }),
}
