import * as m from "mithril";
import {tidy} from '../test-helper'

import {UITab} from '../src/components/UIAtoms'
import * as mq from 'mithril-query'

describe("UITab", () => {
  it("should have text", () => {
    const cmp = UITab('hello tab', true, () => {});
    const output = mq(cmp);
    expect(output.contains('hello tab')).toBeTruthy();

    const html = tidy(cmp);
    expect(html).toMatchSnapshot();
  });
  it ("should be clickable", () => {
    let actionTriggered = false;
    const cmp = UITab('hello tab', actionTriggered, () => {actionTriggered = true});
    const output = mq(cmp);
    output.click('button')
    expect(actionTriggered).toBeTruthy();
  })
});