import * as m from 'mithril'
import {tidy} from '../test-helper'

import {UISlider} from '../src/components/UIMolecules'
import * as mq from 'mithril-query'

describe("UISlider", () => {
  it("should have text", () => {
    const cmp = UISlider('widget', 5, () => {}, 10);
    const output = mq(cmp);
    expect(output.contains('widget')).toBeTruthy();

    const html = tidy(cmp);
    expect(html).toMatchSnapshot();
  });
  it ("should change value", () => {
    let sliderValue = 5;
    const cmp = UISlider('widget', sliderValue, (val:any) => sliderValue = Number.parseInt(val), 10);
    const output = mq(cmp);
    output.setValue('input', "8");
    expect(sliderValue).toBe(8);
  })
});