import {
    createUserWithEmailAndPassword,
    auth,
    setDoc,
    db,
    uploadBytes,
    ref,
    doc,
    getDownloadURL,
    storage,
  } from "../../utils/utils.js";
  // Getting ID's From Html
  const signup_btn = document.getElementById("signup_form");
  const submit_btn = document.getElementById("submit_btn");
  
  signup_btn.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target);
    const img = e.target[0].files[0];
    const email = e.target[1].value;
    const password = e.target[2].value;
    const firstName = e.target[4].value;
    const lastName = e.target[5].value;
    const phone = e.target[6].value;
    const company = e.target[7].value;
  
    const userInfo = {
      img,
      email,
      password,
      firstName,
      lastName,
      phone,
      company,
    };
    console.log("userinfo=>", userInfo);
    // creating account
    submit_btn.disabled = true;
    submit_btn.innerText = "loading...";
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("user=>", user);
        //  upload image
        const userRef = ref(storage, `user/${user.user.uid}`);
        uploadBytes(userRef, img)
          .then(() => {
            console.log("user image uploaded");
            getDownloadURL(userRef)
              .then((url) => {
                console.log("url", url);
                // update info
                userInfo.img = url;
                // create user doc
                const userDbref = doc(db, "user", user.user.uid);
  
                setDoc(userDbref, userInfo).then(() => {
                  console.log("user updated to DB");
                  window.location.href = "/";
                  submit_btn.disabled = false;
                  submit_btn.innerText = "submit";
                });
              })
              .catch((err) => {
                console.log("url nh hai");
                submit_btn.disabled = false;
                submit_btn.innerText = "submit";
              });
          })
          .catch(() => {
            console.log("error in uploading image");
            submit_btn.disabled = false;
            submit_btn.innerText = "submit";
          });
      })
      .catch((err) => {
        alert(err), (submit_btn.disabled = false);
        submit_btn.innerText = "submit";
      });
  });