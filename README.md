# Multicodec Dash Video Streaming Service

This project is senior design project of [Ceyhun Melek](https://github.com/ceyhunmelek) and [Mehmet Ali Bayır](https://github.com/mehmetalibayir) under the consultancy of [Dr. Cihat Çetinkaya](https://orcid.org/0000-0001-8583-196X)

[Demo](https://thesis.ceyhun.codes/)

## Installation

After you install [npm](https://www.npmjs.com/get-npm) there are few steps to complete installation

##### 1. Clone the repository 📀

```bash
git clone https://github.com/ceyhunmelek/multicodecstreamingapp.git
```

##### 2. Download all dependencies 📌

Get in the project directory with **"cd multicodecstreamingapp"**, then download all dependencies.
```bash
npm install --save
```

##### 3. Edit firebase credentials 🔒

There is a **firebaseConfig.js** file in **src** directory. Change the variable named firebaseConfig with your firebase project's credentials.

```javascript
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
```

##### 4. Create database 🗃

You need to create your documents with structure shown below

![alt text](https://firebasestorage.googleapis.com/v0/b/multicodecdashdemo.appspot.com/o/5236657d2bbae931ec4618eeda11a7c0.png?alt=media&token=ef622995-aa9d-4657-9eef-9b8c7fb7365c "Database structure")

##### 5. Start your project 🚀


```
npm start
```

## Dataset

You can create your own videos via [our transcoder](https://github.com/mehmetalibayir/MulticodecTranscoder) or you can use existing videos listed below.

|Name|Desc|Manifes File|Source|
|:---|:---|:---:|:---:|
|Bernese Oberland|A video from [pixabay](https://pixabay.com/) has encoded by our transcoder|[URL](https://storage.ceyhun.codes/datasets/BerneseOberland/dash.mpd)|[URL](https://pixabay.com/tr/videos/bernese-oberland-bulutlar-sis-9794/)
|Drone Footage|A video from [pexels](https://www.pexels.com/) has encoded by our transcoder|[URL](https://storage.ceyhun.codes/datasets/DroneFootage/dash.mpd)|[URL](https://www.pexels.com/video/drone-footage-of-a-town-854222/)
|Mountains 1|A video from [pixabay](https://pixabay.com/) has encoded by our transcoder|[URL](https://storage.ceyhun.codes/datasets/Mountains1/dash.mpd)|[URL](https://pixabay.com/tr/videos/da%C4%9Flar-bulutlar-4k-do%C4%9Fa-so%C4%9Fuk-31175/)
|Mountains 2|A video from [pixabay](https://pixabay.com/) has encoded by our transcoder|[URL](https://storage.ceyhun.codes/datasets/Mountains2/dash.mpd)|[URL](https://pixabay.com/tr/videos/da%C4%9Flar-kar-do%C4%9Fa-4k-peyzaj-so%C4%9Fuk-31174/)
|Music City|A video from [pixabay](https://pixabay.com/) has encoded by our transcoder|[URL](https://storage.ceyhun.codes/datasets/MusicCity/dash.mpd)|[URL](https://pixabay.com/tr/videos/m%C3%BCzik-%C5%9Fehir-nashville-%C5%9Fehrin-i%CC%87ha-33354/)
|Sintel|It is a dataset from [shaka player demo page](https://shaka-player-demo.appspot.com/demo/) which is an open movie by [Blender Foundation](https://www.blender.org/foundation/)|[URL](https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd)|[URL](https://durian.blender.org/)
