import React from 'react';

import TextCel from './Cels/TextCel';
import HtmlCel from './Cels/HtmlCel';

const mapCelData = (row, cols) =>
    cols.map(({ key, template }) => (
        template
            ? <HtmlCel value={template(row)} key={key} />
            : <TextCel value={row[key]} key={key} />
    ));

const Row = props => {
    const { row, cols, clickHandler } = props;
    const cels = mapCelData(row, cols);
    return (
        <div
            className="ui-row"
            onClick={() => clickHandler(row)}
        >
            {cels}
        </div>
    );
};

Row.defaultProps = {
    clickHandler: row => console.log(row)
};

export default Row;
export { mapCelData };
