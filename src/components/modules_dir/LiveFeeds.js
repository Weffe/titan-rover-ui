import React, { Component } from 'react';
import ModuleTemplate from './ModuleTemplate';
import { Link } from 'react-router';

class LiveFeeds extends Component {
    render() {
        return (
            <ModuleTemplate moduleName="Live Feeds">
                <Link activeClassName="active" to="/frontcamera">
                    <span className="link-text">Front Camera</span>
                    {this.props.children}
                </Link>

                <Link activeClassName="active" to="/rearcamera">
                    <span className="link-text">Rear Camera</span>
                    {this.props.children}
                </Link>

            </ModuleTemplate>
        );
    }
}

export default LiveFeeds;