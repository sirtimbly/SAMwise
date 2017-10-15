import {tidy} from '../test-helper'
import { AppViewComponents} from '../src/components/AppViewComponents'
import { AssignmentModel, AssignmentProps } from '../src/models/assignment_model';
import { App, State, Model, Action } from '../src/samwise';
import * as m from 'mithril';
import mq from 'mithril-query'


describe("App", () => {
    it("should have footer", () => {
        var app = new App
        var components = new AppViewComponents(app);
        var cmp = m(components.Edit, <AssignmentProps>{
            fulltime:20,
            parttime:30,
            requested:80,
            isEditing: true
            });
        expect(cmp)
        //var output = mq(cmp);
        //expect(output.contains('50 of 80'));
        const html = tidy(cmp);
        expect(html).toMatchSnapshot();
    });
})