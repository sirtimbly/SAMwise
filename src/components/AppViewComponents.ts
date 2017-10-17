import * as Maquette from "maquette";
const h = Maquette.h;

// import Mithril from 'mithril';
import {
    App,
    IActions,
    IState,
    Model,
} from "../samwise";

import {
    UIProgressBar,
    UITab,
} from "./UIAtoms";

import { UISlider } from "./UIMolecules";

import { AssignmentProps } from "../models/assignment_model";

import { AppViewActions } from "../app";

/* ============================================ */
/**
 * App View Components (these functions make the actual UI layer updates).
 * They are implementation specific and tightly coupled to the actions above from the app.actions object.
 * + edit
 *  - slider
 * + review
 */

export class AppViewComponents {

    public actions: AppViewActions;

    constructor(actions: AppViewActions) {
        this.actions = actions;

    }
    public changeFulltime = (e: Event) => {
        this.actions.changeAction("fulltime", Number.parseInt((e.currentTarget as HTMLInputElement).value));
    }
    //  (val) => this.actions.changeAction("fulltime", Number.parseInt(val));
    public changeParttime = (e: Event) => {
        this.actions.changeAction("parttime", Number.parseInt((e.currentTarget as HTMLInputElement).value));
    }

    public TabLoader = (model: AssignmentProps, views: AppViewComponents): Maquette.VNode => {
        let component;
        if (model.isEditing) {
            component = views.Edit(model, views);
        } else {
            component = views.Review(model, views);
        }
        return h("div.tabLoader", component);
    }

    /**
     * Tabs component is coupled to the state model so we define it here instead of in the UIMolecules file
     */
    public Tabs = (model: AssignmentProps, views: AppViewComponents) => {

        return h("div.flex.flex-row.mx3.mt1", [
            UITab("Widget Production Plan", model.isEditing, this.actions.switchToEdit),
            UITab("Review", !model.isEditing, this.actions.switchToReview),
        ]);
    }

    /**
     * Footer shows schedule versus total and a checkmark icon
     */
    public Footer = (model: AssignmentProps) => {
        // let matchClass = model.isValid ? 'icon-ok' : '';
        return h("div.p2.m1",
            {
                classes: {
                    "bg-green" : model.isValid,
                    "bg-red": !model.isValid,
                },
            },
            "Widget Quota: " + model.total + " of " + model.requested,
            h("span", {
                classes: {"icon-ok": model.isValid},
            }));

    }

    /**
     * Edit Component includes multiple sliders
     */
    public Edit = (model: AssignmentProps, views: AppViewComponents) => {
        // console.log(model)

        return h("div.border.border-blue.bg-white.rounded.p2.mx2.flex.flex-column",
        [
            UIProgressBar(model.ftAvail, model.requested, "Big Widget slots: " + model.ftAvail),
            UIProgressBar(model.fulltime, model.requested),
            UISlider("Big Widget", model.fulltime, this.changeFulltime, model.requested),

            UIProgressBar(model.ptAvail, model.requested, "Small Widget slots: " + model.ptAvail ),
            UIProgressBar(model.parttime, model.requested),
            UISlider("Small Widget", model.parttime, this.changeParttime, model.requested),

            views.Footer(model),
        ]);
    }

    /**
     * Review Component
     */
    public Review = (model: AssignmentProps, views: AppViewComponents) => {
        return h("div.border.mx2", [
            h("table.table", [
                h("tbody", [
                    h("tr", [
                        h("td", "Big Widget Slots"),
                        h("td", model.fulltime.toString()),
                    ]),
                    h("tr", [
                        h("td", "Small Widget Slots"),
                        h("td", model.parttime.toString()),
                    ]),
                    h("tr.text-bold.bg-blue", [
                        h("td", "Total"),
                        h("td", [
                            views.Footer(model),
                        ]),
                    ]),
                ]),
            ]),
            h("button.btn.btn-lg.m3",
            {
                classes: {
                    "bg-blue": model.isValid,
                    "bg-gray": !model.isValid,
                },
                disabled: !model.isValid,
                onclick: this.actions.saveData,
            } as Maquette.VNodeProperties,
            "Save"),
        ]);
    }
}
