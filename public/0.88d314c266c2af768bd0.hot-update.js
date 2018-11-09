webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/js/header/header.tpl.js
const headerTpl = () => `
    <div class="header-content">
        <div class="input-group">
            <input placeholder="lwl">
            <button>Search</button>
            <button>Filters</button>
        </div>
    </div>
`;

/* harmony default export */ var header_tpl = (headerTpl);
// CONCATENATED MODULE: ./src/js/header/header.component.js


class header_component_Header {
    constructor() {
        this.headerDomModel = null;
        this.elementsMap = {};
    }

    bindElements() {
        const globalHeaderScope = this;

        // this.elementsMap.addGroupButton = {
        //     element: this.headerDomModel.querySelector('#add-group-button'),
        //     event: 'click',
        //     callback: this.toggleInputBlockView.bind(globalHeaderScope),
        // }
        //
        // this.elementsMap.addGroupInputBlock = {
        //     element: this.headerDomModel.querySelector('.add-group-input-block'),
        // }
    }

    bindEventListeners() {
        Object.keys(this.elementsMap).map(domElKey => this.elementsMap[domElKey].element.addEventListener(this.elementsMap[domElKey].event, this.elementsMap[domElKey].callback));
    }

    create() {
        this.headerDomModel = document.createElement('div');
        this.headerDomModel.innerHTML = header_tpl();
        this.bindElements();
        this.bindEventListeners();

        document.querySelector('header').appendChild(this.headerDomModel);
    }
}
// CONCATENATED MODULE: ./src/js/header/index.js


/* harmony default export */ var header = (header_component_Header);
// CONCATENATED MODULE: ./src/js/main.js


(function () {
    new header().create();
})();

/***/ })
])