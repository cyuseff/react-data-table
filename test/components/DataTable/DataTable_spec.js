import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import axios from 'axios';
import DataTable from 'components/DataTable/DataTable';

const spy = sinon.spy();
const props = {
    url: '/fake-url',
    rowKey: 'id',
    cols: [
        { key: 'id', name: 'ID' },
        { key: 'name', name: 'Name' }
    ],
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
            type: 'QueryFilter',
            key: 'query',
            value: ''
        }
    ],
    mapData: obj => obj,
    clickHandler: spy
};

const fakeData = {
    data: [
        { id: 0, name: 'Name001' },
        { id: 1, name: 'Name002' },
        { id: 2, name: 'Name003' },
        { id: 3, name: 'Name004' }
    ]
};

let stub;
let C;
let div;

describe('DataTable spec', () => {
    before(done => {
        stub = sinon
            .stub(axios, 'get')
            .returns(Promise.resolve(fakeData));

        C = TestUtils.renderIntoDocument(<DataTable {...props} />);

        setTimeout(() => {
            div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-data-table');
            done();
        });
    });
    after(() => {
        stub.restore();
    });

    it('Should be renderer', () => {
        expect(div).to.exist;
    });

    it('Should render a Pagination component', () => {
        const p = div.querySelector('.ui-pagination');
        expect(p).to.exist;
    });

    it(`Should render a FilterBar component with ${props.filters.length} filters`, () => {
        const bar = div.querySelector('.ui-filter-bar');
        expect(bar).to.exist;

        const filters = bar.querySelectorAll('.ui-filter-bar-list > li');
        expect(filters).to.have.lengthOf(props.filters.length);
    });

    it(`Should render a Table component with ${props.cols.length} columns and ${fakeData.data.length} rows`, () => {
        const table = div.querySelector('.ui-table');
        expect(table).to.exist;

        const cols = table.querySelectorAll('.ui-row.header > div.col');
        expect(cols).to.have.lengthOf(props.cols.length);

        const rows = table.querySelectorAll('.ui-table-body > div.ui-row');
        expect(rows).to.have.lengthOf(fakeData.data.length);
    });

    it('When a row is clicked, "callback" func is called', () => {
        expect(spy.called).to.be.false;

        const row = div.querySelector('.ui-table-body > div.ui-row');
        TestUtils.Simulate.click(row);

        expect(spy.called).to.be.true;
        expect(spy.callCount).to.be.equal(1);
        expect(spy.args[0][0]).to.be.equal(fakeData.data[0]);
    });
});
