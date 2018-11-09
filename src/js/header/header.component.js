import headerTpl from './header.tpl'

export default class Header {
    constructor() {
        this.headerDomModel = null
        this.elementsMap = {}
    }

    bindElements() {
        const globalHeaderScope = this

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
        Object.keys(this.elementsMap).map(domElKey => this.elementsMap[domElKey].element
            .addEventListener(this.elementsMap[domElKey].event, this.elementsMap[domElKey].callback))
    }

    create() {
        this.headerDomModel = document.createElement('div')
        this.headerDomModel.innerHTML = headerTpl()
        this.bindElements()
        this.bindEventListeners()

        document.querySelector('header').appendChild(this.headerDomModel)
    }
}