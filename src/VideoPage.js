import React from 'react';
import Player from "./Player";

class VideoPage extends React.Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <Player/>
                </div>
            </div>)
    }
}

export default VideoPage;
