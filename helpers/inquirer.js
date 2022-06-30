const inquirer = require("inquirer");

require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1'.green}. Search`
            },
            {
                value: 2,
                name: `${'2'.green}. History`
            },
            {
                value: 0,
                name: `${'0'.green}. Exit`
            },
        ]
    }
]

const inquirerMenu = async () => {
    // console.clear();
    console.log('==================='.green)
    console.log('  Select an option:'.white)
    console.log('===================\n'.green)

    const {option} = await inquirer.prompt(questions);

    return option;
}

const pausar = async() => {
    const question = [
        {
            type: 'input',
            name: 'salir',
            message: `Press ${'Enter'.green} to continue`,
        }
    ]
    console.log('\n')

    const salir = await inquirer.prompt(question)
    return salir

}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if ( value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)

    return desc
}


const listadoTareasBorra = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i+1 }`.green
        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0. '.green+ 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ]
    
    const { id } = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt( question )
    return ok;
}

const mostrarListadoCheckList = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i+1 }`.green
        return {
            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked: (tarea.completadoEn ) ? true : false
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    
    const { ids } = await inquirer.prompt(preguntas);
    return ids;

}



module.exports = {
    inquirerMenu,
    pausar,
    leerInput,
    listadoTareasBorra,
    confirmar,
    mostrarListadoCheckList
}