
require('dotenv').config()

const { 
    leerInput, 
    inquirerMenu, 
    pausar, 
    listarLugares
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {

    const busquedas = new Busquedas();

    let opt;

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ')
                
                // Buscar los lugares
                const lugares = await busquedas.ciudad(termino)
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares)
                // Si el id es igual a '0' entonces debe continuar
                if (id === '0') continue;
                
                const lugarSel = lugares.find(l => l.id === id);
                busquedas.agregarHistorial(lugarSel.nombre)


                // Clima
                const climaLugar = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)

                // Mostrar resultados
                console.clear();
                console.log('\nInformaciòn de la ciudad\n'.green)
                console.log('Ciudad: ', lugarSel.nombre.green)
                console.log('Lat: ', lugarSel.lat)
                console.log('Lng: ', lugarSel.lng)
                console.log('Temperatura: ', climaLugar.temp)
                console.log('Mìnima: ', climaLugar.min)
                console.log('Maxima: ', climaLugar.max)
                console.log('Como esta el clima: ', climaLugar.desc.green)
                break;
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${ idx }  ${lugar}`)
                })
                break;

            default:
                break;
        }

        if (opt !== 0) await pausar();

    } while (opt !== 0);




}


main();