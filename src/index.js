const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form')
const nameInput = document.querySelector('#name-input')
const imageInput = document.querySelector('#image-input')
const toyContainer = document.querySelector('#toy-collection')


let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

const appendToy = toy => {
  let toyEl = document.createElement('div')
    toyEl.className = 'card'
    toyEl.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p class='likes'>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  `
  const likesEl = toyEl.querySelector('.likes')
  const likeBtnEl = toyEl.querySelector('.like-btn')
    likeBtnEl.addEventListener('click', () => {
      toy.likes++
      likesEl.innerText = `${toy.likes} Likes`
      updateToy(toy)
    })
  toyContainer.appendChild(toyEl)
}

const appendToys = (toys) => {
  toys.forEach(toy => appendToy(toy))
}

const getToys = () =>
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())

addToyForm.addEventListener('submit', event => {
  event.preventDefault();

  const toy = {
    name: nameInput.value,
    image: imageInput.value,
    likes: 0
  }
  appendToy(toy)
  createToy(toy)
})

const createToy = (toy) => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(toy)
  }).then(resp => resp.json())

}

const updateToy = (toy) =>
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(toy)
  }).then(resp => resp.json())





getToys().then(appendToys)
















// const toyFetch = () =>
//   fetch("http://localhost:3000/toys")
//     .then(resp => resp.json())
//     .then(appendToys)
//
// const appendToys = (toys) => {
//       toys.forEach(index => {
//         let divEl = document.createElement("div")
//             divEl.setAttribute('class', 'card')
//             divEl.innerHTML = `
//               <h2> ${index.name}
//               <img class="toy-avatar" src = "${index.image}">
//               <p> ${index.likes}</p>
//               <button class="like-btn">Like <3</button>
//               `
//             toyCollection.appendChild(divEl);
//             })
// }
// const createToy = (newToy) => {
//   fetch('http://localhost:3000/toys', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newToy)
//   }).then(resp => resp.json())
// }
//
// cToy.addEventListener('click', function(event){
//   event.preventDefault();
//   const newToy = {
//     name: toyName.value,
//     image: toyUrl.value,
//     likes: 0
//   }
//   createToy(newToy)
//   toyCollection.clear();
//   toyFetch();
// })
//
// toyFetch();
