import React, { Component } from 'react';
import BaseModuleTemplate from '../../../../templates/BaseModuleTemplate';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;


class ArmCamera extends Component {
  render() {
      return (
          <BaseModuleTemplate moduleName="Arm Camera" tagColor="green">
              <Tabs defaultActiveKey="1" >
                  <TabPane tab="Stream 1" key="1">
                      <img src="http://webcam1.lpl.org/axis-cgi/mjpg/video.cgi" className="camera-stream"/>
                  </TabPane>
              </Tabs>
          </BaseModuleTemplate>
        );
    }
}

export default ArmCamera;
