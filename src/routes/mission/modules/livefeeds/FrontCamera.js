import React, { Component } from 'react';
import BaseModuleTemplate from '../../../../templates/BaseModuleTemplate';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;


class FrontCamera extends Component {
  render() {
      return (
          <BaseModuleTemplate moduleName="Front Camera" tagColor="green">
              <Tabs defaultActiveKey="1" >
                  <TabPane tab="Stream 1" key="1">
                      <img src="http://131.123.154.3/axis-cgi/mjpg/video.cgi" className="camera-stream"/>
                  </TabPane>
              </Tabs>
          </BaseModuleTemplate>
        );
    }
}

export default FrontCamera;
