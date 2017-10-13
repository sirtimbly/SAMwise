import { AssignmentModel, AssignmentProps } from './models/assignment_model';
import { App, State, Model, Action } from './samwise/common';
import * as Mithril from 'mithril';
import { UITab, UIProgressBar } from './components/UIAtoms';

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
        
    }
    representation = (model: AssignmentProps) => {
        m.render(document.getElementById('tabs'), m(AppViewComponents.Tabs, model));
        
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
            return m("div.flex.flex-row.mx3.my1", [
                UITab('Sliders', vnode.attrs.isEditing, AppViewActions.switchToEdit),
                UITab('Review', !vnode.attrs.isEditing, AppViewActions.switchToReview)
            ])
        }
    } as Mithril.Component<AssignmentProps,State> & State 

    /**
     * Slider is a component with heading and a range input that changes either fulltime or parttime values
     */
    export const Slider = {
        view: function(vnode) {
            return m("div.flex.bg-light-gray.p2.flex-reverse", [
                
                m("input.col-4", {
                    type: "range",
                    min: "0",
                    max: "100",
                    name: "range"+vnode.attrs.name,
                    value: vnode.attrs.count,
                    onchange: (e) => {AppViewActions.changeAction(vnode.attrs.name, e.target.value)}
                }),
                m("label.title.col-3.px2", 
                {for: "range"+vnode.attrs.name},
                vnode.attrs.count + " " + vnode.attrs.name + " shifts assigned.")
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
 
            console.log(vnode.attrs)
            let ftAvail = vnode.attrs.requested - vnode.attrs.parttime;
            let ptAvail = vnode.attrs.requested - vnode.attrs.fulltime;
            return m('div.border.rounded.p2.mx2.flex.flex-column', 
            [
                UIProgressBar(ftAvail, vnode.attrs.requested, "FT slots: " + ftAvail),
                UIProgressBar(vnode.attrs.fulltime, 100),
                m(AppViewComponents.Slider, <SliderVM>{count: vnode.attrs.fulltime, name:'FullTime'}),
                
                UIProgressBar(ptAvail, vnode.attrs.requested, "PT slots: " + ptAvail ),
                UIProgressBar(vnode.attrs.parttime, 100),
                m(AppViewComponents.Slider, <SliderVM>{count: vnode.attrs.parttime, name:'PartTime'}),

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