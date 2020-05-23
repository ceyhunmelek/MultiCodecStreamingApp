import React from 'react';
import {Link} from "react-router-dom";

class VideoListItem extends React.Component {
    render() {
        return (
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={this.props.video.poster} alt={"poster"} className="card-img"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <Link to={"/video/"+ this.props.video.id}><h5 className="card-title">{this.props.video.title}</h5></Link>
                            <p className="card-text">{this.props.video.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default VideoListItem;