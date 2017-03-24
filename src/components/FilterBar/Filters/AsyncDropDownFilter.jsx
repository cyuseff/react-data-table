import React, { Component } from 'react';
import axios from 'axios';

import Loader from '../../Loader';
import DropDownFilter from './DropDownFilter';

class AsyncDropDownFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { opts: null };
    }

    componentDidMount() {
        const { url, mapData } = this.props;
        axios
            .get(url)
            .then(res =>
                mapData
                    ? mapData(res.data)
                    : res.data
            )
            .then(opts => this.setState({ opts }))
            .catch(err => console.log(err));
    }

    render() {
        const { label, callback, disabled } = this.props;
        const { opts } = this.state;

        const render = opts
            ? (
                <DropDownFilter
                    label={label}
                    opts={opts}
                    callback={callback}
                    disabled={disabled}
                />
            )
            : (
                <div className="dropdown">
                    <button className="btn btn-default" disabled>
                        <strong>{label}: </strong> <Loader />
                    </button>
                </div>
            );

        return render;
    }
}

AsyncDropDownFilter.defaultProps = {
    url: '',
    mapData: null,
    label: '',
    callback: opt => console.log(opt),
    disabled: false
};

export default AsyncDropDownFilter;
