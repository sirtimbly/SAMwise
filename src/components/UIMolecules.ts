import * as m from 'mithril';

// let m = Mithril;

/*
Molecules are more specific than Atoms and have some more complicated layout or logic
and we expect them to be somewhat less reusable than Atoms but still not referring 
to any specific actions or models from the app implementation.
*/

/**
 * Slider is a component with heading and a range input that changes either fulltime or parttime values
 */
export const UISlider = function (label:string, count:number, changeAction:(value:number)=>void, max:number = 100) {
    let uName = "range_"+encodeURIComponent(label);
    return m("div.flex.bg-light-gray.p2.m1.flex-reverse", 
    [    
        m("input.col-8", {
            type: "range",
            min: "0",
            max: max || 100,
            name: uName,
            value: count,
            onchange: (e) => {changeAction(e.target.value)}
        }),
        m("label.title.col-4.px2", 
        {for: uName},
        count + " " + label + " shifts assigned.")
    ])
}
