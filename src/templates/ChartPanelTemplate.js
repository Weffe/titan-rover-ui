import React, { Component } from 'react';
import { Layout, Button, Radio, Modal, TimePicker } from 'antd';
const { Content, Header } = Layout;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class PanelOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            queryAllData: true,
            queryByTimerange: false,
            queryStartTime: null,
            queryEndTime: null,

            modalVisible: false,
            tempStartTime: null, // temporary time holders for the time-pickers
            tempEndTime: null    // temporary time holders for the time-pickers
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    }

    handleOnChange(event) {
        // swapping values based on event.target.value
        if (event.target.value == 'queryAllData') {
            this.setState({
                queryAllData: true,
                queryByTimerange: false
            });
        }
        else {
            this.setState({
                queryAllData: false,
                queryByTimerange: true
            });
        }
    }

    showModal() {
        // set start and end time to old values if the user cancels modal
        this.state.tempStartTime = this.state.queryStartTime;
        this.state.tempEndTime = this.state.queryEndTime;
        this.setState({modalVisible: true});
    };

    handleOk() {
        // we set new time changes
        this.setState({modalVisible: false, queryStartTime: this.state.tempStartTime, queryEndTime: this.state.tempEndTime});
    }

    handleCancel() {
        // we discard time changes
        this.setState({modalVisible: false});
    }

    handleStartTimeChange(time) {
        this.setState({tempStartTime: time})
    }

    handleEndTimeChange(time) {
        this.setState({tempEndTime: time})
    }

    render() {
        return (
            <div>
                <RadioGroup onChange={this.handleOnChange} defaultValue="queryAllData">
                    <RadioButton value="queryAllData">Query All Data</RadioButton>
                    <RadioButton value="queryByTimerange" onClick={this.showModal}>Query By Timerange</RadioButton>
                </RadioGroup>

                <Modal title="Query By Timerange Settings" visible={this.state.modalVisible}
                       onOk={this.handleOk} onCancel={this.handleCancel}
                       okText="Good to go!" cancelText="Don't save settings"
                       maskClosable={false} className="queryByTimerange-settings"
                >
                    <div className="time-picker">
                        <h3>Start Time</h3>
                        <TimePicker value={this.state.tempStartTime} onChange={this.handleStartTimeChange}
                                    placeholder="Start Time"
                        />
                    </div>

                    <div className="time-picker">
                        <h3>End Time</h3>
                        <TimePicker value={this.state.tempEndTime} onChange={this.handleEndTimeChange}
                                    placeholder="End Time"
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

class ChartPanelTemplate extends Component {
    render() {
        return (
            <Layout>
                <Header>
                    <PanelOptions/>
                    <Button>Query Data</Button>
                </Header>

                <Content>
                    chart here
                </Content>
            </Layout>
        );
    }
}

export default ChartPanelTemplate;