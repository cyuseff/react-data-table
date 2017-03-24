import React from 'react';

const HtmlCel = ({ value }) => (
    <div
        className="col"
        dangerouslySetInnerHTML={{ __html: value }}
    />
);

export default HtmlCel;
