import React, { Component } from 'react';
import ModuleTemplate from './ModuleTemplate';

class FrontCamera extends Component {
    render() {
        return (
            <ModuleTemplate moduleName="Front Camera">
                <h1>Front Camera</h1>
                <video width="1280" height="720" autoplay id="Front" />
                <script src = ""></script>
            </ModuleTemplate>
        );
    }
}

export default FrontCamera;