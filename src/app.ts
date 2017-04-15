import { AssignmentModel, AssignmentProps } from './models/assignment_model';
import { App, State, Model, Action } from './samwise/common';
import * as m from 'mithril';

let app = new App;

app.model = new AssignmentModel();

module AppViewActions {
    /**
 * Actions (the UI sends messages out to the model)
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
        present(new AssignmentProps({isEditing: false}))
    }
    export const switchToEdit = function(present: (data:AssignmentProps) => void = app.model.present) : void {
        present(new AssignmentProps({isEditing: true}))
    }
}



/**
 * AppState (when the model updates, examine it and determine how to update the UI)
 * - editing
 * - reviewing
 */
class AppState implements State {
    render = (model: AssignmentProps) => {
        
        if (model.total >= model.requested) {
            console.log("do some error stuff here - like a toast");
        }
        this.representation(model);
        this.nextAction(model);
        //throw new Error('Method not implemented.');
    }
    representation = (model: AssignmentProps) => {
        m.render(document.getElementById('tabs'), m(AppViewComponents.Tabs, model));
        let component;
        if (model.isEditing) {
            component = AppViewComponents.Edit;
        } else {
           component = AppViewComponents.Review;
        }
        m.render(document.getElementById('mainapp'), m(component, model));
    }
    nextAction = (model: AssignmentProps) => {
       // throw new Error('Method not implemented.');
    }
}

app.state = new AppState();

//setting the default model stateRenderer to state function is important for decoupling state implementation from the model implementation
app.model.stateRenderer = app.state.render;

/**
 * App View Components (these functions make the actual UI layer updates).
 *  They are bound to the action implementations of the app.actions object.
 * + edit
 *  - slider
 * + review
 */
module AppViewComponents {

    interface State {}
    /**
     * Slider Component ViewModel
     */
    export class SliderVM {
        count:number;
        name:string;
    }

    export class ProgressVM {
        value: number;
        max: number;
    }

    export const Tabs = {
        view: function(vnode) {
            return m("div.clearfix.mx2", [
                m("button.btn.col.col-2", {
                    class: vnode.attrs.isEditing ? 'bg-blue' : 'bg-cyan',
                    onclick: (e) => {AppViewActions.switchToEdit()}
                }, 'Edit'),
                m("button.btn.col.col-2", {
                    class: !vnode.attrs.isEditing ? 'bg-blue' : 'bg-cyan',
                    onclick: (e) => {AppViewActions.switchToReview()}
                }, 'Review'),
            ])
        }
    } as Mithril.Component<AssignmentProps,State> & State 

    /**
     * Slider is a component with heading and a range input that changes either fulltime or parttime values
     */
    export const Slider = {
        view: function(vnode) {
            return m("div.clearfix", [
                m("div", {
                    class: "title"
                }, vnode.attrs.count + " " + vnode.attrs.name + " shifts assigned."),
                m("input.col.col-10", {
                    type: "range",
                    min: "0",
                    max: "100",
                    value: vnode.attrs.count,
                    onchange: (e) => {AppViewActions.changeAction(vnode.attrs.name, e.target.value)}
                }),
            ])
        }
    } as Mithril.Component<SliderVM,State> & State 

    /**
     * MaxProgress Component
     */
    export const MaxProgress = {
        view: function(vnode) {
            
        }
    } as Mithril.Component<ProgressVM, State>

    /**
     * Edit Component includes multiple sliders
     */
    export const Edit = {
        view: function(vnode) {
            let sl1 = new SliderVM();
            sl1.count = vnode.attrs.fulltime;
            sl1.name = 'fulltime';

            let sl2 = new SliderVM();
            sl2.count = vnode.attrs.parttime;
            sl2.name = 'parttime';

        console.log(vnode.attrs)
        return m('div.border.p2.mx2.clearfix', [
                m('progress.col.col-10', {
                    value: (vnode.attrs.requested - vnode.attrs.parttime),
                    max: vnode.attrs.requested 
                }),
                m('progress.col.col-10', {
                    value: (vnode.attrs.fulltime),
                    max: 100
                }),
                m(AppViewComponents.Slider, sl1),
                m('progress.col.col-10', {
                    value: (vnode.attrs.requested - vnode.attrs.fulltime),
                    max: vnode.attrs.requested 
                }),
                m('progress.col.col-10', {
                    value: (vnode.attrs.parttime),
                    max: 100
                }),
                m(AppViewComponents.Slider, sl2),
                m(Footer, vnode.attrs)
            ]);
        }
    } as Mithril.Component<AssignmentProps, State>

    /**
     * Footer shows schedule versus total and a checkmark icon
     */
    export const Footer = {
        view: function(vnode) {
            let matchClass = (vnode.attrs.total === vnode.attrs.requested) ? 'icon-ok' : '';
            return m('span', vnode.attrs.total + ' / ' + vnode.attrs.requested, m('span', { class: matchClass }))
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
                            m("td", "Full Time Slots"),
                            m("td", vnode.attrs.fulltime)
                        ]),
                        m("tr", [
                            m("td", "Part Time Slots"),
                            m("td", vnode.attrs.parttime)
                        ]),
                        m("tr.text-bold.bg-blue", [
                            m("td", "Total"),
                            m("td", [
                                m(Footer, vnode.attrs)
                            ])
                        ])
                    ])
                ])
            ])
        }
        
    } as Mithril.Component<AssignmentProps, State>

    
}

console.log("initial view state");
AppViewActions.loadAction(app.model.present)
