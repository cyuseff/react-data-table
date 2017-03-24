import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import Wrapper from 'Wrapper';
import QueryFilter from 'components/FilterBar/Filters/QueryFilter';

const spy = sinon.spy();
const props = {
    value: 'name',
    callback: spy
};

let W;
let C;
let div;
let input;

describe('QueryFilter specs', () => {
    describe('Case: enabled', () => {
        before(() => {
            W = Wrapper(QueryFilter, props);
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-query-filter');
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it('Should contains a input field', () => {
            input = div.querySelector('input');
            expect(input).to.exist;
        });

        it(`Input field should value should be "${props.value}"`, () => {
            expect(input.value).to.be.equal(props.value);
        });

        it('Input field should be enabled', () => {
            expect(input.disabled).to.be.false;
        });

        it('When input value change, "callback" func should be called', () => {
            expect(spy.called).to.be.false;
            TestUtils.Simulate.change(input);
            expect(spy.called).to.be.true;
            expect(spy.args[0][0].target.value).to.be.equal(props.value);
        });
    });

    describe('Case: disabled', () => {
        before(() => {
            W = Wrapper(QueryFilter, Object.assign({}, props, { disabled: true }));
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-query-filter');
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it('Should contains a input field', () => {
            input = div.querySelector('input');
            expect(input).to.exist;
        });

        it(`Input field should value should be "${props.value}"`, () => {
            expect(input.value).to.be.equal(props.value);
        });

        it('Input field should be disabled', () => {
            expect(input.disabled).to.be.true;
        });
    });
});
