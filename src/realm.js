import Realm from 'realm'
import gju from 'geojson-utils'

const ContactSchema = {
  name: 'Contact',
  properties: {
    urls: { type: 'string', default: '[]' },
    emails: { type: 'string', default: '[]' },
    phones: { type: 'string', default: '[]' },
  },
}

const LocationSchema = {
  name: 'Location',
  properties: {
    floor: { type: 'string', optional: true },
    type: { type: 'string', optional: true },
    point: { type: 'Point', optional: true },
    polygon: { type: 'Polygon', optional: true },
  },
}

const PolygonSchema = {
  name: 'Polygon',
  properties: {
    rings: { type: 'list', objectType: 'MultiPoint', default: [] },
  },
}

const MultiPointSchema = {
  name: 'MultiPoint',
  properties: {
    points: { type: 'list', objectType: 'Point', default: [] },
  },
}

const PointSchema = {
  name: 'Point',
  properties: {
    latitude: { type: 'double', optional: true },
    longitude: { type: 'double', optional: true },
  },
}

export class Place {

  get categories() {
    return this._categories ? JSON.parse(this._categories) : []
  }

  get ancestorsId() {
    return this._ancestorsId ? JSON.parse(this._ancestorsId) : []
  }

  get location() {
    return this._location ? JSON.parse(this._location) : null
  }

  get display() {
    return this.shortName || this.name || this.identifier
  }

  get center() {
    const location = this.location
    if (!location) return null
    switch (location.type) {
    case 'Point': return location
    case 'Polygon': return gju.centroid(location)
    default: return null
    }
  }

  get polygon() {
    if (this.location.type !== 'Polygon') return null
    if (this.location.coordinates.length < 1) return null
    return this.location.coordinates[0].map(coord => ({
      latitude: coord[1],
      longitude: coord[0],
    }))
  }

  static compare(a, b) {
    if (a.identifier < b.identifier) return -1
    else if (a.identifier > b.identifier) return 1
    else return 0
  }

  get hasPosition() {
    return this.location !== null
  }
}

Place.schema = {
  name: 'Place',
  primaryKey: 'id',
  properties: {
    id: 'string',
    identifier: 'string',
    name: 'string',
    shortName: { type: 'string', optional: true },
    address: { type: 'string', optional: true },
    information: { type: 'string', optional: true },
    // location: { type: 'Location', optional: true },
    parentId: { type: 'string', optional: true },
    _contact: { type: 'Contact', optional: true },
    _location: { type: 'string', optional: true },
    _categories: { type: 'string', default: '[]' },
    _ancestorsId: { type: 'string', default: '[]' },
  },
}

export default new Realm({
  schema: [
    Place,
    ContactSchema,
    // LocationSchema,
    // PolygonSchema,
    // MultiPointSchema,
    // PointSchema,
  ],
})
