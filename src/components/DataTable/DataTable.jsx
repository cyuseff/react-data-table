import React, { Component } from 'react';

import { fetchData } from './actions';

import FilterBar from '../FilterBar/FilterBar';
import Table from '../Table/Table';
import Pagination from '../Pagination';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            pagination: null,
            err: null
        };
    }

    componentDidMount() {
        this.fetchData(this.props.url);
    }

    fetchData(url) {
        const { mapData } = this.props;
        this.setState(
            { data: null, err: null },
            () => {
                fetchData(url, mapData)
                    .then(state => this.setState(state))
                    .catch(({ err, canceled }) => {
                        if (!canceled) this.setState({ err });
                    });
            }
        );
    }

    render() {
        const { rowKey, cols, url, filters, clickHandler } = this.props;
        const { data, pagination } = this.state;

        return (
            <div className="ui-data-table">
                <Pagination
                    callback={u => this.fetchData(u)}
                    {...pagination}
                />
                <FilterBar
                    filters={filters}
                    callback={query => this.fetchData(`${url}?${query}`)}
                />
                <Table
                    rowKey={rowKey}
                    cols={cols}
                    data={data}
                    clickHandler={clickHandler}
                />
            </div>
        );
    }
}

DataTable.defaultProps = {
    url: '',
    rowKey: '',
    cols: [],
    filters: [],
    mapData: obj => obj,
    clickHandler: row => console.log("data", row)
};

export default DataTable;
