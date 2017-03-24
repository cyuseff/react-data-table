import React, { Component } from 'react';

import {
    updateFilters,
    getQueryFilters,
    createPromises,
    getAsynOpts
} from './actions';

import DropDownFilter from './Filters/DropDownFilter';
import QueryFilter from './Filters/QueryFilter';

class FilterBar extends Component {
    constructor(props) {
        super(props);

        this.pp = createPromises(this.props.filters);
        this.state = {
            filters: this.props.filters,
            query: getQueryFilters(this.props.filters),
            ready: !this.pp.length
        };
    }

    componentDidMount() {
        const { filters } = this.state;

        if (this.pp.length) {
            Promise
                .all(this.pp)
                .then(res => getAsynOpts(res, filters))
                .then(ff => this.setState({ filters: ff, ready: true }))
                .catch(err => console.log(err));
        }
    }

    updateFilters(idx, value) {
        const filters = updateFilters(idx, value, this.state.filters);
        const query = getQueryFilters(filters);
        this.setState(
            { filters, query },
            () => this.props.callback(query)
        );
    }

    renderFilters() {
        const { filters, ready } = this.state;
        const dd = (this.props.disabled || !ready);

        return filters.map((f, idx) => {
            let render;
            switch (f.type) {
                case 'DropDownFilter':
                    render = (
                        <DropDownFilter
                            label={f.label}
                            opts={f.opts}
                            callback={({ value }) => this.updateFilters(idx, value)}
                            disabled={dd}
                        />
                    );
                    break;

                case 'QueryFilter':
                    render = (
                        <QueryFilter
                            value={f.value}
                            callback={e => {
                                e.preventDefault();
                                this.updateFilters(idx, e.target.value);
                            }}
                            disabled={dd}
                        />
                    );
                    break;

                default:
                    render = undefined;
                    break;
            }

            return (<li key={f.key}>{render}</li>);
        });
    }

    render() {
        return (
            <div className="ui-filter-bar">
                <ul className="ui-filter-bar-list">
                    {this.renderFilters()}
                </ul>
            </div>
        );
    }
}

FilterBar.defaultProps = {
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
    callback: query => console.log(query),
    disabled: false
};

export default FilterBar;
