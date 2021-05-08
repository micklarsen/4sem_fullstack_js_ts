# Learning goals: Period 4

Updated continuously

**Study group**

- [Alexander Pihl](https://github.com/AlexanderPihl)
- [Jean-Poul Leth-Møller](https://github.com/Jean-Poul)
- [Mick Larsen (Me)](https://github.com/micklarsen/)
- [Morten Rasmussen](https://github.com/Amazingh0rse)
- [Per Kringelbach](https://github.com/cph-pk)

# Exercises:

For exercises, please check the folders above or use the list here:

- [Week 1]()
- [Week 2]()
- Fullstack startcode [link](https://github.com/micklarsen/FullstackTS_Startcode)

## MongoDB indexes and Geo-features

### Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.
To create an index in MongoDB we use the following method:
```json
 db.collection.createIndex()
```

<br>

### Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere and perhaps also the Unique Index.
To create a 2dsphere index, use the db.collection.createIndex() method and specify the string literal "2dsphere" as the index type:
```json
db.collection.createIndex( { <location field> : "2dsphere" } )
```
where the <location field> is a field whose value is either a GeoJSON object or a legacy coordinates pair.
For more information on the 2dsphere index, see 2dsphere Indexes.



<br>

## Geo-location and Geojson 

### Explain and demonstrate basic Geo-JSON, involving as a minimum, Points and Polygons

Geo-Json consists of coordinates using longitude and latitude.  
It can also contain a position with types like: 
**Geometry**
Geometries are shapes and consists of a type and a collection of coordinates.

**Points**
A point is the simplest type indicating a position and contains a single coordinate consisting of longitude and latitude.  
`{ "type": "Point", "coordinates": [0, 0] }`

**LineStrings**
A linestring is a line consisting of two coordinates.  
`{ "type": "LineString", "coordinates": [[0, 0], [10, 10]] }`

**Polygons**
Polygons are shapes that have insides and outsides and can also have "Holes" in the insides - Think of a donut shape.
```json
{
  "type": "Polygon",
  "coordinates": [
    [
      [0, 0], [10, 10], [10, 0], [0, 0]
    ]
  ]
}
```
Geo-JSON can be generated from a source like [geojson.io](https://geojson.io/)  
A Geo-JSON example structure is provided below: 

```json
const gameArea = {
    "type": "Polygon",
    "coordinates": [
        [
            [
                12.575139999389648,
                55.80668374690706
            ],
            [
                12.553167343139648,
                55.79944771620931
            ],
            [
                12.547674179077147,
                55.787770751411436
            ],
            [
                12.549819946289062,
                55.7763799260891
            ],
            [
                12.568359375,
                55.77396618813479
            ],
            [
                12.58432388305664,
                55.777104018325915
            ],
            [
                12.589216232299805,
                55.7895562991921
            ],
            [
                12.575139999389648,
                55.80668374690706
            ]
        ]
    ]
}


const players = [
    {
        "type": "Feature",
        "properties": {
            "name": "p1-outside"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.549819946289062,
                55.80099151560747
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "p2-outside"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.54638671875,
                55.784344200781206
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "p3-inside"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.572307586669922,
                55.792451608113566
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "p4-inside"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.56132125854492,
                55.78786726960013
            ]
        }
    }
]
```
Flow of data: schema with query structure and types. These types are used in resolvers which are the functions that make use of
the functions in geoUtilsTester.ts and the object(game area) and array(players) from gameData.js. geojson-utils.d.ts was made
since there were problems with using geojson without that. 

<br>


### Explain and demonstrate ways to create Geo-JSON test data
To make Geo-JSON test data we can go to geojson.io and create a polygon to describe a game area with points to simulate players. The data is then striped from 
```json 
"type": "Feature", "properties": {}, "geometry": {
```
The points
are seperated from the polygon so they can be stored in there own const. Players are made as follows with a unique property name to be able to identify them: ```json const players= [
  {
    "type": "Feature",
    "properties": {"name":"Peter"},
    "geometry": {
      "type": "Point",
      "coordinates": [
        12.576169967651367,
        55.784488990708795
      ]
    }
  },
```
We export the gameArea and players with 
```json export { gameArea, players } ```
gameArea and players are used in resolvers.ts
```json
import { gameArea, players } from './gameData'
```

<br>

### Explain the typical order of longitude and latitude used by Server-Side APIs and Client-Side APIs
Historically, people usually talk about coordinates in the order `latitude, longitude, elevation`. Depending on which format you use for math in relation to coordinates this order can be different.  
For GeoJSON, the order is `longitude, latitude`. A table of commonly used formats can be found [here](https://macwright.com/lonlat/).  
It is worth noting that google uses the reverse order `latitude, longitude`.  

On the client side it makes good sense to sanitize your inputs to secure the correct order for the server-side, but in reality you could enforce sanitization on the server-side, though it can be tricky.  

A rule of thumb, for Denmark, could be, that the latitude always will be about 55-57 degrees. This rule cannot be applied everywhere of course, which is why it makes sense to pay close attention to how the data is used on client-side and server-side.
  
>A general rule of thumb is, that when doing math with coordinates, you can expect the coordinate order to be `longitude, latitude`
<br>

### Explain and demonstrate a GraphQL API that implements geo-features, using a relevant geo-library and plain JavaScript
For the backend to handle Geo features we can uise a library such as `geojson-utils`.  
We can then generate geo data using [geojson.io](https://geojson.io) by generating polygons and points both inside and outside of the polygon area.  

We can use this data and the geo library to perform math operations to check whether points are inside or outside the polygon. We can also calculate the distance between points using this library.

The json containing the polygon and points can be saved in a file `gameData.js` and imported as a test.  
To check if a player is within the defined gamearea we can use the geojson (Imported like `import gju from "geojson-utils"`) library like this: 

```javascript
isUserInArea: (_: any, { longitude, latitude }: { latitude: number, longitude: number }) => {
  const point = { type: "Point", coordinates: [longitude, latitude] }
  const isInside = gju.pointInPolygon(point, gameArea)
  let result: any = {};
  result.status = isInside;
  result.msg = isInside ? "Point was inside the GameArea" : "Point was NOT inside the GameArea";
  return result
}
```


<br>

### Explain and demonstrate a GraphQL API that implements geo-features, using a relevant geo-library and plain JavaScript
Start with ```json npm run dev``` and then have the queries ready to show how queries are handled.
First of we make a gameArea with geojson.io (explain and show how we made a polygon). After that we added points to be able to simulate players.
All the data generated from here is thrown in gameData.js where the gameArea is stored as an object and players are stored in an array.
These are imported ```json import { gameArea, players } from './gameData' ``` in resolvers.ts to be able to see if players are within a gameArea
or to find a distance between players.
Resolvers are functions used in conjunction with schema.ts which is the "formula" all graphql queries need to follow to be able to get the right
data.
 
Geo library used:
```json
npm install geojson-utils

```
Geo features used:
To be abe to see if a player is within our gameArea we make use of
```json
let distance = gju.pointDistance({ type: "Point", coordinates: [2, 3] }, { type: "Point", coordinates: [3, 4] })
```
resolvers.ts
```json
isUserInArea: (_: any, { longitude, latitude }: { longitude: number, latitude: number }) => {
```

To be able to find near by players from a given point the following geo feature is used
```json
if (gju.geometryWithinRadius(p, center, 200000)) {
    console.log(`Found. Distance to center is ${gju.pointDistance(p, center)}`)
  } else {
    console.log(`Not Found. Distance to center is ${gju.pointDistance(p, center)}`)
  }
```
resolvers.ts
```json
findNearbyPlayers: (_: any, { longitude, latitude, distance }: { longitude: number, latitude: number, distance: number }) => {
```

To be able to find the distance between players the following geo feature has been used
```json
let distance = gju.pointDistance({ type: "Point", coordinates: [2, 3] }, { type: "Point", coordinates: [3, 4] })
```

resolvers.ts
```json
distanceToUser: async (_: any, { longitude, latitude, userName }: { longitude: number, latitude: number, userName: string }) => {
``` 



<br>


### Explain and demonstrate how you have tested the geo-related features in you start code
To perform tests we need data to work with! For this we use an in-memory mongoDB feature with test data.  
We can then use mocha as our test framework and chai for assertions.  

We prepare our tests by setting up data like so: 

```javascript
    before(async function () {
        const client = await InMemoryDbConnector.connect();
        const db = client.db();
        positionCollection = db.collection("positions");
        friendsCollection = db.collection("friends")
        positionFacade = new PositionFacade(db)
        await positionCollection.createIndex({ "lastUpdated": 1 }, { expireAfterSeconds: 60 })
        await positionCollection.createIndex({ location: "2dsphere" })
    })

    beforeEach(async () => {
        const hashedPW = await hash("secret", 8);
        await friendsCollection.deleteMany({});

        const f1 = { firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: hashedPW, role: "user" }
        const f2 = { firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: hashedPW, role: "user" }
        const f3 = { firstName: "Peter", lastName: "Admin", email: "peter@admin.dk", password: hashedPW, role: "admin" }

        const status = await friendsCollection.insertMany([f1, f2, f3])
        await positionCollection.deleteMany({});

        const positions = [
            positionCreator(12.48, 55.77, f1.email, f1.firstName + " " + f1.lastName, true),
            positionCreator(12.48, getLatitudeInside(55.77, DIST_TO_SEARCH), f2.email, f2.firstName + " " + f2.lastName, true),
            positionCreator(12.58, getLatitudeOutside(55.77, DIST_TO_SEARCH), f3.email, f3.firstName + " " + f3.lastName, true),
        ]
        await positionCollection.insertMany(positions)

    })
```

In our `positionFacade.ts` we have a function called `addOrUpdatePosition` that looks like this: 

```javascript
    async addOrUpdatePosition(email: string, longitude: number, latitude: number): Promise<IPosition> {

        const friend = await this.friendFacade.getFriendFromEmail(email)
        const fullName = friend.firstName + " " + friend.lastName

        const query = { email }
        const pos: IPosition = { lastUpdated: new Date(), email, name: fullName, location: { type: "Point", coordinates: [longitude, latitude] } }
        const update = { $set: { ...pos } }

        const options = { upsert: true, returnOriginal: false } //Upsert means, make if doesn't exist
        const result = await this.positionCollection.findOneAndUpdate(query, update, options)
        return result.value;
        //throw new Error("Not Implemented")
    }
```

We can test this method for both "Success" and error handling.  
First we will test, whether the function works with a valid (Existing) user:

```javascript
    describe("Verify the addOrUpdatePosition method", () => {
        it("It should update pp@b.dk's position document", async () => {
            const result = await positionFacade.addOrUpdatePosition("pp@b.dk", 2, 3)
            expect(result.name).to.be.equal("Peter Pan")
            expect(result.location.coordinates[0]).to.be.equal(2)
            expect(result.location.coordinates[1]).to.be.equal(3)
        })
    })
```

We can then test, if the method handles non-existing users like so: 

```javascript
    describe("Verify the addOrUpdatePosition method", () => {
        it("It should not update XXXX@b.dk's position document", async () => {
            await expect(positionFacade.addOrUpdatePosition("XXXX@b.dk", 2, 3)).to.be.rejectedWith(ApiError)
        })
    })
```

Our terminal output looks like this, if all went well   

![image](https://i.imgur.com/UbiShr2.png)

<br>
