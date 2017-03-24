import axios, { CancelToken } from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = '';

let cancel;

const fetchData = (url, mapData) => {
    if (cancel) cancel('canceled');

    return axios
        .get(url, {
            cancelToken: new CancelToken(c => (cancel = c))
        })
        .then(res => {
            const data = mapData(res.data);
            const { count, next, previous } = res.data;
            const pagination = { count, next, previous };

            return { data, pagination };
        })
        .catch(err => ({
            err,
            canceled: axios.isCancel(err)
        }));
};

export { fetchData };
