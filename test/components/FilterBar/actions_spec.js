import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import {
    getQueryFilters,
    updateDropdown,
    updateFilters,
    createPromises,
    getAsynOpts
} from 'components/FilterBar/actions';

describe('Filter accions specs', () => {
    describe('"getQueryFilters" func', () => {
        it('Should return a string', () => {
            const str = getQueryFilters([]);
            expect(str).to.be.equal('');
        });

        describe('Map DropDownFilters', () => {
            it('Case: one option selected', () => {
                const filters = [
                    {
                        type: 'DropDownFilter',
                        key: 'drop001',
                        opts: [
                            { value: 'val001', checked: true },
                            { value: 'val002', checked: false },
                            { value: 'val003', checked: false }
                        ]
                    }
                ];
                const str = getQueryFilters(filters);
                expect(str).to.be.equal('drop001=val001');
            });

            it('Case: two options selected', () => {
                const filters = [
                    {
                        type: 'DropDownFilter',
                        key: 'drop001',
                        opts: [
                            { value: 'val001', checked: true },
                            { value: 'val002', checked: false },
                            { value: 'val003', checked: true }
                        ]
                    }
                ];
                const str = getQueryFilters(filters);
                expect(str).to.be.equal('drop001=val001,val003');
            });

            it('Case: none option selected', () => {
                const filters = [
                    {
                        type: 'DropDownFilter',
                        key: 'drop001',
                        opts: [
                            { value: 'val001', checked: false },
                            { value: 'val002', checked: false },
                            { value: 'val003', checked: false }
                        ]
                    }
                ];
                const str = getQueryFilters(filters);
                expect(str).to.be.equal('');
            });
        });

        describe('Map QueryFilter', () => {
            it('Case: value exist', () => {
                const filters = [
                    {
                        type: 'QueryFilter',
                        key: 'query001',
                        value: 'searchTerm'
                    }
                ];
                const str = getQueryFilters(filters);
                expect(str).to.be.equal('query001=searchTerm');
            });

            it('Case: empty value', () => {
                const filters = [
                    {
                        type: 'QueryFilter',
                        key: 'query001',
                        value: ''
                    }
                ];
                const str = getQueryFilters(filters);
                expect(str).to.be.equal('');
            });
        });

        describe('Map multiple filters', () => {
            it('Case: DropDownFilter + QueryFilter', () => {
                const filters = [
                    {
                        type: 'DropDownFilter',
                        key: 'drop001',
                        opts: [
                            { value: 'val001', checked: true },
                            { value: 'val002', checked: false },
                            { value: 'val003', checked: true }
                        ]
                    },
                    {
                        type: 'QueryFilter',
                        key: 'query001',
                        value: 'searchTerm'
                    }
                ];
                const str = getQueryFilters(filters);
                expect(str).to.be.equal('drop001=val001,val003&query001=searchTerm');
            });

            it('Case: DropDownFilter + DropDownFilter + QueryFilter', () => {
                const filters = [
                    {
                        type: 'DropDownFilter',
                        key: 'drop001',
                        opts: [
                            { value: 'val001', checked: true },
                            { value: 'val002', checked: false },
                            { value: 'val003', checked: true }
                        ]
                    },
                    {
                        type: 'DropDownFilter',
                        key: 'drop002',
                        opts: [
                            { value: 'val001', checked: false },
                            { value: 'val002', checked: false },
                            { value: 'val003', checked: true }
                        ]
                    },
                    {
                        type: 'QueryFilter',
                        key: 'query001',
                        value: 'searchTerm'
                    }
                ];
                const str = getQueryFilters(filters);
                expect(str).to.be.equal('drop001=val001,val003&drop002=val003&query001=searchTerm');
            });

            it('Case: no value', () => {
                const filters = [
                    {
                        type: 'DropDownFilter',
                        key: 'drop001',
                        opts: [
                            { value: 'val001', checked: false },
                            { value: 'val002', checked: false },
                            { value: 'val003', checked: false }
                        ]
                    },
                    {
                        type: 'DropDownFilter',
                        key: 'drop002',
                        opts: [
                            { value: 'val001', checked: false },
                            { value: 'val002', checked: false },
                            { value: 'val003', checked: false }
                        ]
                    },
                    {
                        type: 'QueryFilter',
                        key: 'query001',
                        value: ''
                    }
                ];
                const str = getQueryFilters(filters);
                expect(str).to.be.equal('');
            });
        });
    });

    describe('"updateDropdown" func', () => {
        const f = {
            opts: [
                { value: 1, checked: true },
                { value: 2, checked: false },
                { value: 3, checked: false }
            ]
        };

        it('Should return and array', () => {
            const arr = updateDropdown(f, '');
            expect(arr).to.be.instanceof(Array);
        });

        describe('Multiple disabled', () => {
            it('Case: 1', () => {
                const updated = updateDropdown(f, 1);
                expect(updated[0].checked).to.be.false;
                expect(updated[1].checked).to.be.false;
                expect(updated[2].checked).to.be.false;
            });

            it('Case: 2', () => {
                const updated = updateDropdown(f, 2);
                expect(updated[0].checked).to.be.false;
                expect(updated[1].checked).to.be.true;
                expect(updated[2].checked).to.be.false;
            });

            it('Case: 3', () => {
                const updated = updateDropdown(f, '');
                expect(updated[0].checked).to.be.false;
                expect(updated[1].checked).to.be.false;
                expect(updated[2].checked).to.be.false;
            });
        });

        describe('Multiple enabled', () => {
            const m = Object.assign({}, f, { multiple: true });
            it('Case: 1', () => {
                const updated = updateDropdown(m, 1);
                expect(updated[0].checked).to.be.false;
                expect(updated[1].checked).to.be.false;
                expect(updated[2].checked).to.be.false;
            });

            it('Case: 2', () => {
                const updated = updateDropdown(m, 2);
                expect(updated[0].checked).to.be.true;
                expect(updated[1].checked).to.be.true;
                expect(updated[2].checked).to.be.false;
            });

            it('Case: 3', () => {
                const updated = updateDropdown(m, '');
                expect(updated[0].checked).to.be.true;
                expect(updated[1].checked).to.be.false;
                expect(updated[2].checked).to.be.false;
            });
        });
    });

    describe('"updateFilters" func', () => {
        const filter = [
            {
                type: 'DropDownFilter',
                opts: [
                    { value: 1, checked: true },
                    { value: 2, checked: false },
                    { value: 3, checked: false }
                ]
            },
            {
                type: 'DropDownFilter',
                multiple: true,
                opts: [
                    { value: 'a', checked: true },
                    { value: 'b', checked: false },
                    { value: 'c', checked: false }
                ]
            },
            {
                type: 'QueryFilter',
                value: 'searchTerm'
            }
        ];

        it('Should return and array', () => {
            const updated = updateFilters(0, 1, filter);
            expect(updated).to.be.instanceof(Array);
        });

        it('Case 1: update the first DropDownFilter', () => {
            const updated = updateFilters(0, 2, filter);
            const results = [false, true, false];
            const opts = updated[0].opts;

            for (let i = 0, l = results.length; i < l; i++) {
                expect(results[i]).to.be.equal(opts[i].checked);
            }
        });

        it('Case 2: update the second DropDownFilter', () => {
            const updated = updateFilters(1, 'b', filter);
            const results = [true, true, false];
            const opts = updated[1].opts;

            for (let i = 0, l = results.length; i < l; i++) {
                expect(results[i]).to.be.equal(opts[i].checked);
            }
        });

        it('Case 3: update the QueryFilter', () => {
            const term = 'hi';
            const updated = updateFilters(2, term, filter);
            expect(updated[2].value).to.be.equal(term);
        });
    });

    describe('"createPromises" func', () => {
        const filters = [
            {
                type: 'DropDownFilter',
                url: '/fake-url1'
            },
            {
                type: 'DropDownFilter',
                multiple: true,
                url: '/fake-url2'
            },
            {
                type: 'QueryFilter',
                value: 'searchTerm'
            }
        ];

        let stub;
        before(() => {
            stub = sinon.stub(axios, 'get')
                .returns(Promise.resolve({ data: [{ label: 'Val001', value: 'val001' }] }));
        });
        after(() => {
            stub.restore();
        });

        it('Should return and array of promises', () => {
            const promises = createPromises(filters);
            expect(promises).to.be.instanceof(Array);
            expect(promises).to.have.lengthOf(2);
            expect(promises[0]).to.be.instanceof(Promise);
            expect(promises[1]).to.be.instanceof(Promise);
        });

        it('Two ajax calls should be performed to corresponding urls', () => {
            expect(stub.called);
            expect(stub.callCount).to.be.equal(2);
            expect(stub.args[0][0]).to.be.equal(filters[0].url);
            expect(stub.args[1][0]).to.be.equal(filters[1].url);
        });
    });

    describe('"getAsynOpts" func', () => {
        const res = [
            {
                opts: [
                    { value: 'a' },
                    { value: 'b' },
                    { value: 'c' }
                ],
                idx: 1
            }
        ];
        const filters = [
            {
                type: 'DropDownFilter',
                opts: [
                    { value: 1 },
                    { value: 2 },
                    { value: 3 }
                ]
            },
            {
                type: 'DropDownFilter',
                opts: []
            },
        ];

        it('Should return an array', () => {
            const merged = getAsynOpts(res, filters);
            expect(merged).to.be.instanceof(Array);
        });

        it('Should merge filter\'s async opts', () => {
            const merged = getAsynOpts(res, filters);
            expect(merged).to.be.instanceof(Array);

            expect(merged[0].opts).to.be.equal(filters[0].opts);
            expect(merged[1].opts).to.be.equal(res[0].opts);
        });
    });
});
