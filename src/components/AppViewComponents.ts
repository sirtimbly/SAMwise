import * as m from 'mithril';
// import Mithril from 'mithril';
import { App, State, Model, Action } from '../samwise';
import { UITab, UIProgressBar } from './UIAtoms';
import { UISlider } from './UIMolecules';
import { AssignmentModel, AssignmentProps } from '../models/assignment_model';
/* ============================================ */
/**
 * App View Components (these functions make the actual UI layer updates). 
 * They are implementation specific and tightly coupled to the actions above from the app.actions object.
 * + edit
 *  - slider
 * + review
 */
interface VState {} 


export class AppViewComponents {
    app:App;
    constructor (app:App) {
        this.app = app;
    }
    /**
     * Tabs component is coupled to the state model so we define it here instead of in the UIMolecules file
     */
    public Tabs = {
        view: (vnode) => {
            return m("div.flex.flex-row.mx3.mt1", [
                UITab('Widget Production Plan', vnode.attrs.isEditing, this.app.actions.switchToEdit),
                UITab('Review', !vnode.attrs.isEditing, this.app.actions.switchToReview)
            ])
        }
    } as m.Component<AssignmentProps,VState> & VState 

    

    /**
     * Edit Component includes multiple sliders
     */
    public Edit = {
        view: (vnode) => {
 
            console.log(vnode.attrs)
            let ftAvail = vnode.attrs.requested - vnode.attrs.parttime;
            let ptAvail = vnode.attrs.requested - vnode.attrs.fulltime;
            return m('div.border.border-blue.bg-white.rounded.p2.mx2.flex.flex-column', 
            [
                UIProgressBar(ftAvail, vnode.attrs.requested, "Big Widget slots: " + ftAvail),
                UIProgressBar(vnode.attrs.fulltime, vnode.attrs.requested),
                UISlider('Big Widget', vnode.attrs.fulltime, (val) => this.app.actions.changeAction('fulltime', val), vnode.attrs.requested),
                
                UIProgressBar(ptAvail, vnode.attrs.requested, "Small Widget slots: " + ptAvail ),
                UIProgressBar(vnode.attrs.parttime, vnode.attrs.requested),
                UISlider('Small Widget', vnode.attrs.parttime, (val) => this.app.actions.changeAction('parttime', val), vnode.attrs.requested),

                m(this.Footer, vnode.attrs)
            ]);
        }
    } as m.Component<AssignmentProps, VState>
    
    
    /**
     * Footer shows schedule versus total and a checkmark icon
     */
    public Footer = {
        view: (vnode) => {
            
            let matchClass = vnode.attrs.isValid ? 'icon-ok' : '';
            return m('div.p2.m1',
                {
                    class: vnode.attrs.isValid ? 'bg-green' : 'bg-red'
                },
                'Widget Quota: ' + vnode.attrs.total + ' of ' + vnode.attrs.requested, m('span', { class: matchClass }))
        }
    } as m.Component<AssignmentProps, VState>

    /**
     * Review Component 
     */
    public Review = {
        view: (vnode) => {
           
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
                                m(this.Footer, vnode.attrs)
                            ])
                        ])
                    ])
                ]),
                m('button.btn.btn-lg.m3',
                {
                    class: vnode.attrs.isValid ? 'bg-blue': 'bg-gray',
                    disabled: !vnode.attrs.isValid ? 'disabled' : '',
                    onclick: (e) => this.app.actions.saveData()
                },
                'Save')
            ])
        }
        
    } as m.Component<AssignmentProps, VState>

    
}