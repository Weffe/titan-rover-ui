import React, { Component } from 'react';
import Modules from '../../components/Modules_List';

class Resources extends Component {
    render() {
        return (
            <div>
                <Modules.DummyModule1/>
                <Modules.DummyModule2/>
            </div>
        );
    }
}

export default Resources;