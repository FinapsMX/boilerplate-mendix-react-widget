/*global dojoConfig:true*/
/*global describe beforeEach it*/

/*global navigator:true window:true document:true*/

/*exported dojoConfig*/

const widgetName = require('../package.json').name;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM("<div id='widget'></div>", {
    userAgent: "nodejs",
});
window = dom.window;
navigator = window.navigator;
document = window.document;

//const expect = require("chai").expect;
const snapshot = require("snap-shot");

dojoConfig = {
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
        location: "mxui",
    }, {
        name:     widgetName,
        location: "build/" + widgetName,
    }],
    deps: [ widgetName + "/widget/" + widgetName ],
};

require('dojo/dojo.js');

//eslint-disable-next-line no-eval
const Widget = eval(widgetName + ".widget." + widgetName);

describe('Post-build widget', function () {

    const node = document.getElementById('widget');
    let widget = new Widget({}, node);

    beforeEach(function (done) {
        while (node.firstChild) node.removeChild(node.firstChild);
        widget = new Widget({}, node);
        widget.postCreate();
        done();
    });

    it('#enable()', function(done) {
        widget.enable();
        snapshot(node.innerHTML);
        done();
    });

    it('#disable()', function(done) {
        widget.disable();
        snapshot(node.innerHTML);
        done();
    });

    it('#resize()', function(done) {
        widget.resize();
        snapshot(node.innerHTML);
        done();
    });

    it('#uninitialize()', function(done) {
        widget.uninitialize();
        snapshot(node.innerHTML);
        done();
    });
});
