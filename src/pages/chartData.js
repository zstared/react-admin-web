import Mock from 'mockjs';

export const columns = [
    {
        title: '负责部门',
        width: 100,
        dataIndex: 'department',
        key: 'department',
        fixed: 'left',
        align: 'center',
    },
    {
        title: '负责人',
        width: 100,
        dataIndex: 'manager',
        key: 'manager',
        fixed: 'left',
        align: 'center',
    },
    {
        title: '准时项',
        dataIndex: 'item',
        key: 'item',
        fixed: 'left',
        width: 150,
        align: 'center',
    },
    {
        title: '2020-10-24',
        dataIndex: 'date24',
        key: 'date24',
        width: 150,
        align: 'center',
        className: 'rate-cell',
        render: (text, record, index) => {
            return text == '100%' ? (
                <div className='green'>{text}</div>
            ) : (
                <div className='yellow'>{text}</div>
            );
        },
    },
    {
        title: '2020-10-25',
        dataIndex: 'date25',
        key: 'date25',
        width: 150,
        align: 'center',
        className: 'rate-cell',
        render: (text, record, index) => {
            return text == '100%' ? (
                <div className='green'>{text}</div>
            ) : (
                <div className='yellow'>{text}</div>
            );
        },
    },
    {
        title: '2020-10-26',
        dataIndex: 'date26',
        key: 'date26',
        width: 150,
        align: 'center',
        className: 'rate-cell',
        render: (text, record, index) => {
            return text == '100%' ? (
                <div className='green'>{text}</div>
            ) : (
                <div className='yellow'>{text}</div>
            );
        },
    },
    {
        title: '2020-10-27',
        dataIndex: 'date27',
        key: 'date27',
        width: 150,
        align: 'center',
        className: 'rate-cell',
        render: (text, record, index) => {
            return text == '100%' ? (
                <div className='green'>{text}</div>
            ) : (
                <div className='yellow'>{text}</div>
            );
        },
    },
    {
        title: '2020-10-28',
        dataIndex: 'date28',
        key: 'date28',
        width: 150,
        align: 'center',
        className: 'rate-cell',
        render: (text, record, index) => {
            return text == '100%' ? (
                <div className='green'>{text}</div>
            ) : (
                <div className='yellow'>{text}</div>
            );
        },
    },
    {
        title: '2020-10-29',
        dataIndex: 'date29',
        key: 'date29',
        width: 150,
        align: 'center',
        className: 'rate-cell',
        render: (text, record, index) => {
            return text == '100%' ? (
                <div className='green'>{text}</div>
            ) : (
                <div className='yellow'>{text}</div>
            );
        },
    },
    {
        title: '2020-10-30',
        dataIndex: 'date30',
        key: 'date30',
        width: 150,
        align: 'center',
        className: 'rate-cell',
        render: (text, record, index) => {
            return text == '100%' ? (
                <div className='green'>{text}</div>
            ) : (
                <div className='yellow'>{text}</div>
            );
        },
    },
    {
        title: '2020-10-31',
        dataIndex: 'date31',
        key: 'date31',
        width: 150,
        align: 'center',
        className: 'rate-cell',
        render: (text, record, index) => {
            return text == '100%' ? (
                <div className='green'>{text}</div>
            ) : (
                <div className='yellow'>{text}</div>
            );
        },
    },
];

export const data = [];
for (let i = 0; i < 12; i++) {
    data.push(
        Mock.mock({
            key: i,
            'department|1': ['采购部', '仓储部', '计划部', '生产部'],
            manager: '@cname()',
            'item|1': [
                '准时到料',
                '准时入库',
                '准时派工',
                '准时配送',
                '准时完工',
            ],
            date24: '@float(0, 100, 0, 2)%',
            date25: '100%',
            date26: '@float(0, 100, 0, 2)%',
            date27: '@float(0, 100, 0, 2)%',
            date28: '100%',
            date29: '@float(0, 100, 0, 2)%',
            date30: '@float(0, 100, 0, 2)%',
            date31: '@float(0, 100, 0, 2)%',
        })
    );
}

//柱状图
export const dataColumn = Mock.mock({
    'data|20-40': [
        {
            name: '@cname',
            rate: '@integer(0, 100)',
        },
    ],
});
export const configColumn = {
    data: dataColumn.data,
    xField: 'name',
    yField: 'rate',
    meta: {
        name: { alias: '采购员' },
        rate: { alias: '准时交货率' },
    },
    yAxis: {
        tickCount: 10,
        grid: {
            line: {
                style: {
                    lineDash: [2, 2],
                },
            },
        },
    },
};

//条形图
export const dataBar = [
    {
        name: '车间一',
        rate: 80,
    },
    {
        name: '车间二',
        rate: 100,
    },
    {
        name: '车间三',
        rate: 70,
    },
    {
        name: '车间四',
        rate: 30,
    },
];
export const configBar = {
    forceFit: true,
    data: dataBar,
    xField: 'rate',
    yField: 'name',
    label: {
        style: {
            stroke: '#fff',
        },
        visible: true,
        position: 'middle',
        formatter: (v) => v.rate + '%',
    },
    xAxis: {
        tickCount: 10,
        grid: {
            line: {
                style: {
                    lineDash: [2, 2],
                },
            },
        },
    },
};

//环形图
const dataDonut = [
    {
        type: '第一车间',
        value: 27,
    },
    {
        type: '第二车间',
        value: 25,
    },
    {
        type: '第三车间',
        value: 18,
    },
    {
        type: '第四车间',
        value: 30,
    },
];
export const configDonut = {
    appendPadding: 10,
    data: dataDonut,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.64,
    label: {
        type: 'inner',
        offset: -14,
        autoRotate: false,
        content: '{value}',
        style: {
            fill: '#333',
            stroke: '#fff',
            strokeWidth: 1,
        },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
        title: false,
        content: false,
    },
};

//条形图工资
export const dataSalary = Mock.mock({
    'data|10-20': [
        {
            name: '@cname()',
            'salary|+1000': 10000,
        },
    ],
});
export const configSalary = {
    forceFit: true,
    data: dataSalary.data,
    xField: 'salary',
    yField: 'name',
    // label: {
    //     style: {
    //         stroke: '#fff',
    //     },
    //     visible: true,
    //     position: 'middle',
    //     formatter: (v) => v.salary,
    // },
    xAxis: {
        tickCount: 10,
        grid: {
            line: {
                style: {
                    lineDash: [2, 2],
                },
            },
        },
    },
};
