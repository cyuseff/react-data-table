import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Wrapper from 'Wrapper';
import HtmlCel from 'components/Table/Cels/HtmlCel';

const TEXT = "Hello cel";

const W = Wrapper(HtmlCel, { value: TEXT });
const C = TestUtils.renderIntoDocument(<W />);
const div = TestUtils.findRenderedDOMComponentWithTag(C, 'div');

describe('HtmlCel spec', () => {
    it('Should be renderer', () => {
        expect(div).to.exist;
    });

    it('Cel should have the class col', () => {
        expect(div.className).to.contain('col');
    });

    it(`Component text should be equal to '${TEXT}'`, () => {
        expect(div.innerHTML).to.be.equal(TEXT);
    });
});
