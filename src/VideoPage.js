import React from 'react';
import Player from "./Player";

import firebase from 'firebase/app';
import 'firebase/firestore';
import CONFIG from './firebaseConfig';
import ProfitChart from "./ProfitChart";

class VideoPage extends React.Component {
    state = {
        chartInfo: []
    }

    chartInfoHandler = (info) => {
        this.setState({
            chartInfo: [...this.state.chartInfo,info]
        })
    }

    componentDidMount() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(CONFIG);
        }
        firebase.firestore().collection("videos").doc(this.props.match.params.id).get().then((doc) => {
            if (doc.exists) {
                this.setState({videoData:doc.data()})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <Player chartHandler={this.chartInfoHandler} video={this.state.videoData}/>
                </div>
                <div className="row">
                    <ProfitChart chartData={this.state.chartInfo} />
                </div>
            </div>)
    }
}

export default VideoPage;
