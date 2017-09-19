# Develop Mendix Widgets with Webpack and React

Somewhere two years ago I got involved in web development with Javascript and
the whole surrounding ecosystem. And it was exciting! With the introduction of
ES2015, the NPM repository, and React it felt as if the web was developing at
such a rapid speed that all blog posts that I could find were instantaneous
outdated. Each day there was a new feature or paradigm introduced that was the
new cool thing to use, and it felt thrilling to be able to incorporate that in
new projects.

This year I got into Mendix, and as a Javascript developer, my first project
was a widget development. Actually more of a module. At Finaps we tried to make
something similar to the Plotly designer which we could include in some of the
dashboards that we develop. This widget was not easy to develop within the Dojo
framework; each iteration during the construction felt kinda awkward. I rather
wished to develop into something that felt more native to Javascript.  So,
after a few days of struggling, I decided to spend more time on developing a
framework which I could leverage to develop native Mendix widgets, with the
tools that I already knew.

It took some time and iterations but after a while the environment that I set
up felt just right: it is easy to develop with ES2015 and even ES2017 / ES7 (in
fact, any version that Babel supports), it includes the NPM package manager so
that I can include any new modern library such as React, and it incorporates
linting and unit testing for ease of development.

In this post, I will explain the steps that I took and guide through some of
the more important configuration files, and show how to use the framework for a
small widget. If you also want to start development of Mendix widgets based on
this new framework, all code used is freely published, and a boilerplate can be
found at:

### todo url

## Core technologies

Current web development has become quite mature, and as a developer, you have
to use a lot of different tools in your building process. To name a few:
Webpack, Babel, NPM, React, ESLint, Jest, etc. This might seem daunting at
first, don't worry! The basic tools that are necessary for widget development
will be explained in this section.

If you are using the boilerplate, then you can install all those tools by first
installing NPM, and then issuing `npm install` in the folder in which the
boilerplate is stored.

### todo logos

### NPM

NPM, which stands for Node Package Manager, is at the root of most Javascript
development. It is the default package manager for a lot of projects and
consists of a command line client and an online database of public packages,
which is called the registry. The registry includes all populare packages, such
as Webpack, Babel, and React. This tool will be used to download all other
tools necessary for widget development.

Because it is at the root of the project, and is used to download the other
packages with, it is the only package which needs manual installation. You can
find the installation files [here](http://www.npmjs.com).

### Webpack

Webpack is a module bundler. That is, Webpack takes one file (called an asset),
typically a Javascript file, and follows all dependencies of that file. It
looks at all includes and imports in that file and builds a dependency graph.
After investigation it bundles all those files into one file which can be
served to the client.

### todo graph

There are two big advantages to this approach: A client has to download only
one file it encounters the widget (which saves a lot of time!) and each file
that is used can be inspected by a plugin such as Babel, which will be
described in the next section.

To install Webpack on your computer: after you have installed NPM issue `npm
install -g webpack` from a command line. The `-g` flag tells NPM to install it
globally on your machine such that you can always use Webpack from the command
line.

### Babel

Babel is a tool used to transpile Javascript features described in ES2015 /
ES2017 / ES7 into plain old Javascript that is understandable by any browser in
use. If Babel is included in the build process, then you can be safe that
although your project uses cool new features such as the [spread
syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator),
it will still run in ancient browsers such as Internet Explorer. This is really
important if you want to use those astonishing new features and cannot force
your clients to use the latest version of Chrome or Firefox.

A whole other blogpost can be written on the subject of those new Javascript
features. And in fact, there are already quite a lot. If unsure what ES6/7 is,
I suggest a quick Google. It is really exciting to see so much development
within such a short period in one language.

Another great thing about Babel is, is that it allows to transfer JSX syntax to
React. Which is, in my opinion, the only graceful manner to write React apps.

Babel will not be used as a command line utility, and therefore it does not
make sense to install it global on your development machine. Of course it can
be done similare to how Webpack was installed, but it makes more sense to
install it linked to a project. To start a new project: Make an empty directory
and change your working directory in the terminal to the new folder, then run
`npm init`. After that you can install Webpack and Babel to the project by:
`npm install -s webpack babel-core babel-loader babel-preset-env`.

### React

React is a Javascript library developed by Facebook for building user
interfaces by using a component based design. It is at the moment the most
popular Javascript library in use, and it empowers a lot of the web. Any
current project which includes some design is almost surely component based,
and although the actual implementation is not always React, React set the tune
on how those interfaces are developed. If you do not know this tech, I really
urge you to find a React tutorial as soon as possible.

To install the library, move the terminal to your project folder and run
`npm install -s react react-dom prop-types babel-plugin-transform-react-jsx`.

## Setting everything up

The difficult part in getting al these tools together is in the configuration.
There are numerous tutorials on the internet that help you set up a plain
boilerplate with Webpack and Babel, but if you want something non vanilla such
as a Mendix widget instead of a plain Javascript application, then it suddenly
becomes much harder.

If you are using the boilerplate, then all configurations are already set up
and you can use this section as a guide through the most important
configuration files which differ from a default set up.

### Webpack

Webpack is configured through `webpack.config.js`. This subsection describes a
few configuration flags that are not found in a typical Webpack configuration.
For a full description of the configuration, check the
[documentation](https://webpack.github.io/docs/configuration.html). There each
of the lines found in the example configuration file is explained much more
thorough than I can through this post.

We need to tell Webpack that we want our project to be built as a Mendix
widget, which is actually an AMD module. An AMD module is a Javascript module
written in such a way that it can easy be integrated in other projects. It was
one of the first truely modular packaging of Javascript libraries developed by
the Dojo framework. Nowadays the prevailing standard is the NPM registry which
is based on CommonJS, but for our purpose we want an AMD package.

We can tell Webpack to build an AMD module by setting the output target:

    module.exports = {
        output: {
            libraryTarget: 'amd',
            ....
        }
        ....
    }

Moreover, we want Webpack to use Babel to translate all of our new and fancy
Javascript into plain older Javascript. We do so by including Babel as a
plugin:

    module.exports = {
        ....
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: ['babel-loader']
                }
            ]
        },
        ....
    }

Also, a Mendix widget contains a Dijit object, which is defined through a
`declare` procedure. Obvious that is not a native Javascript method, and as
such Webpack would not know what to do with it when it encounters a `declare`
function call in our widget. Therefore we have to state explicit that it is
defined somewhere external and will be loaded by Mendix. Same goes for the
`WidgetBase` object:

    module.exports = {
        ....
        externals: {
            dojoBaseDeclare: "dojo/_base/declare",
            widgetBase: "mxui/widget/_WidgetBase"
        }
    }

### Babel

The configuration for Babel for developing Mendix widgets is much easier and
does not differ much from a regular configuration. In fact it is fairly small
and self explainatory:

    {
      "presets": [
        ["env", {
          "targets": {
            "browsers": ["last 2 versions"]
          },
          "modules": false,
          "useBuiltIns": true
        }]
      ],
      "plugins": ["transform-react-jsx"]
    }

### Build script

With the default configuration which is used by the boilerplate, it is possible
to run Webpack from the root folder of the project with simply `webpack` (if
you have opted for not installing Webpack global, then the command is
`./node_modules/.bin/webpack`). What next happens is that Webpack will load the
configuration `webpack.config.js`, which points to an entry file (default
`src/widget/{WidgetName}.jsx`, with `{WidgetName}` the name of the project
defined in `package.json`). It will parse the entry file in combination with
Babel, and builds the resulting bundled script in the
`build/{WidgetName}/widget` directory.

To make it a working Mendix widget a `package.xml` file is necessary, which is
generated by `package.xml.js` found in the boilerplate.

Next everything in the `build` directory has to be zipped and renamed to
`{widget}.mpk`, which can be loaded directly into Mendix.

All these steps are included as a NPM script in the boilerplate. The script can
be triggered by running `npm run build` in the root folder of the project.

## Hello World

The current setup is made such that the name of the Mendix widget is defined in
`package.json`, and the widget is further developed within the `src` directory.
When `npm run build` is triggered all files from the `src` directory are taken
and copied / transpiled in the `build` directory, which will then have the
source of the Mendix widget in such a way that it can be safely used within any
client browser. The `build` directory is zipped into `build/widget.mpk`, which
can be loaded within a Mendix project. For testing purposes, this widget file
is also copied by the NPM script to `mendix/widgets`, such that it can be
tested directly in a Mendix project that resides in the `mendix` folder.

As an example, this boilerplate includes a copy of a simple `Hello World`
widget, which loads on activation the React library and uses JSX syntax to
print Hello World on screen. Obvious, that is not very exciting.

To make it a bit more exciting, lets extend this widget to print `Hello World`
in a modal (pop-up). For that we are going to use the
[React-Bootstrap](https://react-bootstrap.github.io/) library.

To install the bootstrap library execute `npm install -s react-bootstrap`. Now
edit `src/widget/HelloWorld.jsx` to import the new library:

    import declare from 'dojoBaseDeclare';
    import widgetBase from 'widgetBase';

    import React from 'react';
    import ReactDOM from 'react-dom';
    import {Modal, Modal.Header, Modal.Title, Modal.Body, Modal.Footer} from 'react-bootstrap';
    ....

If we run `npm run build` now it will warn us that we have imported a library
which is not used within the project yet. But it will work though and the new
widget will contain the library components necessary for making our pop-up.

To have the widget show the pop-up, edit the code to render the modal:

    ....
    import {Modal, Modal.Header, Modal.Title, Modal.Body, Modal.Footer} from 'react-bootstrap';

    const popup = <Modal>
            <Modal.Header>
                <Modal.Title>Hello World</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>I just want to say Hello</h4>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>

    ....

        ReactDOM.render(popup, this.domNode);
    ....

By now, after running `npm run build`, there will be a `widget.mpk` which shows
when loaded `Hello World` in a pop-up.

A fun next exercise left for the reader is to add a close button. A full code
snippet which has such a modal with close button can be found
[here](https://react-bootstrap.github.io/components.html#overlays).

## Future possibilities

This boilerplate is as native to the NPM ecosystem as possible, in such a way
that it can use the cool new features that are being developed by other
Javascript developers. It is imagined that this framework is flexible enough to
adapt to other libraries and developments which will happen in the near future.
Which is of vital importance in web development due to the rapid changing
nature of the web. What was a few years ago the golden standard (say for
instance AMD) is already outdated. As a developer it is important to stay on
top of all those changes and adapt them in your own development.

For instance, now that Javascript applications are becoming quite large,
development has to include some kind of unit testing. Without testing the
project will become unmanagable, which no one really wants. This is especially
important now that we see a lot of `single-page` websites which are in fact a
large React application. Unit tests can help to make sure that legacy code does
not break when introducing new features to the codebase.

This boilerplate can be extended to incorporate unit testing through
[Jest](https://facebook.github.io/jest/). The incorporation of Jest in this
boilerplate is subject for another post, which will happen probably in the near
future.

Another major development on the web which excites me is
[WebAssembly](https://en.wikipedia.org/wiki/WebAssembly). WebAssembly is a
portable stack machine which promises to bring C and C++ programs to the web by
compiling them into wasm files. The wasm files are designed to be faster parsed
and executed. The main thing about WebAssembly is that it allows web
development in a number of other languages (including
[Rust](https://blog.rust-lang.org/2016/12/22/Rust-1.14.html)!) and also to
include their ecosystems in a web application.

This boilerplate brings a new way of Mendix widget development, which is aimed
at the future.
