import React, { Component} from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: {
                seconds: 0,
                minutes: 0,
                hours: 0,
            },
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    start = () => {
        this.reset();
        this.interval = setInterval(() => this.tick(), 1000);
    }

    stop = () => {
        clearInterval(this.interval);
    }
    
    reset() {
        clearInterval(this.interval);
        
        this.setState({
            time: {
                seconds: 0,
                minutes: 0,
                hours: 0,
            }
        });
    }

    tick() {
        const { time } = this.state;
        let t = time;

        //fail if time is negative
        if(time.seconds < 0 || time.minutes < 0 || time.hours < 0)
            return false;

        if(time.seconds < 59)
            t.seconds++;
        else if(time.minutes < 59) {
            t.seconds = 0;
            t.minutes++;
        } else {
            t.seconds = 0;
            t.minutes = 0;
            t.hours++;
        }

        this.setState({
            time: t,
        });

        return true;
    }

    padNumber(num) {
        if(num < 10)
            return '0' + num;
        else
            return num;
    }

    render() {
        const { time } = this.state;

        return (
            <div id='timer'>
                <p>{this.padNumber(time.hours)}:{this.padNumber(time.minutes)}:{this.padNumber(time.seconds)}</p>
            </div>
        );
    }
}

export default Timer;