import React, { Component } from 'react';
import BaseModuleTemplate from '../../templates/BaseModuleTemplate';
import rover_settings from '../../../rover_settings.json';
import { Select } from 'antd';
const Option = Select.Option;
const sensorList = rover_settings.sensorsList;

class ChartGenerationOptions extends Component {
    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentWillMount() {
        // populate Select with Options loaded from sensorsList right before the Component Mounts
        this.generationOptions = sensorList.map( (sensor) =>
            <Option key={sensor.sensorID}>{sensor.sensorName}</Option>
        );
    }

    handleOnChange(value) {
        this.props.handleOnChange(value);
    }

    render() {
        return (
            <Select className="generation-options" multiple onChange={this.handleOnChange} placeholder="Select sensors to generate chart">
                {this.generationOptions}
            </Select>
        );
    }
}


class Query extends Component {
    constructor(props) {
        super(props);

        this.state = {
            generationOptions: [],
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(value) {
        console.info(value);
    }


    render() {

        return (
            <BaseModuleTemplate moduleName="New Query">
                <ChartGenerationOptions handleOnChange={this.handleOnChange}/>

                {/* Tabs will Go here */}
            </BaseModuleTemplate>
        );
    }
}

export default Query;