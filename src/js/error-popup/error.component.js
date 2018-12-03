import errorTpl from './error.tpl'

class ErrorComponent {
    constructor() {
        this.errorDomModel = null;
        this.elementsMap = {};
    }

    bindElements() {
        const globalErrorScope = this;

        this.elementsMap.closeModal = {
            element: this.errorDomModel.querySelector('.close-modal'),
            event: 'click',
            callback: this.hidePopup.bind(globalErrorScope)
        }
    }

    showPopUp() {
        document.querySelector('.modal').classList.add('active')
        document.querySelector('.modal-overlay').classList.add('active')
    }

    hidePopup() {
        document.querySelector('.modal').classList.remove('active')
        document.querySelector('.modal-overlay').classList.remove('active')
    }

    bindEventListeners() {
        Object.keys(this.elementsMap).map(domElKey =>
            this.elementsMap[domElKey].element.addEventListener(
                this.elementsMap[domElKey].event,
                this.elementsMap[domElKey].callback
            ))
    }

    create() {
        import('../../styles/error-popup.scss')

        if (!document.querySelector('.modal-overlay')) {
            const overlay = document.createElement('div')
            overlay.classList.add('modal-overlay')
            overlay.innerHTML = errorTpl()
            document.querySelector('body').appendChild(overlay);
            this.errorDomModel = overlay
        } else {
            this.errorDomModel = document.querySelector('.modal-overlay')
        }

        this.bindElements();
        this.bindEventListeners();

    }
}

export default ErrorComponent
