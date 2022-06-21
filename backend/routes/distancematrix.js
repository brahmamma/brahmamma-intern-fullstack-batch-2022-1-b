var distance = require('google-distance-matrix');
var dotenv=require('dotenv');
dotenv.config();
var express=require('express');

function getDistancesFromOrigin(origin, destinations){
    return new Promise((resolve, reject) => {
        distance.key(process.env.GPACAPIKEY);
        distance.units('metric');
        distance.matrix(origin, destinations, function (err, distances) {
            if (err) {
                reject(err);
               
            }
            if (!distances) {
                reject('no distances');
            }
            if (distances.status == 'OK') {
                const routes = [];
                for (var i = 0; i < origin.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        const destination = distances.destination_addresses[j];
                        if (distances.rows[0].elements[j].status == 'OK') {
                            var distance =distances.rows[i].elements[j].distance.value;
                                distance=distance/1000;
                            routes.push({
                                origin: origin[i],
                                destination: destination,
                                distance: distance,
                            });
                        } else {
                            routes.push({
                                origin: origin[i],
                                destination: destination,
                                distance: 'not reachable',
                            });
                        }
                    }
                }
                resolve(routes);
            } else {
                reject(distances.status);
            }
        });
    });
    
};
module.exports = getDistancesFromOrigin;