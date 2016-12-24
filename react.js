// This file only exists so that you can do require("hilt/react")
let codependency = require("codependency")

// hack to force codependency to find my package.json
codependency.findPackage = function(_) {
    return require("./package.json")
}

let requirePeer = codependency.register(module)

let React = requirePeer("react")

module.exports = require("./lib/react.js")(React)
