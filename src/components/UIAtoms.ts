import * as Maquette from "maquette";
const h = Maquette.h;
// let m = Mithril;

/*
Atoms are very generic and abstract so that they can be reused in the most places.
They know nothing about where they will be implemented, the shape of the model, or
the details of the action functions they call.
*/

/**
 * UIProgressBar
 * @param value
 * @param max
 * @param label
 */
export const UIProgressBar = (value: number, max: number, label?: string) => {
    return h("div.guage-item.flex.px2", [
        h("progress.mx1.col-8", {
            max,
            value: value.toString(),
        }),
        label ? h("span.bold.ml2", label) : "",
    ]);
};

/**
 * UITab
 * @param label string which displays in the tab
 * @param active if the tab is currently selected
 * @param action the click action function to call, will be passed nothing
 */
export const UITab = (label: string, active: boolean, action: () => void) => {
    return h("button.btn.btn-lg.mt1.mr1.rounded-top", {
            classes: {
                "bg-blue": active,
                "bg-light-gray": !active,
            },
            onclick: action,
    }, label);
};
