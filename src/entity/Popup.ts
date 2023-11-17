/* eslint-disable  @typescript-eslint/no-explicit-any */
import store from "@/store";

export default class Popup {
    public id: string;
    public type: string;
    public title: string;
    public message: string;
    public icon!: string;
    public link!: string;
    public buttons!: [];
    public timeout?: any;
    public keepAlive = false

    constructor(title = '', message: string, type = 'secondary', icon = 'fad fa-exclamation', keepAlive = false,
                link ?: string, buttons?: []) {
        this.id = this.generateId();
        this.type = type;
        this.title = title;
        this.message = message;
        this.keepAlive = keepAlive;
        if (icon)
            this.icon = icon;
        if (link)
            this.link = link;
        if (buttons)
            this.buttons = buttons;
        const match = store.state.popups.find((p: Popup) => {
            return p.title === this.title && p.message === this.message
        })
        if (match) {
            match.hide()
        }
        store.state.popups.push(this);
        if (!keepAlive) {
            this.timeout = setTimeout(() => {
                store.commit('removePopup', this.id);
                clearTimeout(this.timeout);
            }, 5000);
        }

        return this;
    }

    hide() {
        store.commit('removePopup', this.id);
        clearTimeout(this.timeout);
    }

    generateId(): string {
        const number = Math.random();
        number.toString(36);
        return number.toString(36).substr(2, 9);
    }
}
