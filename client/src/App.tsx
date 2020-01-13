import React from 'react';
import { Layout, Card, Row, Col, Icon, Input } from 'antd';
// import 'antd/dist/antd.css';
import TaskList from './component/TaskList';
import { TreeBehaivor } from './component/TreeBehaivor';


const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header>
        <TaskList theme="dark"/>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Row gutter={[16,32]}>
          <Col span={8}>
            <Card hoverable title="Task List">
              <TaskList theme="light" mode="vertical"/>
            </Card>
          </Col>
          <Col span={8}>
            <Card 
              hoverable 
              title="Tree Behaivor"
              actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
            >
              <TreeBehaivor/>
            </Card>
          </Col>
          <Col span={8}>  
            <Card title="Property Editor">
              <Row>
                <Col span={12}>
                  <Input suffix="px" addonBefore="width"></Input>
                </Col>
                <Col span={12}>                
                  <Input suffix="px" addonBefore="height"></Input>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer>
        Fotter
      </Footer>
    </Layout>
  );
}

export default App;
