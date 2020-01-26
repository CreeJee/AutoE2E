import { Card, Col, Layout, Row } from 'antd';
import React from 'react';
// import DiviedRow from './component/DiviedRow';
import { DocumentTree } from './component/DocumentTree';
import { Property } from './component/Property';
// import 'antd/dist/antd.css';
import ItemList from './component/ItemList';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
    return (
        <Layout>
            <Header>
                <ItemList theme="dark" name="Project" />
            </Header>
            <Content style={{ padding: '50px' }}>
                <Row gutter={[16, 32]}>
                    <Col span={4}>
                        <Card hoverable={true} title="Task List">
                            <ItemList theme="light" mode="vertical" name="Task" />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card hoverable={true} title="Record">
                            <ItemList theme="light" mode="vertical" name="Record" />
                        </Card>
                    </Col>

                    <Col span={8}>
                        <DocumentTree />
                    </Col>
                    <Col span={8}>
                        <Card title="Property">
                            <Property />
                        </Card>
                        <Card title="EventLog">
                            <p>P</p>
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Footer>Fotter</Footer>
        </Layout>
    );
};

export default App;
