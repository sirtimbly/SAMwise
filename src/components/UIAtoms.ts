import * as Mithril from 'mithril';

let m = Mithril;

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
export const UIProgressBar = function(value:number, max:number, label?:string) {
    return m('div.guage-item.flex.px2', [
        m('progress.col.col-4.mr2', {
            value: (value),
            max: max
        }),
        label ? m('span.bold', label) : ''
    ])
}

/**
 * UITab
 * @param label string which displays in the tab
 * @param active if the tab is currently selected
 * @param action the click action function to call, will be passed nothing
 */
export const UITab = function(label:string, active:boolean, action:()=>void) {
    return m("button.btn.col-2.mt1.mr1.btn-large.rounded-top", {
        class: active ? 'bg-blue' : 'bg-light-gray',
        onclick: (e) => {action()}
    }, label)
}