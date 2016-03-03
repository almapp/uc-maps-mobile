import qs from 'qs'
import { PlacesParser } from './parser'

const URL = 'http://uc-maps.lopezjuri.com/api/v1'

export const PlacesFetcher = {
  places: function(path, query = {}) {
    return fetch(`${URL}/${path}?${qs.stringify(query, { encode: false })}`)
      .then(response => response.json())
      .then(json => PlacesParser.fromJSON(...json))
  },
  childs: function(place, query) {
    const path = place ? `places/${place.id}/childs` : 'places'
    return this.places(path, query)
  },
  all: function() {
    return this.places('places')
  },
  campuses: function() {
    return this.places('places', { categories : ['campus'] })
  },
  classrooms: function(place) {
    return this.childs(place, { categories: ['classroom', 'lab', 'auditorium'] })
  },
}
