import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';

import Wrapper from 'Wrapper';
import Row, { mapCelData } from 'components/Table/Row';
import TextCel from 'components/Table/Cels/TextCel';
import HtmlCel from 'components/Table/Cels/HtmlCel';

const row = {
    id: 1,
    name: 'Row001',
    time: 1489930363966
};

const formatDate = n => {
    const d = new Date(n);
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
};

const cols = [
    { key: 'id', name: 'ID' },
    { key: 'name', name: 'Name' },
    {
        key: 'time',
        name: 'Time',
        template: r => formatDate(r.time)
    }
];

const spy = sinon.spy();

const W = Wrapper(Row, { row, cols, clickHandler: spy });
const C = TestUtils.renderIntoDocument(<W />);
const div = TestUtils.findRenderedDOMComponentWithClass(C, 'ui-row');

describe('Row specs', () => {
    it('Should be renderer', () => {
        expect(div).to.exist;
    });

    it(`Should have ${cols.length} cels`, () => {
        const list = div.querySelectorAll('div.col');
        expect(list).to.have.lengthOf(cols.length);
    });

    it('Cels should be render with the correct info', () => {
        const list = div.querySelectorAll('div.col');
        expect(list[0].innerHTML).to.be.equal(row.id.toString());
        expect(list[1].innerHTML).to.be.equal(row.name);
        expect(list[2].innerHTML).to.be.equal(formatDate(row.time));
    });

    it('When the row is clicked, clickHandle should be called with row data', () => {
        expect(spy.called).to.be.false;

        TestUtils.Simulate.click(div);
        expect(spy.called).to.be.true;
        expect(spy.firstCall.args[0]).to.be.equal(row);
    });

    describe('mapCelData func specs', () => {
        const cells = mapCelData(row, cols);

        it('First cell should be a TextCel', () => {
            expect(TestUtils.isElementOfType(cells[0], TextCel)).to.be.true;
        });

        it('Second cell should be a TextCel', () => {
            expect(TestUtils.isElementOfType(cells[1], TextCel)).to.be.true;
        });

        it('Third cell should be a HtmlCel', () => {
            expect(TestUtils.isElementOfType(cells[2], HtmlCel)).to.be.true;
        });
    });
});
