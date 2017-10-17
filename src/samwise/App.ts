import * as maquette from "maquette";
import {
    AppState,
    ComponentMap,
    IActions,
    Model,
    ViewActions,
} from "./";

/**
 * App Class Will set up everything you need and then allow you to initialize the dom
 *
 * @export
 * @class App
 * @template T A Properties Model Type
 * @template U A View Components Class Type
 */
export class App<T, U> {

    public state: AppState<T>;
    public actions: IActions<T>;
    public model: Model<T>;
    public projector: maquette.Projector;
    public views?: U;
    public viewModels?: any;

    /**
     * Creates an instance of App.
     * @param {T} initialProps an object containing the initial data
     * @param {(model: Model<T>) => IActions<T>} actionLoader a function that returns an actions class for interacting
     *  with the app views and changing the data.
     * @param {(actions: IActions<T>) => U} viewLoader a function that returns a class full of views that will be
     *  needed to render the app
     * @param {(obj: App<T, U>) => any} [next] A function that will be called after the app is constructed
     * @memberof App
     */
    constructor(initialProps: T,
                stateLoader: (p: maquette.Projector) => AppState<T>,
                actionLoader: (model: Model<T>) => ViewActions<T>,
                viewLoader: (actions: ViewActions<T>) => U,
                next?: (obj: App<T, U>) => any) {
        this.projector = maquette.createProjector();
        this.state = stateLoader(this.projector);
        this.model = new Model<T>(this.state.render);
        this.model.props = initialProps;
        this.actions = actionLoader(this.model);
        this.views = viewLoader(this.actions);
    }

    /**
     * Function that actually replaces dom nodes in the page with maquette render functions
     *
     * @param {ComponentMap[]} components
     */
    public init = function(components: ComponentMap[]) {
        components.forEach((item) => {
            this.projector.replace(item.el, () => item.comp(this.model.props, this.views));
        });
    };
}
