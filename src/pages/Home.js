import React, { PureComponent } from 'react'
import mockjs from 'mockjs'
import { Card, Row, Col } from 'antd'
import { Bar, Pie, yuan, TagCloud,WaterWave } from '../components/Charts'

const mockData = () => {
    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
        salesData.push({
            x: `${i + 1}月`,
            y: Math.floor(Math.random() * 1000) + 200,
        });
    }
    return salesData;
}


const tags = [];
for (let i = 0; i < 150; i += 1) {
    tags.push({
        name: mockjs.Random.city(),
        value: Math.floor((Math.random() * 50)) + 20,
    });
}

const salesPieData = [
    {
        x: '家用电器',
        y: 6000,
    },
    {
        x: '食用酒水',
        y: 3321,
    },
    {
        x: '个护健康',
        y: 3113,
    },
    {
        x: '服饰箱包',
        y: 2341,
    },
    {
        x: '母婴产品',
        y: 1231,
    },
    {
        x: '其他',
        y: 1231,
    },
];

class Home extends PureComponent {

    render() {
        return (
            <div>
                <Row gutter={15} style={{ marginBottom: '8px' }}>
                    <Col span={12}>
                        <Card title="销售趋势">
                            <Bar data={mockData()} height={240}  ></Bar>
                        </Card>
                    </Col>
                    {
                    <Col span={12}>
                        <Card title="热门搜索">
                            <TagCloud data={tags} height={240} ></TagCloud>
                        </Card>
                    </Col>
                    }

                </Row>
                <Row gutter={15}>
                    <Col span={12}>
                        <Card title="销售额">
                            <Pie
                                tooltip
                                data={salesPieData}
                                title="销售额"
                                height={240}
                                subTitle="销售额"
                                total={() => (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))
                                        }}
                                    />
                                )}
                                valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}>
                            </Pie>
                        </Card>
                    </Col>
                 
                    <Col span={12}>
                        <Card title="资源剩余">
                        <div style={{display:'flex',justifyContent:'space-around'}}>
                        <WaterWave
                                height={200}
                                title="电量剩余"
                                percent={45}
                            />
                            <WaterWave
                                height={200}
                                title="能量剩余"
                                percent={55}
                            />
                        </div>
                
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;