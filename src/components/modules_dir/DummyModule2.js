import React, { Component } from 'react';
import ModuleTemplate from './ModuleTemplate';

class DummyModule2 extends Component {
    render() {
        return (
            <ModuleTemplate moduleName="Dummy Module 2">
                <p>
                    TIL that when 'Star Trek: The Next Generation' began, Patrick Stewart dreaded having to learn and recite technobabble dialogue. He got used to doing so, however, and "space-time continuum" became his favorite technical phrase.
                </p>
            </ModuleTemplate>
        );
    }
}

export default DummyModule2;