import gju from 'geojson-utils'

import { URL } from './settings'

export class Entity {
  get center() {
    switch (this.location.type) {
      case 'Point': return this.location
      case 'Polygon': return gju.centroid(this.location)
      default: return null
    }
  }

  get polygon() {
    if (this.location.type !== 'Polygon') return null
    if (this.location.coordinates.length < 1) return null

    const coordinates = this.location.coordinates[0]
    return coordinates.map(coord => {
      return {
        latitude: coord[1],
        longitude: coord[0],
      }
    })
  }

  static fromJSON(json) {
    // TODO: improve
    const entity = new Entity()
    entity["_id"] = json["_id"]
    entity["identifier"] = json["identifier"]
    entity["campus"] = json["campus"]
    entity["name"] = json["name"]
    entity["shortName"] = json["shortName"]
    entity["address"] = json["address"]
    entity["location"] = json["location"]
    entity["information"] = json["information"]
    entity["parent"] = json["parent"]
    entity["categories"] = json["categories"]
    entity["ancestors"] = json["ancestors"]
    entity["contact"] = json["contact"]
    return entity
  }
}

export function fetchCampuses() {
  return fetch(`${URL}/places?categories[]=campus`)
    .then(response => response.json())
    .then(jsons => jsons.map(Entity.fromJSON))
}

export function fetchFacultiesAndBuildings(campus) {
  return fetchChilds(campus, ...["faculty", "building", "school", "department"])
}

export function fetchChilds(place, ...categories) {
  return fetch(`${URL}/places/${place._id}/childs?${categories.map(cat => 'categories[]=' + cat).join('&')}`)
    .then(response => response.json())
    .then(jsons => jsons.map(Entity.fromJSON))
}
