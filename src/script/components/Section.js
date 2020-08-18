class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = document.querySelector(selector);
    }

    addItem(element) {
        this._selector.prepend(element);
    }

    _clear() {
        this._selector.innerHTML = '';
    }

    renderItems() {
        this._clear();

        this._items.forEach(element => {
            this._renderer(element);
        });
    }
}

export {Section};