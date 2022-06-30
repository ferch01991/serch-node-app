const axios = require('axios');

class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'San José']

    constructor(){
        // TODO: leer db si existe
    }

    async ciudad ( lugar = ''){
        // peticion http
        // console.log( 'Ciudad: ', lugar )

        const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/madri.json?language=es&access_token=pk.eyJ1IjoiZmFoZXJyZXJhMiIsImEiOiJjbDUxM3R3MzMwMXh1M25vN2tkcHNsZHlrIn0.xgY3Fd464KMC_bcifi-lkg&limit=5');
        console.log(resp.data)



        return []; // retornar los lugares
    }
}

module.exports = Busquedas;