import React from 'react';
import { Column } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';

const dataColumn = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];
const configColumn = {
  dataColumn,
  xField: 'type',
  yField: 'sales',
  meta: {
    type: { alias: '类别' },
    sales: { alias: '销售额' },
  },
};

const dataPie = [
  {
    type: '分类一',
    value: 27,
  },
  {
    type: '分类二',
    value: 25,
  },
  {
    type: '分类三',
    value: 18,
  },
  {
    type: '分类四',
    value: 15,
  },
  {
    type: '分类五',
    value: 10,
  },
  {
    type: '其他',
    value: 5,
  },
];
const configPie = {
  appendPadding: 10,
  dataPie,
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  label: {
    type: 'inner',
    offset: '-0.5',
    content: '{name} {percentage}',
    style: {
      fill: '#fff',
      fontSize: 14,
      textAlign: 'center',
    },
  },
  state: {
    active: {
      style: {
        lineWidth: 0,
        fillOpacity: 0.65,
      },
    },
  },
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
};


const Home=()=>{

    return (
      <div>
          {/* <Column {...configColumn} />; */}

          {/* <Pie {...configPie} /> */}
      </div>
    );
}

export default Home;
