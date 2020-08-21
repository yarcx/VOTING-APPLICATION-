/* grabbing the major required variables from a global scope */

const allContestants = document.querySelector(".con");
const totVotes = document.querySelector("#Total-vote");
const progressBar = document.querySelector(".progress");

/* INSTANTIATING THE INITIAL VOTE VALUES */
let totalValue = 100;
let perc = totalValue;

/* SETTING ALL THE REQUIRED VARIABLES FOR THE GENERARED HTML IN JAVASCRIPT INTO AN ARRAY FOR EASY FETCHING ON JAVASCRIPT */
const Information = [
  {
    name: "Dorathy",
    img: "img/Ellipse 1dorathy.png",
    candidatesVote: 0,
  },
  {
    name: "Brighto",
    img: "img/Brighto.jpg",
    candidatesVote: 0,
  },
  {
    name: "Erica",
    img: "img/Erica.jpg",
    candidatesVote: 0,
  },
  {
    name: "Nengi",
    img: "img/Nengi.jpeg",
    candidatesVote: 0,
  },
  {
    name: "Praise",
    img: "img/Praise.jpeg",
    candidatesVote: 0,
  },
  {
    name: "Prince",
    img: "img/Prince.jpg",
    candidatesVote: 0,
  },
];

/* MOUTING THE HTML INTO THE DOM THROUGH JAVASCRIPT */
const updatedContestants = Information.map((each) => {
  return `
  <div class="box ${each.name}">
          <div class="image">
            <img src="${each.img}" alt="${each.img}" />
          </div>
          <div class="details">
            <div class="name">${each.name}</div>
            <div class="status">
              <div class="btn1  minus">-</div>
              <div class="btn2  voting-value">0</div>
              <div class="btn3  possitive">+</div>
            </div>
          </div>
        </div>
  `;
}).join("");

allContestants.innerHTML = updatedContestants;

/* DECREMENTING EACH CANDIDATES VOTE  FUNCTIONALITY*/
document.querySelectorAll(".btn1").forEach((element) => {
  element.addEventListener("click", () => {
    if (perc >= 100) return;

    Information.map((each) => {
      let votingValue = element.parentElement;
      let parent = votingValue.parentElement;
      let grandParent = parent.parentElement;

      if (grandParent.classList.contains(each.name)) {
        let dec = grandParent.querySelector(".voting-value");
        if (each.candidatesVote <= 0) return;
        each.candidatesVote = each.candidatesVote - 1;
        dec.innerHTML = each.candidatesVote;
        perc = perc + 1;
        totVotes.innerHTML = perc;
        progressBar.style.width = perc + "%";
      }
    });
  });
});

/* INCREMENTING EACH CANDIDATES VOTE FUNCTIONALITY */
document.querySelectorAll(".btn3").forEach((element) => {
  element.addEventListener("click", () => {
    if (perc <= 0) return;
    let votingValue = element.parentElement;
    let parent = votingValue.parentElement;
    let grandParent = parent.parentElement;
    Information.map((each) => {
      if (grandParent.classList.contains(each.name)) {
        let dec = grandParent.querySelector(".voting-value");
        each.candidatesVote = each.candidatesVote + 1;
        dec.innerHTML = each.candidatesVote;
        perc = perc - 1;
        totVotes.innerHTML = perc;
        progressBar.style.width = perc + "%";
      }
    });
  });
});

/* ATTACHING THE LEADER BOARD TO THE DOM */
const showLeader = document.querySelector(".leader-board1");
const backToVote = document.querySelector(".leader-board");
showLeader.addEventListener("click", () => {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".container2").style.display = "block";
  sorts();
});

/* SENDING THE DOM BACK TO THE VOTING PAGE FROM THE LLEADER BOARD */
backToVote.addEventListener("click", () => {
  document.querySelector(".container").style.display = "block";
  document.querySelector(".container2").style.display = "none";
});

/* APPENDING THE LEADER BOARD HTML TO THE DOM */

const leads = document.querySelector("#second-grid");
function sorts() {
  const sorted = Information.sort((a, b) => a.candidatesVote - b.candidatesVote)
    .map((each) => {
      return `<div class="box">
          <div class="image">
            <img src="${each.img}" alt="dorathy" />
          </div>
          <div class="details">
            <div class="name">${each.name}</div>
            <div type="text" class="btn voting-value">${each.candidatesVote}</div>
          </div>
        </div>`;
    })
    .join("");
  leads.innerHTML = sorted;

  const whoDemEvict = Information.sort(
    (a, b) => a.candidatesVote - b.candidatesVote
  )[0];

  let tt = document.querySelector(".finish2");
  tt.innerHTML = whoDemEvict.name + " was evicted";
}
