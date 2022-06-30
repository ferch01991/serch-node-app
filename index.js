
const { 
    leerInput, 
    inquirerMenu, 
    pausar 
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
                const lugar = await leerInput('Ciudad: ')
                await busquedas.ciudad(lugar)

                // Buscar los lugares

                // Seleccionar el lugar

                // Clima

                // Mostrar resultados
                console.log('\nInformaciòn de la ciudad\n'.green)
                console.log('Ciudad:', )
                console.log('Lat:', )
                console.log('Lng:', )
                console.log('Temperatura:', )
                console.log('Mìnima:', )
                console.log('Maxima:', )
                break;
            case 2:
                console.log(opt)
                break;

            default:
                break;
        }

        if (opt !== 0) await pausar();

    } while (opt !== 0);




}


main();