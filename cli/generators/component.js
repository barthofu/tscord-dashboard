const fs = require('fs')

module.exports = (plop) => {
    
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
                    'shared',
                    'modules',
                    'layouts',
                ]
            },
            {
                type: 'list',
                name: 'category',
                message: 'What is the category of the component?',
                when: (answers) => answers.type !== 'layouts',
                choices: (answers) => {

                    const categories = fs.readdirSync(`./src/components/${answers.type}`).filter(file => fs.statSync(`./src/components/${answers.type}/${file}`).isDirectory())
                    
                    return [
                        ...categories,
                        new plop.inquirer.Separator(),
                        'No Category'
                    ]
                },

            }
        ],

        actions: (answers) => {

            const actions = [
                {
                    type: 'add',
                    path: '../src/components/{{camelCase type}}/{{#ifNotEquals category "No Category" }}{{category}}/{{/ifNotEquals}}{{pascalCase name}}.tsx',
                    templateFile: 'templates/component.tsx.hbs',
                }
            ]

            if (answers.type !== 'modules') actions.push({
                type: 'append',
                path: '../src/components/{{camelCase type}}/index.ts',
                template: 'export * from \'./{{#ifNotEquals category "No Category" }}{{category}}/{{/ifNotEquals}}{{pascalCase name}}\'',
            }) 
            else actions.push({
                type: 'append',
                path: '../src/components/{{camelCase type}}/{{camelCase category}}/index.ts',
                template: 'export * from \'./{{pascalCase name}}\'',
            })

            return actions
        }
    })
}