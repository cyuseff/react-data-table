import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Wrapper from 'Wrapper';
import Header from 'components/Table/Header';

const cols = [
    { name: 'Col000', key: 0 },
    { name: 'Col001', key: 1 },
    { name: 'Col002', key: 2 },
    { name: 'Col003', key: 3 }
];

const W = Wrapper(Header, { cols });
const C = TestUtils.renderIntoDocument(<W />);
const div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-row');

describe('Header spec', () => {
    it('Should be renderer', () => {
        expect(div).to.exist;
    });

    it(`Should have ${cols.length} cels`, () => {
        const list = div.querySelectorAll('div.col');

        expect(list).to.have.lengthOf(cols.length);

        for (let i = 0, l = list.length; i < l; i++) {
            expect(list[i].innerHTML).to.be.equal(cols[i].name);
        }
    });
});
