import React from 'react';

const Pagination = props => {
    const {
        count,
        next,
        previous,
        callback
    } = props;

    const prevLink = previous
        ? <li onClick={() => callback(previous)}>prev</li>
        : <li className="disabled" disabled>prev</li>;

    const nextLink = next
        ? <li onClick={() => callback(next)}>next</li>
        : <li className="disabled" disabled>next</li>;

    return (
        <div className="ui-pagination">
            <small className="count">Total items: {count}</small>
            <ul className="ui-pagination-links">
                {prevLink}
                {nextLink}
            </ul>
        </div>
    );
};

Pagination.defaultProps = {
    count: 0,
    next: '',
    previous: '',
    callback: url => console.log(url)
};

export default Pagination;
