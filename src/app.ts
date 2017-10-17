import * as maquette from "maquette";
import { AppViewComponents } from "./components/AppViewComponents";
import { AssignmentProps } from "./models/assignment_model";
import {
    App,
    AppState,
    ComponentMap,
    IActions,
    Model,
    ViewActions,
} from "./samwise";

/* Before we can create an app we need to specify a
class containing component functions, and a class
defining the action functions */

/**
 * AppViewActions (the UI sends messages out to change the model)
 * - changeAction() updates the model mased on slider events, the present()
 *   method has a default value so we don't have to leak model coupling into our views
 * - loadAction() gets new data will usually just be called when the app is first initialized
 * - switchToReview()
 * - switchToEdit()
 * - saveData()
 */
export class AppViewActions extends ViewActions<AssignmentProps> {

    /**
     * Method that changes a single number value on the model
     *
     * @param {string} target the property name
     * @param {number} value the new value
     */
    public changeAction = (target: string, value: number): void => {
        this.data[target] = Number(value);
        this.renderer(this.data);
    }

    public loadAction = () => {
        // console.log("load: pretend we have an api call here");
        this.renderer(this.data);
    }

    public switchToReview = (): void => {
        // console.log('switching tabs')
        this.data.isEditing = false;
        this.renderer(this.data);
    }

    public switchToEdit = (): void => {
        // console.log('switching tabs');
        this.data.isEditing = true;
        this.renderer(this.data);
    }

    public saveData = (): void => null;
}

const calculateState = (props: AssignmentProps) => {
    props.fulltime = Math.min(props.fulltime, props.requested - props.parttime);
    props.parttime = Math.min(props.parttime, props.requested - props.fulltime);
    props.ftAvail = props.requested - props.parttime;
    props.ptAvail = props.requested - props.fulltime;
    props.total = props.fulltime + props.parttime;
    props.isValid = props.total === props.requested;
    return props;
};

// Now we've created the actions, let's spin up our app

const app = new App<AssignmentProps, AppViewComponents>(
    calculateState({
        fulltime: 20,
        isEditing: true,
        parttime: 30,
        requested: 80,
    } as AssignmentProps),
    (p: maquette.Projector) => new AppState<AssignmentProps>(p, calculateState),
    (m: Model<AssignmentProps>): ViewActions<AssignmentProps> => new AppViewActions(m),
    (a: AppViewActions) => new AppViewComponents(a));

// Once the app is ready we can call init() and specify elements in the page we are replacing with view function
app.init([{
            comp: app.views.Tabs,
            el: document.getElementById("tabs"),
        },
        {
            comp: app.views.TabLoader,
            el: document.getElementById("mainapp"),
        }]);

/* ============================================ */
