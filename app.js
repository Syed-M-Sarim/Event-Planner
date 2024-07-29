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
const events_cards_container = document.getElementById("events_cards_container");

GetAllevents();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

    login_auth.style.display = "none";
    logout_btn.style.display = "inline-block";
    createEvent_btn.style.display = "inline-block";
    user_img.style.display = "inline-block";
    getUserInfo(uid);
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
      const card = `
      <div class="event-card">
        <img src="${banner}" class="w-full h-56 object-cover rounded-t-lg" alt="${title}">
        <div class="p-4">
          <h2>${title}</h2>
          <p>${desc}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Date & Time:</strong> ${date}, ${time}</p>
          <p><strong>Created By:</strong> ${creaByEmail}</p>
          <button id=${doc.id} onclick="likeEvent(this)" class="button">
            ${
              auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid)
                ? "liked"
                : "like"
            } ${event?.likes?.length ? event?.likes?.length : ""}
          </button>
        </div>
      </div>`;
      window.likeEvent = likeEvent;
      events_cards_container.innerHTML += card;
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
