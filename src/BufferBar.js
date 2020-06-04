import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import 'shaka-player/dist/controls.css'

class BufferBar extends React.Component {

    render() {
        return (
            <div style={{width: '100%', height: '100px'}}>

                <ResponsiveBar
                    data={this.props.data}
                    keys={[ "Played","Will Play"]}
                    margin={{ right: 80 }}
                    layout="horizontal"
                    colors={{ scheme: 'dark2' }}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisLeft={null}
                    axisBottom={null}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    labelFormat={s => s + " s"}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: true,
                            translateX: 80,
                            translateY: -20,
                            itemsSpacing: 20,
                            itemWidth: 70,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />

            </div>
        )
    }
}

export default BufferBar;
