"use strict";

(function() {
    function compileBase(obj, elementConstructor, createTextNode) {
        if(!Array.isArray(obj)) {
            // assume it's a text node
            return createTextNode(obj);
        }

        let len = obj.length;
        let type = obj[0];
        let attrs = {};

        let hasAttributes = false;

        if(len > 1) {
            // check if obj[1] is an object, if yes it's attribs
            if(typeof obj[1] === "object" && !Array.isArray(obj[1])) {
                attrs = obj[1];

                hasAttributes = true;
            }
        }

        let startValue = hasAttributes ? 2 : 1;

        let children = []

        for(let i = startValue; i < len; i++) {
            let compiledChild = compileBase(obj[i], elementConstructor, createTextNode)
            children.push(compiledChild)
        }

        return elementConstructor(type, attrs, children);
    }

    function compileDocument(obj) {
        return compileBase(obj, function(type, attributes, children) {
            let elem = document.createElement(type);
            Object.keys(attributes).forEach(ident => elem.setAttribute(ident, attributes[ident]))
            children.forEach(child => elem.appendChild(child))

            return elem
        }, (str) => document.createTextNode(str))
    }

    let Hilt = {
        compileDocument: compileDocument,
        compileDocumentString: function(obj) {
            let parent = document.createElement("div")
            parent.appendChild(compileDocument(obj))

            return parent.innerHTML
        },

        compileBase: compileBase
    }

    if(typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = Hilt;
    } else {
        window.Hilt = Hilt;
    }
})();
