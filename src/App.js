import React, { Component } from 'react';
import MissionElapsedTime from './MissionElapsedTime';
import './App.css';
import '../public/iconfont/iconfont.css';
import 'd3';
import { Layout } from  'antd';
const { Sider, Content, Header } = Layout;
import NavMenu from './NavMenu';

class App extends Component {

    render() {
        return (
            <Layout>
                <Sider collapsible
                       collapsedWidth="115"
                >
                    <Header><div className="logo">Titan Rover</div></Header>
                    <NavMenu/>
                </Sider>
                <Content>
                    <Header><MissionElapsedTime/></Header>
                    <Content>
                        {this.props.children}
                    </Content>
                </Content>
            </Layout>
        );
    }
}

export default App;
