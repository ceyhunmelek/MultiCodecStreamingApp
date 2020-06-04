import React from 'react';
import {ResponsiveLine} from "@nivo/line";
import 'shaka-player/dist/controls.css'

class ProfitChart extends React.Component {
    render() {
        return (
            <div style={{width: '100%', height: '500px'}}>

                <ResponsiveLine
                    data={this.props.chartData}
                    margin={{top: 20, right: 110, bottom: 50, left: 60}}
                    xScale={{type: 'point'}}
                    yScale={{type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false}}
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
                    colors={{scheme: 'dark2'}}
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

            </div>
        )
    }
}

export default ProfitChart;
