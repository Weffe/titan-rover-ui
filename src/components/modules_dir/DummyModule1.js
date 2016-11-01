import React, { Component } from 'react';
import ModuleTemplate from './ModuleTemplate';

class DummyModule1 extends Component {
    render() {
        return (
            <ModuleTemplate moduleName="Dummy Module 1">
                <p>
                    TIL: Ancient Romans would dye their hair black, because blonde hair was associated with prostitutes or French and German slaves. This trend began declining when Augustus Caesar, who was blonde, became Rome's first emperor.
                </p>
            </ModuleTemplate>
        );
    }
}

export default DummyModule1;