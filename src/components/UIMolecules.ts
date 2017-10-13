import * as Mithril from 'mithril';

let m = Mithril;

/*
Molecules are more specific than Atoms and have some more complicated layout or logic
and we expect them to be somewhat less reusable than Atoms but still not referring 
to any specific actions or models from the app implementation.
*/

/**
 * Slider is a component with heading and a range input that changes either fulltime or parttime values
 */
export const UISlider = function (label:string, count:number, changeAction:(value:number)=>void) {
    let uName = "range_"+encodeURIComponent(label);
    return m("div.flex.bg-light-gray.p2.flex-reverse", 
    [    
        m("input.col-4", {
            type: "range",
            min: "0",
            max: "100",
            name: uName,
            value: count,
            onchange: (e) => {changeAction(e.target.value)}
        }),
        m("label.title.col-3.px2", 
        {for: uName},
        count + " " + label + " shifts assigned.")
    ])
}
