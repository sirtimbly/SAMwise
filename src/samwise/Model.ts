/**
 * A Model is a class that holds the data object for an application as well as
 * a presenter class function which is used to call the state update method
 *
 * @export
 * @class Model
 * @template T the class that defines the shape of the data
 */
export class Model<T> {
    public props: T;
    public present: (props: T) => any;

    constructor(presenter: (props: T) => any) {
        this.present = presenter;

    }
}
