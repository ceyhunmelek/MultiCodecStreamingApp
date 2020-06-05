# Multicodec Dash Video Streaming Service

This project is senior design project of [Ceyhun Melek](https://github.com/ceyhunmelek) and [Mehmet Ali Bayır](https://github.com/mehmetalibayir) under the consultancy of [Dr. Cihat Çetinkaya](https://orcid.org/0000-0001-8583-196X)

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
