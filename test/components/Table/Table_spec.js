import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Wrapper from 'Wrapper';
import Table from 'components/Table/Table';

const props = {
    rowKey: 'id',
    cols: [
        { key: 'id', name: 'ID' },
        { key: 'name', name: 'Name' }
    ],
    data: [
        { id: 0, name: 'User000' },
        { id: 1, name: 'User001' },
        { id: 2, name: 'User002' }
    ],
    clickHandler: row => console.log("table", row)
};

let W;
let C;
let div;

describe('Table specs', () => {
    describe('Case: valid data', () => {
        before(() => {
            W = Wrapper(Table, props);
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-table');
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it(`Should have a Header with ${props.cols.length} elements`, () => {
            const header = div.querySelector('.ui-row.header');
            expect(header).to.exist;
        });

        it(`Should have ${props.data.length} rows`, () => {
            const rows = div.querySelectorAll('.ui-table-body > div');
            for (let i = 0, l = rows.length; i < l; i++) {
                expect(rows[i].innerHTML).to.contains(props.data[i].name);
            }
        });
    });

    describe('Case: no data', () => {
        before(() => {
            W = Wrapper(Table, Object.assign({}, props, { data: [] }));
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-table');
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it(`Should have a Header with ${props.cols.length} elements`, () => {
            const header = div.querySelector('.ui-row.header');
            expect(header).to.exist;
        });

        it(`Should have an empty message`, () => {
            const row = div.querySelector('.ui-table-body > .ui-row-empty');
            expect(row.innerHTML).to.contains('No match');
        });
    });

    describe('Case: loading', () => {
        before(() => {
            W = Wrapper(Table, Object.assign({}, props, { data: null }));
            C = TestUtils.renderIntoDocument(<W />);
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-table');
        });

        it('Should be renderer', () => {
            expect(div).to.exist;
        });

        it(`Should have a Header with ${props.cols.length} elements`, () => {
            const header = div.querySelector('.ui-row.header');
            expect(header).to.exist;
        });

        it('Should render a Loader component', () => {
            const row = div.querySelector('.ui-table-body .ui-loader');
            expect(row).to.exist;
            expect(row.innerHTML).to.contains('Loading');
        });
    });
});
