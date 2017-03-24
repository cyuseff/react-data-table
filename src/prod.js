import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import Datatable from './components/DataTable/DataTable';

(w => {
    // libs
    w.React = React;
    w.ReactDOM = ReactDOM;
    w.moment = moment;

    // public components
    w.Datatable = Datatable;
})(window);
