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
            <div className="container">
                <div className="row">
                    {
                        this.state.videos.map(video => <VideoListItem key={video.id} video={video} />)
                    }
                    {/*
                    <div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img src="..." class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
                    */}
                </div>
            </div>)
    }
}

export default HomePage;