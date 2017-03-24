import React from 'react';

import Loader from '../Loader';
import Header from './Header';
import Row from './Row';

const Table = props => {
    const { rowKey, cols, data, clickHandler } = props;
    const render = data
        ? data.length
            ? data.map(row => (
                <Row
                    row={row}
                    cols={cols}
                    clickHandler={clickHandler}
                    key={row[rowKey]}
                />
            ))
            : (
                <div className="ui-row ui-row-empty">
                    <div className="col">No match...</div>
                </div>
            )
        : (
            <div className="ui-row ui-row-empty">
                <div className="col">
                    <Loader />
                </div>
            </div>
        );

    return (
        <div className="ui-table">
            <Header cols={cols} />
            <div className="ui-table-body">
                {render}
            </div>
        </div>
    );
};

Table.defaultProps = {
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

export default Table;
