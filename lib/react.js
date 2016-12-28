"use strict";

(function() {
    function wrapper(Hilt, React) {
        return function(obj) {
            return Hilt.compileBase(obj, function(type, attributes, children) {
                if(Object.keys(attributes).length == 0) {
                    attributes = null;
                }

                if(children.length == 0) {
                    children = null;
                }

                if(typeof type == "object" && typeof type.$$typeof == "symbol") {
                    // assume it's a React object, just return it no need to create something
                    return type
                }

                let args = [type, attributes]
                args = args.concat(children)

                return React.createElement.apply(this, args)
            }, (str) => `${str}`)
        }
    }

    if(typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = function(React) {
            let Hilt = require("./hilt.js")
            Hilt.compileReact = wrapper(Hilt, React)
            return Hilt;
        };
    } else {
        if(typeof window.Hilt === "undefined") {
            console.error("Hilt not found, please add Hilt.")
            return
        }

        if(typeof window.React === "undefined") {
            console.error("React not found, please add React.")
            return
        }

        window.Hilt.compileReact = wrapper(window.Hilt, window.React)
    }
})();
