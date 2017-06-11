import React, { Component } from 'react';
import c3 from 'c3';
import io from 'socket.io-client';
import rover_settings from '../../rover_settings.json';
import { Button, message } from 'antd';
import moment from 'moment';

class LiveDataTemplate extends Component {

    constructor(props) {
        super(props);

        this.socketClient = io.connect(rover_settings.homebase_ip); // set client to connect to the port where the homebase server listens on
        this.state = {
            isRunning: true,
            dataObj: null,
            dataKeys: null
        };
        this.dataPointsCounter = 0;

        this.chartID = this.props.sensorName + '-' + this.props.sensorID; // creating CSS div id for later use
        this.handleStartAndPause = this.handleStartAndPause.bind(this);
        this.handleBookmark = this.handleBookmark.bind(this);
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    componentDidMount() {
        // use maxWidth to hardcode chart width for performance
        // Note: This option should be specified if possible because it can improve its performance because
        // some size calculations will be skipped by an explicit value.
        // set maxWidth to 97% of main-content width. This handles any weird re-sizing quirks.
        this.maxWidth = document.querySelector('#main-content').clientWidth * 0.97;

        // initial render of the chart
        this.renderChart();
        this.generateRandomData();
    }

    generateRandomData = () => {
        this.interval = setInterval( () => {
                let {sensorHeaders, minRange, maxRange} = this.props;
                let randomData = sensorHeaders.map(_ => {
                    return this.getRandomInt(minRange, maxRange);
                });

                this.setState({
                    randomData: randomData
                });

                this.dataPointsCounter++;
            },
            this.getRandomInt(650, 2000)
        );
    };

    componentDidUpdate() {
        this.chart.flow({
            rows: [
                this.props.sensorHeaders,
                this.state.randomData
            ],
            length: (this.dataPointsCounter > 15) ? 1 : 0
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderChart() {
        this.chart = c3.generate({
            bindto: '#' + this.chartID.toString(),
            data: {
                json: [],
                type: this.props.chartType,  // defaults to 'line' if no chartType is supplied by nature of c3.js behavior
            },
            size: {
                width: this.maxWidth
            },
            ...this.props.chartProps // additional chart properties
        });
    }

    handleStartAndPause() {

        if (this.state.isRunning) {
            // handle pause
            this.setState({isRunning: false});
            clearInterval(this.interval);
        }
        else {
            // handle start
            this.setState({isRunning: true});
            this.generateRandomData();
        }
    }

    handleBookmark() {
        let startTime, endTime, firstDataPoint, lastDataPoint;
        let chartData = this.chart.data.shown(); // returns array of nested objects

        chartData = chartData[0]; // we can just use the 1st element object to get the start/end timestamps
        firstDataPoint = chartData.values[0];
        lastDataPoint = chartData.values[(chartData.values.length-1)];
        startTime = firstDataPoint.x;
        endTime = lastDataPoint.x;

        // create time strings to be used for the display message
        let startTimeString = moment(startTime).format("HH:mm:ss");
        let endTimeString = moment(endTime).format("HH:mm:ss");

        // best to save time as unix time to localStorage
        startTime = moment(startTime).valueOf(); // get unix time value
        endTime = moment(endTime).valueOf(); // get unix time value

        let timerangeBookmarks = JSON.parse(localStorage.getItem("timerangeBookmarks")) || {}; // default to empty obj if it doesnt exist

        if (this.props.sensorName in timerangeBookmarks) {
            // sensor key already exists so add to it
            let currentBookmarkSensor = timerangeBookmarks[this.props.sensorName];

            // check if startTime Key exists
            if (startTime in currentBookmarkSensor) {
                // we append to the already created endTime array
                let endTimeArr = currentBookmarkSensor[startTime];
                endTimeArr.push(endTime);
            }
            else {
                // we create an endTime array with the value inside
                currentBookmarkSensor[startTime] = [endTime];
            }
        }
        else {
            // we need to init and add bookmark sensor to the json obj
            // startTime will be a key to an array of endTimes
            timerangeBookmarks[this.props.sensorName] = {[startTime]: [endTime]};
        }

        // convert to string before storing or else itll break
        timerangeBookmarks = JSON.stringify(timerangeBookmarks);
        localStorage.setItem('timerangeBookmarks', timerangeBookmarks);

        message.success('[' + this.props.sensorName + '-' + this.props.sensorID + '] ' +
            'Bookmarked: ' + startTimeString + ' - ' + endTimeString, 2.5);
    };

    render() {
        let isRunningState = (this.state.isRunning) ? 'Pause Chart' : 'Start Chart';

        return (
            <div>
                <div className="controls">
                    <Button type="primary" onClick={this.handleStartAndPause}>{isRunningState}</Button>
                    <Button onClick={this.handleBookmark}>Bookmark Start & End Timestamp</Button>
                </div>
                <div id={this.chartID}/>
            </div>
        );
    }
}

export default LiveDataTemplate;

// this format handles bookmarks with the same start time but multiple endTimes
// {
//     DHT-11: {
//      startTime: [endTime, endTime, ...],
//      startTime: [endTime, endTime, ...],
//      ...
//     },
//     ...
// }

