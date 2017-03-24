import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import axios from 'axios';
import * as Actions from 'components/FilterBar/actions';
import FilterBar from 'components/FilterBar/FilterBar';

const spy = sinon.spy();
const props = {
    filters: [
        {
            type: 'DropDownFilter',
            key: 'policy',
            label: 'Policy',
            multiple: true,
            opts: [
                { label: 'Policy001', value: 'policy-001' },
                { label: 'Policy002', value: 'policy-002' },
                { label: 'Policy003', value: 'policy-003' },
                { label: 'Policy004', value: 'policy-004' },
                { label: 'Policy005', value: 'policy-005' }
            ]
        },
        {
            type: 'DropDownFilter',
            key: 'labels',
            label: 'Labels',
            url: '/endpoint',
            opts: []
        },
        {
            type: 'QueryFilter',
            key: 'query',
            value: ''
        }
    ],
    callback: spy,
    disabled: false
};

const fakeData = {
    data: [
        { label: 'Labels001', value: 'label-001' },
        { label: 'Labels001', value: 'label-002' },
    ]
};
let stub;
let C;
let div;
let list;

describe('FilterBar specs', () => {
    describe('Case: loading state', () => {
        let pStub;
        before(() => {
            //
            pStub = sinon.stub(Actions, 'createPromises')
                .returns([1]);

            // stub life cycle method to test loading state
            stub = sinon.stub(FilterBar.prototype, 'componentDidMount')
                .returns(null);

            C = TestUtils.renderIntoDocument(<FilterBar {...props} />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-filter-bar');
        });

        after(() => {
            pStub.restore();
            stub.restore();
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it(`Should contains a list of ${props.filters.length} filters`, () => {
            list = div.querySelectorAll('.ui-filter-bar-list > li > div');
            expect(list).to.have.lengthOf(props.filters.length);
        });

        it('Filter list should be the correct type', () => {
            const classes = ['ui-dropdown-filter', 'ui-dropdown-filter', 'ui-query-filter'];
            for (let i = 0, l = classes.length; i < l; i++) {
                expect(list[i].className).to.contain(classes[i]);
            }
        });

        it('FilterBar "state.ready" should be false', () => {
            expect(C.state).to.have.property('ready', false);
        });

        it('Filters should be disabled', () => {
            expect(list[0].querySelector('button').disabled).to.be.true;
            expect(list[1].querySelector('button').disabled).to.be.true;
            expect(list[2].querySelector('input').disabled).to.be.true;
        });
    });

    describe('Case: loaded', () => {
        before(done => {
            // stub life cycle method to test loading state
            stub = sinon.stub(axios, 'get')
                .returns(Promise.resolve({ data: [] }));

            C = TestUtils.renderIntoDocument(<FilterBar {...props} />);
            setTimeout(() => {
                div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-filter-bar');
                done();
            }, 100);
        });

        after(() => {
            stub.restore();
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it(`Should contains a list of ${props.filters.length} filters`, () => {
            list = div.querySelectorAll('.ui-filter-bar-list > li > div');
            expect(list).to.have.lengthOf(props.filters.length);
        });

        it('Filter list should be the correct type', () => {
            const classes = ['ui-dropdown-filter', 'ui-dropdown-filter', 'ui-query-filter'];
            for (let i = 0, l = classes.length; i < l; i++) {
                expect(list[i].className).to.contain(classes[i]);
            }
        });

        it('FilterBar state "should.ready" should be true', () => {
            expect(C.state).to.have.property('ready', true);
        });

        it('Filters should be enabled', () => {
            expect(list[0].querySelector('button').disabled).to.be.false;
            expect(list[1].querySelector('button').disabled).to.be.false;
            expect(list[2].querySelector('input').disabled).to.be.false;
        });

        it('When a filter is updated, "callback" function should be called with the proper query', () => {
            let query;
            expect(spy.called).to.be.false;

            const opts = list[0].querySelectorAll('.dropdown-menu li');
            expect(opts).to.have.lengthOf(props.filters[0].opts.length);

            // click on filter[0].option[0]
            TestUtils.Simulate.click(opts[0]);
            expect(spy.called).to.be.true;
            expect(spy.callCount).to.be.equal(1);
            query = spy.args[0][0];
            expect(query).to.be.equal('policy=policy-001');

            // click on filter[0].option[2]
            TestUtils.Simulate.click(opts[2]);
            expect(spy.callCount).to.be.equal(2);
            query = spy.args[1][0];
            expect(query).to.be.equal('policy=policy-001,policy-003');

            // click on filter[0].option[0]
            TestUtils.Simulate.click(opts[0]);
            expect(spy.callCount).to.be.equal(3);
            query = spy.args[2][0];
            expect(query).to.be.equal('policy=policy-003');

            // change input value on filter[2]
            const input = list[2].querySelector('input');
            expect(input).to.exist;

            input.value = 'lalala';
            TestUtils.Simulate.change(input);
            expect(spy.callCount).to.be.equal(4);
            query = spy.args[3][0];
            expect(query).to.be.equal('policy=policy-003&query=lalala');
        });

        it('Check component state after filter changes', () => {
            expect(C.state).to.have.property('query', 'policy=policy-003&query=lalala');
        });
    });

    describe('Case: disabled', () => {
        before(done => {
            // stub life cycle method to test loading state
            stub = sinon.stub(axios, 'get')
                .returns(Promise.resolve({ data: [] }));

            const pp = Object.assign({}, props, { disabled: true });
            C = TestUtils.renderIntoDocument(<FilterBar {...pp} />);

            setTimeout(() => {
                div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-filter-bar');
                done();
            }, 100);
        });

        after(() => {
            stub.restore();
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it(`Should contains a list of ${props.filters.length} filters`, () => {
            list = div.querySelectorAll('.ui-filter-bar-list > li > div');
            expect(list).to.have.lengthOf(props.filters.length);
        });

        it('Filter list should be the correct type', () => {
            const classes = ['ui-dropdown-filter', 'ui-dropdown-filter', 'ui-query-filter'];
            for (let i = 0, l = classes.length; i < l; i++) {
                expect(list[i].className).to.contain(classes[i]);
            }
        });

        it('FilterBar state "should.ready" should be true', () => {
            expect(C.state).to.have.property('ready', true);
        });

        it('Filters should be disabled', () => {
            expect(list[0].querySelector('button').disabled).to.be.true;
            expect(list[1].querySelector('button').disabled).to.be.true;
            expect(list[2].querySelector('input').disabled).to.be.true;
        });
    });
});
