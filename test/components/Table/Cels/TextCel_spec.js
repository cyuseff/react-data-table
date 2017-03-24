import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Wrapper from 'Wrapper';
import TextCel from 'components/Table/Cels/TextCel';

const TEXT = "Hello cel";

const W = Wrapper(TextCel, { value: TEXT });
const C = TestUtils.renderIntoDocument(<W />);
const div = TestUtils.findRenderedDOMComponentWithTag(C, 'div');

describe('TextCel spec', () => {
    it('Should be renderer', () => {
        console.log(div);
        expect(div).to.exist;
    });

    it('Cel should have the class col', () => {
        expect(div.className).to.contain('col');
    });

    it(`Component text should be equal to '${TEXT}'`, () => {
        expect(div.innerHTML).to.be.equal(TEXT);
    });
});
