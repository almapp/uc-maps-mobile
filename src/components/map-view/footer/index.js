import React, { StyleSheet, Text, View, Component, TouchableHighlight } from 'react-native'
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
      buttons: [],
    }
  }

  get datasource() {
    return new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1.identifier !== p2.identifier })
  }

  componentWillReceiveProps(nextProps) {
    const number = Number(nextProps.selected)
    if (number && this.state.selected !== number) {
      this.setState({ selected: number })
      // this.goToPage(number)
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
          onChangePage={this.onAreaSelection.bind(this)}
          autoPlay={false}/>

        {this.renderButton('left')}
        {this.renderButton('right')}

      </View>
    )
  }

  renderButton(direction = 'left') {
    return (
      <TouchableHighlight
        style={[styles.slide.arrow, { [direction]: 0 }]}
        underlayColor="transparent"
        onPress={this.moveToDirection.bind(this, direction)}
        >
        <Icon
          name={`arrow-${direction}-b`}
          size={24}
          color={Colors.MAIN}
          backgroundColor="transparent"
          />
      </TouchableHighlight>
    )
  }

  renderPage(area, page) {
    return (
      <View style={styles.slide.container}>

        <Text style={styles.slide.title} numberOfLines={2}>{area.name || area.shortName}</Text>
        <Text style={styles.slide.detail}>a 10 minutos</Text>

        <View style={styles.slide.selector}>
          {this.props.buttons.map((text, i) => (
            <Button key={i} style={styles.slide.button} onPress={this.onButtonPress.bind(this, page, i)}>
              {text}
            </Button>
          ))}
        </View>

      </View>
    )
  }

  moveToDirection(direction) {
    const current = this.state.selected
    const next = current + (direction === 'left' ? -1 : 1)
    if (next >= 0 && next < this.props.areas.length) {
      this.setState({ selected: next })
      this.goToPage(next)
    }
  }

  goToArea(area) {
    this.goToPage(this.props.areas.map(a => a.id).indexOf(area.id))
  }

  goToPage(index) {
    return this.refs.pager.goToPage(index)
  }

  onButtonPress(page, button) {
    if (this.props.onButtonPress) this.props.onButtonPress(this.props.areas[page], button)
  }

  onAreaSelection(index) {
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
    arrow: {
      width: SIDE_MARGIN,
      height: SIDE_MARGIN,
      position: 'absolute',
      top: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
  }),
}
