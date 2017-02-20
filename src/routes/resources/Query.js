import React, { Component } from 'react';
import BaseModuleTemplate from '../../templates/BaseModuleTemplate';
import ChartPanelTemplate from '../../templates/ChartPanelTemplate';
import rover_settings from '../../../rover_settings.json';
import { Select, Button, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const sensorList = rover_settings.sensorsList;

class ChartGenerationOptions extends Component {
    constructor(props) {
        super(props);

        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleOnDeselect = this.handleOnDeselect.bind(this);
    }

    componentWillMount() {
        // populate Select with Options loaded from sensorsList right before the Component Mounts
        this.generationOptions = sensorList.map( (sensor) =>
            <Option key={sensor.sensorID} sensorName={sensor.sensorName.toLowerCase()}>{sensor.sensorName}</Option>
        );
    }

    handleOnSelect(value) {
        this.props.handleOnSelect(value);
    }

    handleOnDeselect(value) {
        this.props.handleOnDeselect(value);
    }


    render() {
        return (
            <Select className="generation-options" multiple onSelect={this.handleOnSelect} onDeselect={this.handleOnDeselect}
                    optionFilterProp="sensorName" placeholder="Select sensors to generate chart">
                {this.generationOptions}
            </Select>
        );
    }
}

class Query extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedGenerationOptions: [],
            panes: [],
        };

        this.newTabIndex = 0;
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleOnDeselect = this.handleOnDeselect.bind(this);
        this.handleGenerateCharts = this.handleGenerateCharts.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnEdit = this.handleOnEdit.bind(this);
    }

    // functions for Select and Button
    handleOnSelect(value) {
        let selectedGenerationOptions = this.state.selectedGenerationOptions;
        selectedGenerationOptions.push(value);

        this.setState({selectedGenerationOptions: selectedGenerationOptions});
    }

    handleOnDeselect(value) {
        let selectedGenerationOptions = this.state.selectedGenerationOptions;
        let index = selectedGenerationOptions.indexOf(value);
        selectedGenerationOptions.splice(index, 1);

        this.setState({selectedGenerationOptions: selectedGenerationOptions});
    }

    handleGenerateCharts() {
        let panes = this.state.panes;
        let activeKey;
        let chartPanelInfo = [];

        // assign sensorName and sensorIDs by keyID
        for(let keyID of this.state.selectedGenerationOptions) {
            for(let sensor of rover_settings.sensorsList) {
                if (keyID === sensor.sensorID) {
                    chartPanelInfo.push(sensor);
                }
            }
        }

        // we loop over every pane
        for(let sensor of chartPanelInfo) {
            let paneAlreadyExists = false;
            for(let pane of panes) {
                // the pane already exists so we append to its content a new chart panel
                if (sensor.sensorName === pane.title) {
                    paneAlreadyExists = true;
                    pane.content.push(<div>Hello World</div>);
                    activeKey = pane.key;
                }
            }

            // extra check for paneAlreadyExists
            if (!paneAlreadyExists) {
                // this means we need to create a new pane
                let key = (this.newTabIndex++).toString(); // increment newTabIndex to create a new unique key for each pane
                let content = [<div>Hello WOOOOORLD</div>];
                panes.push({title: sensor.sensorName, content: content, key: key});
                activeKey = key;
            }
        }

        // update any changes
        this.setState({panes, activeKey: activeKey});
    }

    // functions for Tabs and TabPanes
    handleOnChange(activeKey) {
        this.setState({activeKey});
    }

    handleOnEdit(targetKey, action) {
        this[action](targetKey);
    }

    remove(targetKey) {
        let activeKey = this.state.activeKey;
        let panes;
        let targetIndex;

        // find index of the targetKey
        for(let [index, pane] of this.state.panes.entries()) {
            let paneKeyInt = parseInt(pane.key);
            let targetKeyInt = parseInt(targetKey);

            if (paneKeyInt === targetKeyInt) {
                targetIndex = index;
            }
        }

        // remove the target from panes
        panes = this.state.panes.filter(pane => pane.key !== targetKey);

        // handle auto-focusing tabs on removal
        if (targetIndex >= 1 && activeKey === targetKey) {
            activeKey = panes[targetIndex-1].key;
        }
        else if (targetIndex == 0) {
            if (panes.length == 0) {
                activeKey = null;
            }
            else {
                activeKey = panes[targetIndex].key;
            }
        }

        this.setState({panes: panes, activeKey});
    }

    render() {

        return (
            <BaseModuleTemplate moduleName="New Query">
                <div className="controls">
                    <ChartGenerationOptions handleOnSelect={this.handleOnSelect} handleOnDeselect={this.handleOnDeselect}/>
                    <Button type="primary" onClick={this.handleGenerateCharts}>Generate Charts</Button>
                </div>

                <div id="chart-panels">
                    <Tabs
                        hideAdd
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onChange={this.handleOnChange}
                        onEdit={this.handleOnEdit}
                    >
                        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                    </Tabs>
                </div>

                <ChartPanelTemplate/>

            </BaseModuleTemplate>
        );
    }
}

export default Query;