import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Wrapper from 'Wrapper';
import Loader from 'components/Loader';

const W = Wrapper(Loader, {});
const C = TestUtils.renderIntoDocument(<W />);
const div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-loader');

const MSG = 'Loading...';

describe('Loader spec', () => {
    it('Should be renderer', () => {
        expect(div).to.exist;
    });

    it(`Should render the text "${MSG}`, () => {
        expect(div.innerHTML).to.contains(MSG);
    });
});
