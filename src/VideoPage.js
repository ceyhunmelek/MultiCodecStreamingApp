import React from 'react';
import Player from "./Player";
import xml2js from 'xml2js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import CONFIG from './firebaseConfig';
import ProfitChart from "./ProfitChart";

class VideoPage extends React.Component {
    state = {
        chartInfo: [],
        allBandwiths:{},
        codec: '',
        chartData: [{
            "id": "vp9",
            "color": "rgb(255,112,0)",
            "data": []
        }, {
            "id": "h265",
            "color": "rgb(5,168,255)",
            "data": []
        }, {
            "id": "h264",
            "color": "rgb(219,14,20)",
            "data": []
        }]
    }

    componentDidMount() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(CONFIG);
        }
        let bitrateList = {
            vp9: {
            },
            h264: {
            },
            h265: {
            }
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
                                                bitrateList.vp9[representation.$.height] = representation.$.bandwidth
                                            } else if (representation.$.codecs.includes("avc")) {
                                                bitrateList.h264[representation.$.height] = representation.$.bandwidth
                                            } else if (representation.$.codecs.includes("hev")) {
                                                bitrateList.h265[representation.$.height] = representation.$.bandwidth
                                            }
                                        }
                                    });
                                }
                            });
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



    chartInfoHandler = (info, codec) => {
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
        })
        this.setState({
            chartData: tmpChartData,
            codec: codec
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Player chartHandler={this.chartInfoHandler} video={this.state.videoData}/>
                </div>
                <div className="row">
                    <ProfitChart chartData={this.state.chartData}/>
                </div>
            </div>)
    }
}

export default VideoPage;
