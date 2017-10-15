import { AssignmentModel, AssignmentProps } from './models/assignment_model';
import { App, State, Model, Action } from './samwise';
import * as m from 'mithril';
import { AppViewComponents } from './components/AppViewComponents'

// let m = Mithril;
let app = new App;

app.model = new AssignmentModel();

export class AppViewActions {
    /**
     * Actions (the UI sends messages out to change the model)
     * - changeAction() updates the model mased on slider events, the present() method has a default value so we don't have to leak model coupling into our views
     * - loadAction() gets new data will usually just be called when the app is first initialized
     */
    changeAction = function(target:string, value:number, present: (data: AssignmentProps) => void = app.model.present) : void {
            var data_ = new AssignmentProps();
            data_[target] = Number(value);
            present(data_);
    }
    loadAction = function(present: (data:AssignmentProps) => void) {
            console.log("load: pretend we have an api call here");
            present(new AssignmentProps({
            fulltime:20,
            parttime:30,
            requested:80,
            isEditing: true
            }));
    }
    switchToReview = function(present: (data:AssignmentProps) => void = app.model.present) : void {
        console.log('switching tabs')
        present(new AssignmentProps({isEditing: false}))
    }
    switchToEdit = function(present: (data:AssignmentProps) => void = app.model.present) : void {
        console.log('switching tabs')
        present(new AssignmentProps({isEditing: true}))
    }

    saveData = function(present: (data:AssignmentProps) => void = app.model.present) : void {
        console.log('save clicked, fake saving to an API');
    }
}
app.actions = new AppViewActions();


/* ============================================ */

/**
 * AppState (when the model updates, examine it and determine how to update the UI)
 * - editing
 * - reviewing
 */
class AppState implements State {
    render = (model: AssignmentProps) => {
        
        if (model.total > model.requested) {
            console.log("do some error checking and warnings here - like a toast");
        }

        model.isValid = (model.total === model.requested);
        this.representation(model);
        this.nextAction(model);
        
    }
    representation = (model: AssignmentProps) => {
        m.render(document.getElementById('tabs'), m(app.views.Tabs, model));
        
        //depending on which state the app is in we show a different component
        let mainScreenComponent = (model.isEditing) ? app.views.Edit : app.views.Review;

        m.render(document.getElementById('mainapp'), m(mainScreenComponent, model));
    }
    nextAction = (model: AssignmentProps) => {
       // throw new Error('Method not implemented.');
    }
}

app.state = new AppState();

//setting the default model stateRenderer to state function is important for decoupling state implementation from the model implementation
app.model.stateRenderer = app.state.render;

app.views = new AppViewComponents(app);
export const Application = app;
/* ============================================ */
/* ENGAGE! */

console.log("initial view state");
app.actions.loadAction(app.model.present)