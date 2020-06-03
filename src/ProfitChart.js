import React from 'react';
import {ResponsiveLine} from "@nivo/line";
import 'shaka-player/dist/controls.css'

class ProfitChart extends React.Component {
    render() {
        return (
            <div style={{width: '100%', height: '300px'}}>

                <ResponsiveLine
                    data={this.props.chartData}
                    margin={{top: 50, right: 110, bottom: 50, left: 60}}
                    xScale={{type: 'point'}}
                    yScale={{type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false}}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Second',
                        legendOffset: 36,
                        legendPosition: 'middle',
                        format: s => {
                            let minute = Math.trunc(s / 60);
                            let second = s % 60;
                            return ((minute < 10) ? '0' : '') + minute + ':' + ((second < 10) ? '0' : '') + second;
                        }
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Mbps',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{scheme: 'nivo'}}
                    pointSize={10}
                    pointColor={{theme: 'background'}}
                    pointBorderWidth={2}
                    pointBorderColor={{from: 'serieColor'}}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />

                {
                    (this.props.costs.currentCodec !== "h264" && this.props.costs.currentCodec !== "")?

                        <p className={"lead text-center mt-5"}>Your browser supports {this.props.costs.currentCodec.toUpperCase()} codec. You
                            downloaded {this.props.costs.currentCost} KB of data. Same data in AVC codec would
                            be {this.props.costs.avcCost} KB<br/>
                            That means your cost reduction will
                            be {((this.props.costs.avcCost - this.props.costs.currentCost) * 0.025).toFixed(2)} USD assuming 1,000,000 Views
                            and 0.025 USD Distribution Cost per GB</p>:""
                }

            </div>
        )
    }
}

export default ProfitChart;
