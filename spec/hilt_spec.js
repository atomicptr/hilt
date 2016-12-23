let {MockBrowser} = require('mock-browser').mocks
let mock = new MockBrowser()
let document = mock.getDocument()

describe("hilt", () => {
    let Hilt = require("../lib/hilt.js");

    let compileTest = function(obj) {
        return Hilt.compileBase(obj, function(type, attributes, children) {
            let elem = document.createElement(type);
            Object.keys(attributes).forEach(ident => elem.setAttribute(ident, attributes[ident]))
            children.forEach(child => elem.appendChild(child))

            return elem
        }, (str) => document.createTextNode(str))
    }

    let compileTestString = function(obj) {
        let parent = document.createElement("div")
        parent.appendChild(compileTest(obj))

        return parent.innerHTML
    }

    beforeEach(() => {
        document.body.innerHTML = "";
    })

    it("should be able to compile \"a\" and read an attribute", () => {
        let obj = compileTest(["a", {id: "test"}, "testlink"])
        let id = obj.getAttribute("id")
        expect(id).toEqual("test")
    });

    it("should be able to compile more complex structures", () => {
        let structure = ["div", {id: "wrapper"},
            ["header", {style: "background: black;"}, ["div", ["span", "Test"]]],
            ["content", ["div"], ["div"], ["div", ["span", {id: "test-span"}, "Test String"]]],
            ["footer", ["div", "Stupid footer"]]
        ]

        let obj = compileTest(structure)

        document.body.appendChild(obj)

        let testSpan = document.getElementById("test-span")

        expect(testSpan.innerHTML).toEqual("Test String")
    })

    it("should be able to compile a deep nested structure", () => {
        let deepObj = ["div", ["div", ["div", ["div", ["div", ["div", ["div", ["div", ["div",
            ["div", ["div", ["div", ["div", ["div", ["div", ["div", ["div", ["div", ["div",
            ["div", ["div", ["div", ["div", ["div", ["div", ["div", ["div", ["div", ["div",
            ["div", ["div", ["div", ["div", ["div", ["div", ["div", {id: "inner"}, "This is like LISP"
            ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]

        let obj = compileTest(deepObj)
        document.body.appendChild(obj)

        let inner = document.getElementById("inner")

        expect(inner.innerHTML).toEqual("This is like LISP")
    })
});
