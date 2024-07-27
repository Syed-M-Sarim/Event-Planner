import {
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    collection,
    addDoc,
    db,auth
  } from "../utils/utils.js";
  console.log("AUTH",auth);
  
  // ADD ID"s from Html
  const event_form = document.getElementById("event_form");
  
  event_form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
  
    const eventInfo = {
      banner: e.target[0].files[0],
      title: e.target[1].value,
      desc: e.target[2].value,
      location: e.target[3].value,
      date: e.target[4].value,
      time: e.target[5].value,
      createdBy: auth.currentUser.uid,
      creaByEmail: auth.currentUser.email,
      Likes:[]
    };
    console.log("event Info", eventInfo);
  
    const imgRef = ref(storage, eventInfo.banner.name);
    uploadBytes(imgRef, eventInfo.banner).then(() => {
      console.log("upload ho gayi");
      getDownloadURL(imgRef).then((url) => {
        console.log("url Aa gya",url);
        eventInfo.banner = url;
  
        // adding Documents
        const eventCollection=collection(db,"events");
        addDoc(eventCollection,eventInfo).then((doc)=>{
          console.log("document Added");
          window.location.href='../index.html'
        })
      });
    });
  });