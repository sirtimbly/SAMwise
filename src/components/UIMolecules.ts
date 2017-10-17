import * as Maquette from "maquette";
const h = Maquette.h;

/*
Molecules are more specific than Atoms and have some more complicated layout or logic
and we expect them to be somewhat less reusable than Atoms but still not referring
to any specific actions or models from the app implementation.
*/

/**
 * Slider is a component with heading and a range input that changes either fulltime or parttime values
 */
export const UISlider = (label: string, count: number, changeAction: (e: Event) => void, max: number = 100) => {
    const uName = "range_" + encodeURIComponent(label);
    return h("div.flex.bg-light-gray.p2.m1.flex-reverse",
    [
        h("input.col-8", {
            max: max || 100,
            min: "0",
            name: uName,
            onchange: changeAction,
            type: "range",
            value: count.toString(),
        } as Maquette.VNodeProperties),
        [h("label.title.col-4.px2",
        {for: uName},
        count + " " + label + " shifts assigned.")],
    ]);
};
