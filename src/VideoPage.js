import React from 'react';
import Player from "./Player";
import xml2js from 'xml2js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import CONFIG from './firebaseConfig';
import ProfitChart from "./ProfitChart";
import BufferBar from "./BufferBar";

class VideoPage extends React.Component {
    state = {
        allBandwiths:{},
        codec: '',
        chartData: [],
        cost:{},
        buffer:[]
    }

    componentDidMount() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(CONFIG);
        }
        let bitrateList = {
        }
        firebase.firestore().collection("videos").doc(this.props.match.params.id).get().then((doc) => {
            if (doc.exists) {
                this.setState({videoData: doc.data()})

                fetch(doc.data().mpd).then(response => response.text())
                    .then((response) => {
                        let parser = new xml2js.Parser();
                        parser.parseStringPromise(response).then((parsedXML) => {
                            parsedXML.MPD.Period[0].AdaptationSet.forEach(adaptationset => {
                                if(adaptationset.$.contentType === "video"){
                                    adaptationset.Representation.forEach(representation => {
                                        if(representation.$.mimeType.includes("video")){
                                            if (representation.$.codecs.includes("vp")) {
                                                if(bitrateList.vp9 === undefined){
                                                    bitrateList.vp9 = {}
                                                }
                                                bitrateList.vp9[representation.$.height] = representation.$.bandwidth
                                            } else if (representation.$.codecs.includes("avc")) {
                                                if(bitrateList.h264 === undefined){
                                                    bitrateList.h264 = {}
                                                }
                                                bitrateList.h264[representation.$.height] = representation.$.bandwidth
                                            } else if (representation.$.codecs.includes("hev")) {
                                                if(bitrateList.h265 === undefined){
                                                    bitrateList.h265 = {}
                                                }
                                                bitrateList.h265[representation.$.height] = representation.$.bandwidth
                                            }
                                        }
                                    });
                                }
                            });
                            Object.keys(bitrateList).forEach(codecToData => {
                                this.state.chartData.push({
                                    "id": codecToData,
                                    "data": []
                                })
                            })

                            this.setState({
                                allBandwiths: bitrateList
                            });
                        })
                    })

            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    chartInfoHandler = (info, codec,buffer) => {
        let tmpChartData = this.state.chartData;
        tmpChartData.forEach(eachCodec => {
            if(Object.keys(this.state.allBandwiths[eachCodec.id]).length !== 0){
                eachCodec.data.push(
                    {
                        "x": Math.round(info.playTime),
                        "y": parseInt(this.state.allBandwiths[eachCodec.id][info.height]) / 1000000
                    });
                if(eachCodec.data.length > 30){
                    eachCodec.data.shift()
                }
            }
        });

        let tmpCost = this.state.cost;
        Object.keys(this.state.allBandwiths).forEach(codecToCost => {
            if(tmpCost[codecToCost] === undefined){
                tmpCost[codecToCost] = 0
            }
            tmpCost[codecToCost] += Math.floor(this.state.allBandwiths[codecToCost][info.height] / 8000)
        })

        let tmpBuffer = [
            {
                "id": "1",
                "Played": parseInt((buffer.time - buffer.start).toFixed(2)),
                "Will Play": parseInt((buffer.end - buffer.time).toFixed(2))
            }
        ]

        this.setState({
            chartData: tmpChartData,
            cost:tmpCost,
            codec: codec,
            buffer: tmpBuffer
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12 col-lg-6">
                        <Player chartHandler={this.chartInfoHandler} video={this.state.videoData}/>
                    </div>
                    <div className="col-12 col-lg-6 pl-lg-5">
                        <div className="table">
                            <table className="table"><thead>
                            <tr>
                                <th scope="col"></th>
                                {
                                    Object.keys(this.state.cost).map(costOfCodec => {
                                        return <th key={costOfCodec} scope="col">{costOfCodec.toUpperCase()}{(costOfCodec ===this.state.codec)?"*":""}</th>
                                    })
                                }
                            </tr>
                            </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">Data Downloaded</th>
                                    {
                                        Object.keys(this.state.cost).map(costOfCodec => {
                                            return <td key={costOfCodec}>{(this.state.cost[costOfCodec] / 1000).toFixed(1)} MB</td>
                                        })
                                    }
                                </tr>
                                <tr>
                                    <th scope="row">Assumed Cost</th>
                                    {
                                        Object.keys(this.state.cost).map(costOfCodec => {
                                            return <td key={costOfCodec}>{(this.state.cost[costOfCodec] * 0.025).toFixed(1)} $</td>
                                        })
                                    }
                                </tr>
                                </tbody>
                            </table>
                            <small>*While calculating cost, we assumed 1,000,000 Views and 0.025 USD Distribution Cost per GB</small>
                            <p className={"lead mb-0 mt-4"}>Buffer Size</p>
                            <BufferBar data={this.state.buffer}></BufferBar>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <p className={"lead mb-0 mt-4 text-center w-100"}>Codec Comparison</p>
                    <ProfitChart chartData={this.state.chartData}/>
                </div>
            </div>)
    }
}

export default VideoPage;
