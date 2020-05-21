import React from 'react';
import Player from "./Player";

import * as firebase from "firebase";
import CONFIG from './firebaseConfig';

class VideoPage extends React.Component {
    state = {
        videoTime: 0
    }

    componentDidMount() {
        firebase.initializeApp(CONFIG);
        firebase.database().ref('videos/' + this.props.match.params.id + '/').once('value').then(function(snapshot) {
            console.log(snapshot)
        });

    }

    testVideo = {
        poster: "https://shaka-player-demo.appspot.com/assets/poster.jpg",
        mpd: "https://storage.googleapis.com/shaka-demo-assets/tos-ttml/dash.mpd"
    }

    videoTimeHandler = (time) => {
        this.setState({videoTime:time})
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <Player timeHandler={this.videoTimeHandler} video={this.testVideo}/>
                </div>
                <div className="row">
                    {this.state.videoTime}
                </div>
            </div>)
    }
}

export default VideoPage;
