export class Location {
    _id: { $oid: string };
    user_id: { $oid: string };
    locations: [
        {
            name: string,
            longitude: number,
            latitude: number,
            active: false
        }
    ]
  }