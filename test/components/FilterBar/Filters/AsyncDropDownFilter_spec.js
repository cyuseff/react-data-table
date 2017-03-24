import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import axios from 'axios';
import AsyncDropDownFilter from 'components/FilterBar/Filters/AsyncDropDownFilter';

const callSpy = sinon.spy();
const props = {
    mapData: data => data,
    url: '/fake-url',
    label: 'Async',
    callback: callSpy
};
const spy = sinon.spy(props, 'mapData');

let stub;
let C;
let div;
let btn;
let list;

describe('AsyncDropDownFilter specs', () => {
    describe('Case: loading state', () => {
        before(done => {
            // stub life cycle method to test loading state
            stub = sinon.stub(AsyncDropDownFilter.prototype, 'componentDidMount')
                .returns(null);

            C = TestUtils.renderIntoDocument(<AsyncDropDownFilter {...props} />);

            // give React time to execute life cycle methods
            setTimeout(() => {
                div = TestUtils.findRenderedDOMComponentWithClass(C, 'dropdown');
                done();
            }, 100);
        });

        after(() => {
            stub.restore();
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it('"state.opts" should be null', () => {
            expect(C.state.opts).to.be.null;
        });

        it('Should contains a actions Button', () => {
            btn = div.querySelector('button.btn.btn-default');
            expect(btn).to.exist;
        });

        it('Button should be disabled', () => {
            expect(btn.disabled).to.be.true;
        });

        it('Button text should reflect loading state', () => {
            expect(btn.innerHTML).to.contains(props.label, 'loading...');
        });

        it('Should not contains a list of elements', () => {
            list = div.querySelectorAll('.dropdown-menu li');
            expect(list).to.have.lengthOf(0);
        });
    });

    describe('Case: data loaded', () => {
        const fakeData = {
            data: [
                { label: 'Filter001', value: 'filter-001' },
                { label: 'Filter002', value: 'filter-002' },
                { label: 'Filter003', value: 'filter-003' }
            ]
        };

        before(done => {
            // stub ajax call
            stub = sinon.stub(axios, 'get')
                .returns(Promise.resolve(fakeData));

            C = TestUtils.renderIntoDocument(<AsyncDropDownFilter {...props} />);

            // give React time to execute life cycle methods
            setTimeout(() => {
                div = TestUtils.findRenderedDOMComponentWithClass(C, 'dropdown');
                done();
            }, 100);
        });

        after(() => {
            stub.restore();
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it('When component is render, should fetch data from "props.url"', () => {
            expect(stub.called).to.be.true;
            expect(stub.args[0][0]).to.be.equal(props.url);
        });

        it('"state.opts" should be an array', () => {
            expect(C.state.opts).to.be.instanceof(Array);
        });

        it('"props.mapData" should be called', () => {
            expect(spy.called).to.be.true;
            expect(spy.args[0][0]).to.be.equal(fakeData.data);
        });

        it('Should contains a actions Button', () => {
            btn = div.querySelector('button.btn.btn-default');
            expect(btn).to.exist;
        });

        it('Button should be enabled', () => {
            expect(btn.disabled).to.be.false;
        });

        it(`Should contains a list of ${fakeData.data.length} elements`, () => {
            list = div.querySelectorAll('.dropdown-menu li');
            expect(list).to.have.lengthOf(fakeData.data.length);
        });

        it('When a item is clicked, "callback" func should be called', () => {
            expect(callSpy.called).to.be.false;

            TestUtils.Simulate.click(list[0]);
            expect(callSpy.called).to.be.true;
            expect(callSpy.callCount).to.be.equal(1);
            expect(callSpy.args[0][0]).to.be.equal(fakeData.data[0]);
        });
    });

    describe('Case: state disabled', () => {
        const fakeData = {
            data: [
                { label: 'Filter001', value: 'filter-001' },
                { label: 'Filter002', value: 'filter-002' },
                { label: 'Filter003', value: 'filter-003' }
            ]
        };

        before(done => {
            // stub ajax call
            stub = sinon.stub(axios, 'get')
                .returns(Promise.resolve(fakeData));

            const p = Object.assign({}, props, { disabled: true });
            C = TestUtils.renderIntoDocument(<AsyncDropDownFilter {...p} />);

            // give React time to execute life cycle methods
            setTimeout(() => {
                div = TestUtils.findRenderedDOMComponentWithClass(C, 'dropdown');
                done();
            }, 100);
        });

        after(() => {
            stub.restore();
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it('Should contains a actions Button', () => {
            btn = div.querySelector('button.btn.btn-default');
            expect(btn).to.exist;
        });

        it('Button should be disabled', () => {
            expect(btn.disabled).to.be.true;
        });
    });
});
