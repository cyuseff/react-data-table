import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import Wrapper from 'Wrapper';
import DropDownFilter, { getLabel } from 'components/FilterBar/Filters/DropDownFilter';

const spy = sinon.spy();
const props = {
    label: 'Filter001',
    opts: [
        { label: 'Filter001', value: 'filter-001' },
        { label: 'Filter002', value: 'filter-002' },
        { label: 'Filter003', value: 'filter-003' }
    ],
    callback: spy
};

let W;
let C;
let div;
let btn;
let list;

describe('DropDownFilter specs', () => {
    describe('Case: enabled', () => {
        before(() => {
            W = Wrapper(DropDownFilter, props);
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-dropdown-filter');
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it('Should contains a actions Button', () => {
            btn = div.querySelector('button.btn.btn-default');
            expect(btn).to.exist;
        });

        it('Button should be enabled', () => {
            expect(btn.disabled).to.be.false;
        });

        it('Btn label should be equal to the result of props.label + "getLabel" fnc', () => {
            const reg = new RegExp(`^<strong>.*?(${props.label}).*?:.*?</strong>.*?(${getLabel(props.opts)})`);
            expect(reg.test(btn.innerHTML)).to.be.true;
        });

        it(`Dropdown should contains a list with ${props.opts.length} items`, () => {
            list = div.querySelectorAll('ul > li');
            expect(list).to.have.lengthOf(props.opts.length);
        });

        it('List should successfully map props.opts', () => {
            for(let i = 0, l = list.length; i < l; i++) {
                expect(list[i].innerHTML).to.contains(props.opts[i].label);
            }
        });

        it('When a list item is clicked, should call "callback" func with the item', () => {
            expect(spy.called).to.be.false;

            TestUtils.Simulate.click(list[0]);
            expect(spy.called).to.be.true;
            expect(spy.args[0][0]).to.equal(props.opts[0])
        });
    });

    describe('Case: disabled', () => {
        before(() => {
            W = Wrapper(DropDownFilter, Object.assign({}, props, { disabled: true }));
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-dropdown-filter');
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

    describe('"getLabel" func specs', () => {
        it('If no opts is checked, should return default text', () => {
            const opts = [
                { label: 'Label001' },
                { label: 'Label002' },
                { label: 'Label003' }
            ];
            const str = getLabel(opts);
            expect(str).to.be.equal('All');
        });

        it('If one opts is checked, should return the opt label', () => {
            const opts = [
                { label: 'Label001' },
                { label: 'Label002', checked: true },
                { label: 'Label003' }
            ];
            const str = getLabel(opts);
            expect(str).to.be.equal(opts[1].label);
        });

        it('If more than one opts is checked, should concat their labels', () => {
            const opts = [
                { label: 'Label001', checked: true },
                { label: 'Label002' },
                { label: 'Label003', checked: true }
            ];
            const str = getLabel(opts);
            expect(str).to.be.equal(`${opts[0].label}, ${opts[2].label}`);
        });
    });
});
