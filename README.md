# hilt [![Build Status](https://travis-ci.org/atomicptr/hilt.svg?branch=master)](https://travis-ci.org/atomicptr/hilt)

Simple Javascript library to create HTML structures without using preprocessors. React support included!

    ["div", {id: "main"}, ["span", "Hello World"]]

generates

    <div id="main"><span>Hello World</span></div>

## Usage

```javascript
let link = ["a", {id: "link", href: "https://github.com/atomicptr"}, "Profile"]

containerElement.appendChild(Hilt.compileDocument(link)) // <a id="link" href="https://github.com/atomicptr">Profile</a>
```

## License

MIT
