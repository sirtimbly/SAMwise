import { AssignmentModel, AssignmentProps } from './models/assignment_model';
import { App, State, Model, Action } from './samwise';
import * as Mithril from 'mithril';
import { UITab, UIProgressBar } from './components/UIAtoms';
import { UISlider } from './components/UIMolecules';

let m = Mithril;
let app = new App;

app.model = new AssignmentModel();

module AppViewActions {
    /**
     * Actions (the UI sends messages out to change the model)
     * - changeAction() updates the model mased on slider events, the present() method has a default value so we don't have to leak model coupling into our views
     * - loadAction() gets new data will usually just be called when the app is first initialized
     */
    export const changeAction = function(target:string, value:number, present: (data: AssignmentProps) => void = app.model.present) : void {
            var data_ = new AssignmentProps();
            data_[target] = Number(value);
            present(data_);
    }
    export const loadAction = function(present: (data:AssignmentProps) => void) {
            console.log("load: pretend we have an api call here");
            present(new AssignmentProps({
            fulltime:20,
            parttime:30,
            requested:80,
            isEditing: true
            }));
    }
    export const switchToReview = function(present: (data:AssignmentProps) => void = app.model.present) : void {
        console.log('switching tabs')
        present(new AssignmentProps({isEditing: false}))
    }
    export const switchToEdit = function(present: (data:AssignmentProps) => void = app.model.present) : void {
        console.log('switching tabs')
        present(new AssignmentProps({isEditing: true}))
    }

    export const saveData = function(present: (data:AssignmentProps) => void = app.model.present) : void {
        console.log('save clicked, fake saving to an API');
    }
}



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
        m.render(document.getElementById('tabs'), m(AppViewComponents.Tabs, model));
        
        //depending on which state the app is in we show a different component
        let mainScreenComponent = (model.isEditing) ? AppViewComponents.Edit : AppViewComponents.Review;

        m.render(document.getElementById('mainapp'), m(mainScreenComponent, model));
    }
    nextAction = (model: AssignmentProps) => {
       // throw new Error('Method not implemented.');
    }
}

app.state = new AppState();

//setting the default model stateRenderer to state function is important for decoupling state implementation from the model implementation
app.model.stateRenderer = app.state.render;



/* ============================================ */
/**
 * App View Components (these functions make the actual UI layer updates). 
 * They are implementation specific and tightly coupled to the actions above from the app.actions object.
 * + edit
 *  - slider
 * + review
 */
module AppViewComponents {

    interface State {} 

    /**
     * Tabs component is coupled to the state model so we define it here instead of in the UIMolecules file
     */
    export const Tabs = {
        view: function(vnode) {
            return m("div.flex.flex-row.mx3.mt1", [
                UITab('Widget Production Plan', vnode.attrs.isEditing, AppViewActions.switchToEdit),
                UITab('Review', !vnode.attrs.isEditing, AppViewActions.switchToReview)
            ])
        }
    } as Mithril.Component<AssignmentProps,State> & State 

    

    /**
     * Edit Component includes multiple sliders
     */
    export const Edit = {
        view: function(vnode) {
 
            console.log(vnode.attrs)
            let ftAvail = vnode.attrs.requested - vnode.attrs.parttime;
            let ptAvail = vnode.attrs.requested - vnode.attrs.fulltime;
            return m('div.border.border-blue.bg-white.rounded.p2.mx2.flex.flex-column', 
            [
                UIProgressBar(ftAvail, vnode.attrs.requested, "Big Widget slots: " + ftAvail),
                UIProgressBar(vnode.attrs.fulltime, vnode.attrs.requested),
                UISlider('Big Widget', vnode.attrs.fulltime, (val) => AppViewActions.changeAction('fulltime', val), vnode.attrs.requested),
                
                UIProgressBar(ptAvail, vnode.attrs.requested, "Small Widget slots: " + ptAvail ),
                UIProgressBar(vnode.attrs.parttime, vnode.attrs.requested),
                UISlider('Small Widget', vnode.attrs.parttime, (val) => AppViewActions.changeAction('parttime', val), vnode.attrs.requested),

                m(Footer, vnode.attrs)
            ]);
        }
    } as Mithril.Component<AssignmentProps, State>
    
    
    /**
     * Footer shows schedule versus total and a checkmark icon
     */
    export const Footer = {
        view: function(vnode) {
            
            let matchClass = vnode.attrs.isValid ? 'icon-ok' : '';
            return m('div.p2.m1',
                {
                    class: vnode.attrs.isValid ? 'bg-green' : 'bg-red'
                },
                'Widget Quota: ' + vnode.attrs.total + ' of ' + vnode.attrs.requested, m('span', { class: matchClass }))
        }
    } as Mithril.Component<AssignmentProps, State>

    /**
     * Review Component 
     */
    export const Review = {
        view: function(vnode) {
           
            return m("div.border.mx2", [
                m("table.table", [
                    m("tbody", [
                        m("tr", [
                            m("td", "Big Widget Slots"),
                            m("td", vnode.attrs.fulltime)
                        ]),
                        m("tr", [
                            m("td", "Small Widget Slots"),
                            m("td", vnode.attrs.parttime)
                        ]),
                        m("tr.text-bold.bg-blue", [
                            m("td", "Total"),
                            m("td", [
                                m(Footer, vnode.attrs)
                            ])
                        ])
                    ])
                ]),
                m('button.btn.btn-lg.m3',
                {
                    class: vnode.attrs.isValid ? 'bg-blue': 'bg-gray',
                    disabled: !vnode.attrs.isValid ? 'disabled' : '',
                    onclick: (e) => AppViewActions.saveData()
                },
                'Save')
            ])
        }
        
    } as Mithril.Component<AssignmentProps, State>

    
}


/* ============================================ */
/* ENGAGE! */

console.log("initial view state");
AppViewActions.loadAction(app.model.present)