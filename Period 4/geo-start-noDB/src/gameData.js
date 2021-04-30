

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

//module.exports = { gameArea, players  }
export { gameArea, players }