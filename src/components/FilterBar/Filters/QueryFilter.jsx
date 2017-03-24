import React from 'react';

const QueryFilter = props => {
    const { value, callback, disabled } = props;
    return (
        <div className="ui-query-filter">
            <input
                className="form-control"
                type="text"
                value={value}
                onChange={e => callback(e)}
                placeholder="Search..."
                disabled={disabled}
            />
        </div>
    );
};

QueryFilter.defaultProps = {
    value: '',
    disabled: false,
    callback: e => console.log(e.target.value)
};

export default QueryFilter;
