import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0091
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export function parse(json) {
  if (json && json.coordinates && json.coordinates.length) {
    return {
      latitude: json.coordinates[1],
      longitude: json.coordinates[0],
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA,
    }
  }
  return null
}
