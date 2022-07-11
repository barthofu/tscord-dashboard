const fs = require('fs')

module.exports = (plop) => {

    const categories = fs.readdirSync('./src/components/elements').filter(file => fs.statSync(`./src/components/elements/${file}`).isDirectory())
    
    plop.setHelper('ifNotEquals', function(arg1, arg2, options) {
        return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
    })

    plop.setGenerator('component', {

        description: 'Create a new component',
        
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your component?',
            },
            {
                type: 'list',
                name: 'type',
                message: 'What is the type of the component?',
                choices: [
                    'elements',
                    'modules',
                    'layouts',
                ]
            },
            {
                type: 'list',
                name: 'category',
                message: 'What is the category of the component?',
                choices: [
                    ...categories,
                    new plop.inquirer.Separator(),
                    'No Category'
                ]
            }
        ],

        actions: [
            {
                type: 'add',
                path: '../src/components/{{camelCase type}}/{{#ifNotEquals category "No Category" }}{{category}}/{{/ifNotEquals}}{{pascalCase name}}.tsx',
                templateFile: 'templates/component.tsx.hbs',
            },
            // {
            //     type: 'add',
            //     path: '../src/components/{{camelCase category}}/{{pascalCase name}}/{{pascalCase name}}.module.scss',
            //     template: '',
            // },
            {
                type: 'append',
                path: '../src/components/{{camelCase type}}/index.ts',
                template: 'export * from \'./{{#ifNotEquals category "No Category" }}{{category}}/{{/ifNotEquals}}{{pascalCase name}}\'',
            }
        ]
    })
}