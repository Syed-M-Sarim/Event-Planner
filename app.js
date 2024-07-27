import {
    auth,
    storage,
    db,
    onAuthStateChanged,
    signOut,
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    arrayUnion,
    arrayRemove,
  } from "./utils/utils.js";
  
  const logout_btn = document.getElementById("logout_btn");
  const login_auth = document.getElementById("login_auth");
  const createEvent_btn = document.getElementById("create_event_btn");
  
  const user_img = document.getElementById("user_img");
  const events_cards_container = document.getElementById(
    "events_cards_container"
  );
  GetAllevents();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
  
      login_auth.style.display = "none";
      logout_btn.style.display = "inline-block";
      createEvent_btn.style.display = "inline-block";
      user_img.style.display = "inline-block";
      getUserInfo();
    } else {
      logout_btn.style.display = "none";
      createEvent_btn.style.display = "none";
      login_auth.style.display = "inline-block";
      user_img.style.display = "none";
    }
  });
  logout_btn.addEventListener("click", () => {
    signOut(auth);
  });
  function getUserInfo(uid) {
    const userRef = doc(db, "user", uid);
    getDoc(userRef).then((data) => {
      console.log("data=>", data.id);
      console.log("data=>", data.data);
      user_img.src = data.data()?.img;
    });
  }
  
  async function GetAllevents() {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      events_cards_container.innerHTML = ``;
      querySnapshot.forEach((doc) => {
        const event = doc.data();
        console.log("event=>", event);
        const { banner, location, title, creaByEmail, desc, date, time } = event;
        const card = `<div class="bg-white overflow-hidden border border-gray-200 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
    <img src="${banner}" class="w-full h-56 object-cover rounded-t-lg" alt="${title}">
    
    <div class="font-bold text-xl mb-2 text-gray-800">
      <div class="font-bold text-xl mb-2 text-gray-800">${title}</div>
      <p class="text-gray-700 text-base">${desc}</p>
    </div>
    
    <div class="px-6 pt-4 pb-2">
      <p class="text-gray-700 text-sm">
        <strong>Location:</strong> ${location}
      </p>
      <p class="text-gray-700 text-sm">
        <strong>Date & Time:</strong> ${date}, ${time}
      </p>
      <p class="text-gray-700 text-sm">
        <strong>Created By:</strong> ${creaByEmail}
      </p>
    </div>
    
    <div class="px-6 py-4 flex justify-between items-center">
      <button id=${
        doc.id
      } onclick="likeEvent(this)" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm focus:outline-none transition-colors duration-300 ease-in-out">
        ${
          auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid)
            ? "liked"
            : "like"
        } ${event?.likes?.length ? event?.likes?.length : ""}
      </button>
    </div>
  </div>
  `;
      window.likeEvent = likeEvent;
        events_cards_container.innerHTML += card;
        console.log("event", event);
      });
    } catch (err) {
      alert(err);
    }
  }
  
  async function likeEvent(e) {
    console.log(e);
    if (auth.currentUser) {
      const docRef = doc(db, "events", e.id);
      if (e.innerText == "liked") {
        updateDoc(docRef, {
          likes: arrayRemove(auth.currentUser.uid),
        })
          .then(() => {
            e.innerText = "like";
          })
          .catch((err) => console.log(err));
      } else {
        updateDoc(docRef, {
          likes: arrayUnion(auth.currentUser.uid),
        })
          .then(() => {
            e.innerText = "liked";
          })
          .catch((err) => console.log(err));
      }
    } else {
      window.location.href = "./auth/login/login.html";
    }
  }