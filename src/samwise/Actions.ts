import {
    Model,
} from "./";

export interface IActions<T> {
    model: Model<T>;
    data: T;
    renderer: (props: T) => void;
}

export class ViewActions<T> implements IActions<T> {

    public model: Model<T>;
    /**
     * New AppViewActions Class
     * @param model
     *
     */
    constructor(model: Model<T>) {
        this.model = model;
        // this.renderer = model.present;
    }

    get data(): T {
        return this.model.props;
    }

    set data(props: T) {
        this.model.props = props;
    }

    public renderer = (props: T) => {
        this.model.present(props);
    }
}
