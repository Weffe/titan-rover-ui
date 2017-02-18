import React, { Component } from 'react';
import Navbar from './Navbar';
import MissionElapsedTime from './MissionElapsedTime';
import './App.css';
import 'd3';
import { Layout, Menu, Icon, Row, Col} from  'antd';
const { Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
    render() {
        return (
            <Layout>
                <Sider>
                    <Menu
                        mode="inline"
                    >
                        <Menu.Item key="overview">
                            <Icon type="mail" /> Overview
                        </Menu.Item>
                        <Menu.Item key="Test">
                            <Icon type="mail" /> Test
                        </Menu.Item>
                        <Menu.Item key="wow">
                            <Icon type="mail" /> wow
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Content>
                    Main content
                    <MissionElapsedTime/>
                    {this.props.children}
                </Content>
            </Layout>
        );
    }
}

export default App;
