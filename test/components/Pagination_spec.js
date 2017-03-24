import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import Wrapper from 'Wrapper';
import Pagination from 'components/Pagination';


const spy = sinon.spy();
const props = {
    count: 101,
    next: '/next-url',
    previous: '/previous-url',
    callback: spy
};

let W;
let C;
let div;
let links;

describe('Pagination spec', () => {
    describe('Case: both link enabled', () => {
        before(() =>  {
            W = Wrapper(Pagination, props);
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-pagination');
        });

        after(() => {
            spy.reset();
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it(`Should render the total number of elements (${props.count})`, () => {
            const count = div.querySelector('.count');
            expect(count.innerHTML).to.contains(props.count);
        });

        it('Should render the links btns', () => {
            links = div.querySelectorAll('.ui-pagination-links li');
            expect(links).to.have.lengthOf(2);
            expect(links[0].innerHTML).to.contains('prev');
            expect(links[1].innerHTML).to.contains('next');
        });

        it('Both links should be enabled', () => {
            expect(links[0].className).to.not.contains('disabled');
            expect(links[1].className).to.not.contains('disabled');
        });

        it('When a link is clicked, the "callback" fnc should be called', () => {
            expect(spy.called).to.be.false;
            
            TestUtils.Simulate.click(links[0]);
            expect(spy.called).to.be.true;
            expect(spy.callCount).to.be.equal(1);
            expect(spy.args[0][0]).to.be.equal(props.previous);

            TestUtils.Simulate.click(links[1]);
            expect(spy.callCount).to.be.equal(2);
            expect(spy.args[1][0]).to.be.equal(props.next);
        });
    });

    describe('Case: prev disabled, next enabled', () => {
        before(() =>  {
            W = Wrapper(Pagination, Object.assign({}, props, { previous: '' }));
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-pagination');
        });

        after(() => {
            spy.reset();
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it(`Should render the total number of elements (${props.count})`, () => {
            const count = div.querySelector('.count');
            expect(count.innerHTML).to.contains(props.count);
        });

        it('Should render the links btns', () => {
            links = div.querySelectorAll('.ui-pagination-links li');
            expect(links).to.have.lengthOf(2);
            expect(links[0].innerHTML).to.contains('prev');
            expect(links[1].innerHTML).to.contains('next');
        });

        it('Prev link should be disabled', () => {
            expect(links[0].className).to.contains('disabled');
        });

        it('Next link should be enabled', () => {
            expect(links[1].className).to.not.contains('disabled');
        });

        it('When a prev link is clicked, should not trigger the callback', () => {
            expect(spy.called).to.be.false;
            
            TestUtils.Simulate.click(links[0]);
            expect(spy.called).to.be.false;
            expect(spy.callCount).to.be.equal(0);
        });

        it('When a next link is clicked, should trigger the callback', () => {
            expect(spy.called).to.be.false;
            
            TestUtils.Simulate.click(links[1]);
            expect(spy.called).to.be.true;
            expect(spy.callCount).to.be.equal(1);
            expect(spy.args[0][0]).to.be.equal(props.next);
        });
    });

    describe('Case: prev enabled, next disabled', () => {
        before(() =>  {
            W = Wrapper(Pagination, Object.assign({}, props, { next: '' }));
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-pagination');
        });

        after(() => {
            spy.reset();
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it(`Should render the total number of elements (${props.count})`, () => {
            const count = div.querySelector('.count');
            expect(count.innerHTML).to.contains(props.count);
        });

        it('Should render the links btns', () => {
            links = div.querySelectorAll('.ui-pagination-links li');
            expect(links).to.have.lengthOf(2);
            expect(links[0].innerHTML).to.contains('prev');
            expect(links[1].innerHTML).to.contains('next');
        });

        it('Prev link should be enabled', () => {
            expect(links[0].className).to.not.contains('disabled');
        });

        it('Next link should be disabled', () => {
            expect(links[1].className).to.contains('disabled');
        });

        it('When a prev link is clicked, should not trigger the callback', () => {
            expect(spy.called).to.be.false;
            
            TestUtils.Simulate.click(links[0]);
            expect(spy.called).to.be.true;
            expect(spy.callCount).to.be.equal(1);
            expect(spy.args[0][0]).to.be.equal(props.previous);
        });

        it('When a next link is clicked, should trigger the callback', () => {
            TestUtils.Simulate.click(links[1]);
            expect(spy.callCount).to.be.equal(1);
            expect(spy.args[0]).to.have.lengthOf(1);
        });
    });

    describe('Case: both disabled', () => {
        before(() =>  {
            W = Wrapper(Pagination, Object.assign({}, props, { next: '', previous: '' }));
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-pagination');
        });

        after(() => {
            spy.reset();
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it(`Should render the total number of elements (${props.count})`, () => {
            const count = div.querySelector('.count');
            expect(count.innerHTML).to.contains(props.count);
        });

        it('Should render the links btns', () => {
            links = div.querySelectorAll('.ui-pagination-links li');
            expect(links).to.have.lengthOf(2);
            expect(links[0].innerHTML).to.contains('prev');
            expect(links[1].innerHTML).to.contains('next');
        });

        it('Prev link should be disabled', () => {
            expect(links[0].className).to.contains('disabled');
        });

        it('Next link should be disabled', () => {
            expect(links[1].className).to.contains('disabled');
        });

        it('When a prev link is clicked, should not trigger the callback', () => {
            expect(spy.called).to.be.false;
            TestUtils.Simulate.click(links[0]);
            expect(spy.called).to.be.false;
        });

        it('When a next link is clicked, should not trigger the callback', () => {
            expect(spy.called).to.be.false;
            TestUtils.Simulate.click(links[1]);
            expect(spy.called).to.be.false;
        });
    });
});
