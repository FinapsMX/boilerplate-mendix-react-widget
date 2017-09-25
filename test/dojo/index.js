const widgetName = require('../../package.json').name;

dojoConfig = { //eslint-disable-line no-unused-vars
    baseUrl:  "./",
    async:    1,
    hasCache: {
        "host-node": 1,
        "dom":       0,
    },
    packages: [{
        name:     "dojo",
        location: "node_modules/dojo",
    }, {
        name:     "mxui",
        location: "test/dojo/mxui",
    }, {
        name:     widgetName,
        location: "build/" + widgetName,
    }],
    deps: [ widgetName + "/widget/" + widgetName ],
};

require('dojo/dojo.js');
