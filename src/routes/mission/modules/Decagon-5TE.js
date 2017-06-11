import React, { Component } from 'react';
import BaseModuleTemplate from '../../../templates/BaseModuleTemplate';
import LiveDataTemplate from '../../../templates/LiveDataTemplate';

class Decagon5TE extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseModuleTemplate moduleName="Decagon-5TE Chart">
                <LiveDataTemplate
                    sensorName="Decagon-5TE"
                    sensorID="01"
                    chartType="line"
                    sensorHeaders={['EC', 'VWC', 'Soil Temp (C)']}
                    minRange={50}
                    maxRange={500}
                />

            </BaseModuleTemplate>
        );
    }
}

export default Decagon5TE;

/*
    It's important to pass in the sensorName and sensorID exacly as it's typed in
    rover_settings.json to the LiveDataTemplate (it's case-sensitive)
 */