import { expect } from 'chai';
import sinon from 'sinon';

import axios from 'axios';
import { fetchData } from 'components/DataTable/actions';

const r0 = {
    data: {
        models: [
            { id: 0, name: 'Name001' },
            { id: 1, name: 'Name002' },
            { id: 2, name: 'Name003' },
            { id: 3, name: 'Name004' }
        ],
        count: 4,
        next: '/next-url',
        previous: '/previous-url'
    }
};

const r1 = {
    data: {
        models: [
            { id: 0, name: 'Name001' },
            { id: 1, name: 'Name002' },
            { id: 2, name: 'Name003' },
            { id: 3, name: 'Name004' }
        ]
    }
};

const customError = new Error('Custom error');

let stub;

describe('DataTable actions specs', () => {
    describe('"fetchData" func', () => {
        before(() => {
            stub = sinon.stub(axios, 'get')
                .onCall(0).returns(Promise.resolve(r0))
                .onCall(1).returns(Promise.resolve(r1))
                .onCall(2).rejects(customError);
        });

        after(() => {
            stub.restore();
        });

        it('Case: 0', () => {
            const url = '/url-0';
            const mapData = data => data.models;
            return fetchData(url, mapData)
                .then(state => {
                    expect(stub.callCount).to.be.equal(1);
                    expect(stub.args[0][0]).to.be.equal(url);

                    const { data, pagination } = state;

                    expect(data).to.be.instanceof(Array);
                    expect(data).to.have.lengthOf(r0.data.models.length);

                    expect(pagination).to.be.instanceof(Object);
                    expect(pagination).to.have.property('count', r0.data.count);
                    expect(pagination).to.have.property('next', r0.data.next);
                    expect(pagination).to.have.property('previous', r0.data.previous);
                });
        });

        it('Case: 1', () => {
            const url = '/url-1';
            const mapData = data => data.models;
            return fetchData(url, mapData)
                .then(state => {
                    expect(stub.callCount).to.be.equal(2);
                    expect(stub.args[1][0]).to.be.equal(url);

                    const { data, pagination } = state;

                    expect(data).to.be.instanceof(Array);
                    expect(data).to.have.lengthOf(r0.data.models.length);

                    expect(pagination).to.be.instanceof(Object);
                    expect(pagination).to.have.property('count', undefined);
                    expect(pagination).to.have.property('next', undefined);
                    expect(pagination).to.have.property('previous', undefined);
                });
        });

        it('Case: error', () => {
            const url = '/error-url';
            const mapData = data => data.models;
            return fetchData(url, mapData)
                .then(errObject => {
                    throw errObject;
                })
                .catch(errObject => {
                    expect(stub.callCount).to.be.equal(3);
                    expect(stub.args[2][0]).to.be.equal(url);

                    const { err, canceled } = errObject;
                    expect(err).to.be.instanceof(Error);
                    expect(canceled).to.be.false;
                });
        });
    });
});
