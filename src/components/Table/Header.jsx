import React from 'react';
import TextCel from './Cels/TextCel';

const Header = props => {
    const cols = props.cols.map(c => (
        <TextCel value={c.name} key={c.key} />
    ));

    return (
        <div className="ui-row header">
            {cols}
        </div>
    );
};

export default Header;
