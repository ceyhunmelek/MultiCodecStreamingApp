import React from 'react';
import Chart from 'chartjs'
import 'shaka-player/dist/controls.css'

class ProfitChart extends React.Component {

    render() {
        return (
            <div>
                {this.props.videoTime}
            </div>)
    }
}

export default ProfitChart;
