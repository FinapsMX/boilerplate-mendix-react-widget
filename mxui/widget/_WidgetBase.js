/*eslint no-unused-vars:0 no-undef:0*/

define(["dojo/_base/declare"], function (declare) {
    return declare(null, {

        // dojo.declare.constructor is called to construct the widget instance
        constructor: function (params, srcNodeRef) {
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget
        postCreate: function () {
        },

        // mxui.widget._WidgetBase.update is called when context is changed or
        // initialized
        update: function (obj, callback) {
            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should
        // enable editing
        enable: function () {
        },

        // mxui.widget._WidgetBase.enable is called when the widget should
        // disable editing
        disable: function () {
        },

        // mxui.widget._WidgetBase.resize is called when the page's layout is
        // recalculated
        resize: function (box) {
        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is
        // destroyed
        uninitialize: function () {
        },

    });
});
