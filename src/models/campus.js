export default class Campus {
  constructor() {

  }

  static fromJSON(json) {
    // TODO: improve
    const campus = new Campus()
    campus["_id"] = json["_id"]
    campus["identifier"] = json["identifier"]
    campus["campus"] = json["campus"]
    campus["name"] = json["name"]
    campus["shortName"] = json["shortName"]
    campus["address"] = json["address"]
    campus["location"] = json["location"]
    campus["information"] = json["information"]
    campus["parent"] = json["parent"]
    campus["categories"] = json["categories"]
    campus["ancestors"] = json["ancestors"]
    campus["contact"] = json["contact"]
    return campus
  }

  static all() {
    return fetch('http://localhost:3000/api/v1/campuses')
    .then(response => response.json())
    .then(jsons => jsons.map(Campus.fromJSON))
  }
}
