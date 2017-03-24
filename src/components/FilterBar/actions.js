import axios from 'axios';

const getQueryFilters = array =>
    array.reduce((str, item) => {
        let val;
        switch (item.type) {
            case 'DropDownFilter':
                val = item.opts.reduce((s, o) =>
                o.checked
                    ? s ? `${s},${o.value}` : o.value
                    : s, ''
                );
                break;

            case 'QueryFilter':
                val = item.value;
                break;

            default: break;
        }

        return val
            ? str ? `${str}&${item.key}=${val}` : `${item.key}=${val}`
            : str;
    }, '');

const updateDropdown = (filter, value) => filter.opts.map(o => (
        o.value === value
            ? Object.assign({}, o, { checked: !o.checked })
            : filter.multiple
                ? Object.assign({}, o)
                : Object.assign({}, o, { checked: false })
    ));

const updateFilters = (idx, value, filters) => {
    const array = [...filters];
    const filter = array[idx];
    let opts;

    switch (filter.type) {
        case 'DropDownFilter':
            opts = updateDropdown(filter, value);
            array[idx] = Object.assign({}, filter, { opts });
            break;

        case 'QueryFilter':
            array[idx] = Object.assign({}, filter, { value });
            break;

        default: break;
    }

    return array;
};

const createPromise = ({ url, mapData }, idx) =>
    new Promise((resolve, reject) =>
        axios
            .get(url)
            .then(res =>
                mapData
                    ? mapData(res.data)
                    : res.data
            )
            .then(opts => resolve({ opts, idx }))
            .catch(err => reject(err))
    );
const createPromises = filters => {
    const ff = filters.reduce((obj, f) => {
        const { array, idx } = obj;
        return f.url
            ? {
                array: [...array, createPromise(f, idx)],
                idx: idx + 1
            }
            : { array, idx: idx + 1 };
    }, { array: [], idx: 0 });

    return ff.array;
};

const getAsynOpts = (res, filters) => {
    const ff = [...filters];
    for (let i = 0, l = res.length; i < l; i++) {
        const { opts, idx } = res[i];
        ff[idx] = Object.assign({}, ff[idx], { opts });
    }
    return ff;
};

export {
    getQueryFilters,
    updateDropdown,
    updateFilters,
    createPromises,
    getAsynOpts
};
