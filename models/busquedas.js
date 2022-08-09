const fs = require('fs');

const axios = require('axios');
class Busquedas {
    historial = [];
    dbPath = './db/database.json';


    constructor() {
        // TODO: leer db si existe
        this.leerDB();
    }

    get historialCapitalizado(){
        // capitalizar cada palabra
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        });
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'limit': 5
        }
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = '') {
        // peticion http

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get()

            // const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/madri.json?language=es&access_token=pk.eyJ1IjoiZmFoZXJyZXJhMiIsImEiOiJjbDUxM3R3MzMwMXh1M25vN2tkcHNsZHlrIn0.xgY3Fd464KMC_bcifi-lkg&limit=5');
            // console.log(resp.data.features)

            return resp.data.features.map(lugar => ({ // retorna de forma implicita
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

        } catch (error) {
            return error;
        }




        // return []; // retornar los lugares
    }


    async climaLugar(lat, lon) {
        try {
            // intance de axios.create()
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsOpenWeather,
                    lat,
                    lon
                }
            })

            const resp = await instance.get();

            const { weather, main } = resp.data

            // resp.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {

        }
    }

    agregarHistorial( lugar = ''){
        // TODO: prevenir duplicidad
        if (this.historial.includes( lugar.toLocaleLowerCase())){
            return;
        }

        this.historial = this.historial.splice(0, 5);

        // Usamos el unshift para agregarlos al inicio
        this.historial.unshift(lugar.toLocaleLowerCase() );

        // Garbar en DB
        this.guardaDB();
    }

    guardaDB(){
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ))
    }

    leerDB(){
        // Verificar que exista
        if (!fs.existsSync(this.dbPath)) return null;

        // Cargar la informacion
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial
    }

}

module.exports = Busquedas;