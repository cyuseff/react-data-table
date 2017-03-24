import React from 'react';

const getLabel = opts => {
    const str = opts.reduce((s, o) =>
        o.checked
            ? s ? `${s}, ${o.label}` : o.label
            : s, ''
        );
    return str || 'All';
};

const DropDownFilter = props => {
    const {
        label,
        opts,
        callback,
        disabled
    } = props;

    const list = opts.map(opt => (
        <li
            className={opt.checked ? 'active' : ''}
            onClick={e => {
                e.preventDefault();
                callback(opt);
            }}
            key={opt.value}
        >
            <a href={`#${opt.value}`}>{opt.label}</a>
        </li>
    ));

    return (
        <div className="dropdown ui-dropdown-filter">
            <button
                className="btn btn-default"
                data-toggle="dropdown"
                disabled={disabled}
            >
                <strong>{label}: </strong>{getLabel(opts)}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dLabel">
                {list}
            </ul>
        </div>
    );
};

DropDownFilter.defaultProps = {
    label: 'Filter001',
    opts: [
        { label: 'Filter001', value: 'filter-001', checked: true },
        { label: 'Filter002', value: 'filter-002' },
        { label: 'Filter003', value: 'filter-003' }
    ],
    disabled: false,
    callback: opt => console.log(opt)
};

export default DropDownFilter;
export { getLabel };
