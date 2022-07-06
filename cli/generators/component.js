module.exports = (plop) => {

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
                name: 'category',
                message: 'What is the category of the component?',
                choices: [
                    'elements',
                    'modules',
                    'layouts',
                    'templates',
                ]
            }
        ],

        actions: [
            {
                type: 'add',
                path: '../src/components/{{camelCase category}}/{{pascalCase name}}.tsx',
                templateFile: 'templates/component.tsx.hbs',
            },
            // {
            //     type: 'add',
            //     path: '../src/components/{{camelCase category}}/{{pascalCase name}}/{{pascalCase name}}.module.scss',
            //     template: '',
            // },
            {
                type: 'append',
                path: '../src/components/{{camelCase category}}/index.ts',
                template: 'export * from \'./{{pascalCase name}}\'',
            }
        ]
    })
}