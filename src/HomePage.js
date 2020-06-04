import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import CONFIG from './firebaseConfig';
import VideoListItem from "./VideoListItem";

class HomePage extends React.Component {
    state = {
        videos: []
    }

    componentDidMount() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(CONFIG);
        }
        firebase.firestore().collection("videos").get().then( querySnapshot => {
            querySnapshot.forEach(doc => {
                this.setState({videos:[...this.state.videos,{...doc.data(), id:doc.id}]})
            });
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    }

    render() {
        return (
            <div className="container my-4">
                <div className="row">
                    <p className={"display-4"}>Multicodec Dash Video Streaming Service</p>
                    <p className={"lead"}>By <a href={"https://github.com/ceyhunmelek"}>Ceyhun Melek</a> and  <a href={"https://github.com/mehmetalibayir"}>Mehmet Ali Bayır</a> under the consultancy of <a href={"https://orcid.org/0000-0001-8583-196X"}>Dr. Cihat Çetinkaya</a></p>
                    {
                        this.state.videos.map(video => <VideoListItem key={video.id} video={video} />)
                    }
                </div>
            </div>)
    }
}

export default HomePage;