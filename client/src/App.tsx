import { Card, Col, Icon, Layout, Row } from 'antd';
import React from 'react';
// import DiviedRow from './component/DiviedRow';
import { DocumentTree } from './component/DocumentTree';
import { Property } from './component/Property';
// import 'antd/dist/antd.css';
import TaskList from './component/TaskList';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {

  return (
    <Layout>
      <Header>
        <TaskList theme="dark" name="project"/>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Row gutter={[16, 32]}>
          <Col span={4}>
            <Card hoverable={true} title="Task List">
              <TaskList theme="light" mode="vertical" name="task"/>
            </Card>
          </Col>
          <Col span={4}>
            <Card hoverable={true} title="Record">
              <TaskList theme="light" mode="vertical" name="record"/>
            </Card>
          </Col>

          <Col span={8}>
            <Card
              hoverable={true}
              title="Layout Tree"
              actions={[
                <Icon type="play-circle" key="play-circle" />,
              ]}
            >
              <DocumentTree/>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Property">
              <Property/>
            </Card>
            <Card title="EventLog">
                <p>P</p>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer>
        Fotter
      </Footer>
    </Layout>
  );
};

export default App;
