import React from 'react';
import DataTable from './DataTable/DataTable';

// import moment from 'moment';
// template: row => moment(row.timestamp).calendar()

export default () => {
    const cols = [
        {
            key: 'timestamp',
            name: 'Timestamp'
        },
        {
            key: 'severity',
            name: 'Risk Rating'
        },
        {
            key: 'entity',
            name: 'Protected Entity',
            template: row => (
                `
                    <span class="avatar" style="background-image: url('${row.entity.image}')"></span>
                    <h4>${row.entity.name}</h4>
                `
            )
        },
        {
            key: 'perpetrator',
            name: 'Perpetrator',
            template: row => (
                `
                    <span class="avatar" style="background-image: url('${row.perpetrator.image}')"></span>
                    <h4>${row.perpetrator.display_name || row.perpetrator.username || 'Someone'}</h4>
                `
            )
        },
        {
            key: 'rule_name',
            name: 'Rule'
        },
        {
            key: 'alert_type',
            name: 'Alert Type'
        },
        {
            key: 'status',
            name: 'Alert Status'
        },
        {
            key: 'network',
            name: 'Network',
            template: row => (
                `<span class="network-icon ${row.network}"></span>`
            )
        }
    ];

    const filters = [
        {
            type: 'DropDownFilter',
            key: 'severity',
            label: 'Risk Rating',
            multiple: true,
            opts: [
                { label: 'High', value: '4' },
                { label: 'Medium', value: '3' },
                { label: 'Low', value: '2' },
                { label: 'Info', value: '1' }
            ]
        },
        {
            type: 'DropDownFilter',
            key: 'network',
            label: 'Network',
            multiple: true,
            url: 'https://api-qa.zerofox.com/1.0/networks/',
            mapData: ({ networks }) =>
                networks.map(n => (
                    { label: n.display_name, value: n.network_name }
                )
            ),
            opts: []
        },
        {
            type: 'DropDownFilter',
            key: 'status',
            label: 'Alert Status',
            multiple: true,
            opts: [
                { label: 'Open', value: 'open' },
                { label: 'Closed', value: 'closed' },
                { label: 'Takedown:Requested', value: 'takedown_requested' },
                { label: 'Takedown:Accepted', value: 'takedown_accepted' },
                { label: 'Takedown:Denied', value: 'takedown_denied' },
                { label: 'Whitelisted', value: 'whitelisted' },
                { label: 'Content removed', value: 'content_removed' },
                { label: 'Pending review', value: 'pending_review' },
                { label: 'Rejected', value: 'rejected' }
            ]
        }
    ];

    return (
        <DataTable
            url="https://api-qa.zerofox.com/1.0/alerts/"
            rowKey="id"
            cols={cols}
            filters={filters}
            mapData={obj => obj.alerts}
        />
    );
};
