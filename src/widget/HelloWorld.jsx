import declare from 'dojoBaseDeclare';
import widgetBase from 'widgetBase';

import React from 'react';
import ReactDOM from 'react-dom';

declare("HelloWorld.widget.HelloWorld", [widgetBase], {

    constructor: function (params, srcNodeRef) {
        this.domNode = srcNodeRef;
    },

    update: function (obj, cb) {
        ReactDOM.render(<h1>Hello world!</h1>, this.domNode);
        cb();
    },

});
