import React, { Component } from 'react';
import BaseModuleTemplate from '../../../templates/BaseModuleTemplate';
import LiveDataTemplate from '../../../templates/LiveDataTemplate';

class C02 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseModuleTemplate moduleName="C02 Chart">
                <LiveDataTemplate
                sensorName="C02"
                sensorID="02"
                chartType="line"
                sensorHeaders={['C02 (PPM)']}
                minRange={0}
                maxRange={200}
                />

            </BaseModuleTemplate>
        );
    }
}

export default C02;

/*
 It's important to pass in the sensorName and sensorID exacly as it's typed in
 rover_settings.json to the LiveDataTemplate (it's case-sensitive)
 */