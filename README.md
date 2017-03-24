# Datable

Edit the file `/src/components/DatTable/actions.js` and add your Beared token. Ex:

    axios.defaults.headers.common['Authorization'] = 'Bearer ...';

Start hot reload:
    
    $npm start

Build:
    
    $npm run-script build

Run test:
    
    $npm test

Run test in watch mode:
    
    $npm run-script test-watch

# Props
- url (string): API endpoint
- rowKey (string): unique identifier for the rows
- mapData (function): used to point the main data array
- clickHandler (function): let you perform an action when you click on a row
- cols (array)
- filters: (array)

# Columns
Array of objects.

    const cols = [{ key: 'id', name: 'ID' }]

this will map the property `id` in the `ID` column.

Optionally, you can pass a template function that has to return a html string template:
    
    {
        key: 'user',
        name: 'User',
        template: function(row) {
            return `<a href="${row.url}"><h4>${row.username}</h4></a>`;
        }
    }

# Filters
Array of objects.

    filters: [
        // Prepopulated DropDownFilter
        {
            type: 'DropDownFilter',
            key: 'policy',
            label: 'Policy',
            multiple: true,
            opts: [
                { label: 'Policy001', value: 'policy-001' },
                { label: 'Policy002', value: 'policy-002' },
                { label: 'Policy003', value: 'policy-003' },
                { label: 'Policy004', value: 'policy-004' },
                { label: 'Policy005', value: 'policy-005' }
            ]
        },
        // Async DropDownFilter
        {
            type: 'DropDownFilter',
            key: 'labels',
            label: 'Labels',
            url: '/endpoint',
            mapData: function(data) { return data.array; }
            opts: []
        },
        // Query Filter
        {
            type: 'QueryFilter',
            key: 'query',
            value: ''
        }
    ]

# Bundle an use outside of React
The build script use the entry point `/src/prod.js` and basically what do is expose the components that we want to the window. In this case `React`, `ReactDOM` and `DataTable`.

You can use DataTable like this:

    ReactDOM.render(
        React.createElement(Datatable, props),
        document.getElementById('root')
    );

You can find a demo in `/dist/static.html`
