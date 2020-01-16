import { Card, Col, Icon, Layout, Row } from 'antd';
import React from 'react';
import { DocumentTree } from './component/DocumentTree';
// import 'antd/dist/antd.css';
import TaskList from './component/TaskList';
import PropertyGrid from './component/PropertyGrid';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {

  return (
    <Layout>
      <Header>
        <TaskList theme="dark" name="project"/>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Row gutter={[16, 32]}>
          <Col span={8}>
            <Card hoverable={true} title="Task List">
              <TaskList theme="light" mode="vertical" name="task"/>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable={true}
              title="Tree Behaivor"
              actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
            >
              <DocumentTree/>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Property Editor">
              <PropertyGrid/>
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
