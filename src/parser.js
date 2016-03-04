export const PlacesParser = {
  fromJSON: function(...input) {
    return input.map(json => {
      const place = {
        id: json._id,
        identifier: json.identifier,
        name: json.name,
        shortName: json.shortName,
        address: json.address,
        information: json.information,
        parentId: json.parent,
        _ancestorsId: JSON.stringify(json.ancestors),
        _categories: JSON.stringify(json.categories),
        _location: JSON.stringify(json.location),
        _contact: {
          urls: json.contact && json.contact.urls ? JSON.stringify(json.contact.urls) : undefined,
          emails: json.contact && json.contact.emails ? JSON.stringify(json.contact.emails) : undefined,
          phones: json.contact && json.contact.phones ? JSON.stringify(json.contact.phones) : undefined,
        },
        // location: {
        //   type: json.location.type,
        //   floor: json.location.floor,
        //   point: null,
        //   polygon: null,
        // },
      }
      // switch (place.location.type) {
      // case 'Point':
      //   place.location.point = GeoJSONToLatLon(json.location.coordinates)
      //   break
      // case 'Polygon':
      //   place.location.polygon = json.location.coordinates.map(ring => {
      //     return ring.map(GeoJSONToLatLon)
      //   })
      //   break
      // }
      return place
    })
  },
}

function GeoJSONToLatLon(array) {
  return {
    longitude: array[0],
    latitude: array[1],
  }
}
