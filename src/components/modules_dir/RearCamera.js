import React, { Component } from 'react';
import ModuleTemplate from './ModuleTemplate';

class RearCamera extends Component {
    render() {
        return (
            <ModuleTemplate moduleName="Rear Camera">
                <h1>Rear Camera</h1>
                <video width="1280" height="720" autoplay id="Rear" />
                <script src = ""></script>
            </ModuleTemplate>
        );
    }
}

export default RearCamera;