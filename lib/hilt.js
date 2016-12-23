"use strict";

(function() {
    function compileBase(obj, elementConstructor, attributeSet, elementAppend, textNodeConstructor) {
        if(!Array.isArray(obj)) {
                return textNodeConstructor(obj); // assume it's a text node
        }

        let len = obj.length;
        let type = obj[0];
        let attrs = {};

        let elem = elementConstructor(type);

        let hasAttributes = false;

        if(len > 1) {
                // check if obj[1] is an object, if yes it's attribs
                if(typeof obj[1] === "object" && !Array.isArray(obj[1])) {
                        attrs = obj[1];

                        hasAttributes = true;

                        for(let attrIdent of Object.keys(attrs)) {
                                attributeSet(elem, attrIdent, attrs[attrIdent]);
                        }
                }
        }

        let startValue = hasAttributes ? 2 : 1;

        for(let i = startValue; i < len; i++) {
                let childObject = obj[i];
                // add object as child and try to compile
                elementAppend(elem, compileBase(childObject, elementConstructor, attributeSet, elementAppend, textNodeConstructor));
        }

        return elem;
    }

    function compileDocument(obj) {
        let elementConstructor = (type) => document.createElement(type)
        let attributeSet = (elem, ident, attr) => elem.setAttribute(ident, attr)
        let elementAppend = (elem, child) => elem.appendChild(child)
        let textNodeConstructor = (str) => document.createTextNode(str)

        return compileBase(obj, elementConstructor, attributeSet, elementAppend, textNodeConstructor)
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
