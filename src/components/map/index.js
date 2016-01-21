import React, { StyleSheet, Text, View, Component } from 'react-native'

import MapView from 'react-native-maps'
import Tabs from 'react-native-tabs'

export default class MapsView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType="hybrid"
          showsUserLocation={true}
          showsCompass={true}
          initialRegion={{
            latitude: -33.498116,
            longitude: -70.611511,
            latitudeDelta: 0.0110,
            longitudeDelta: 0.0110,
          }}
        />
        <Tabs selected="second" style={{backgroundColor:'white'}}>
          <Text name="1">Edificios</Text>
          <Text name="2">Facultades</Text>
          <Text name="3">Salas</Text>
          <Text name="4">Servicios</Text>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
})
