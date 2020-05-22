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

    videoTimeHandler = (time) => {
        this.setState({videoTime:time})
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <Player timeHandler={this.videoTimeHandler} video={this.state.videoData}/>
                </div>
                <div className="row">
                    {this.state.videoTime}
                </div>
            </div>)
    }
}

export default VideoPage;
