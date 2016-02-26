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
        ancestorsId: JSON.stringify(json.ancestors),
        categories: JSON.stringify(json.categories),
        contact: {
          urls: json.contact && json.contact.urls ? JSON.stringify(json.contact.urls) : undefined,
          emails: json.contact && json.contact.emails ? JSON.stringify(json.contact.emails) : undefined,
          phones: json.contact && json.contact.phones ? JSON.stringify(json.contact.phones) : undefined,
        },
        location: JSON.stringify(json.location),
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
      debugger
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
