let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(json => addCards(json))
    .catch(error => showError(error))
})

document.addEventListener('submit', (e) => {
  // e.preventDefault()
  const configObject = getConfigObject()
  return fetch('http://localhost:3000/toys', configObject)
    .then(res => res.json())
    .then(json => addCards(json))
    .catch(error => showError(error))
})



function addCards(toys) {
  if (toys.length) {
    toys.forEach(toy => {
      getToyAttributes(toy)
    })
  } else {
    getToyAttributes(toy)
  }
}

function getToyAttributes(toy) {
  const toyCollection = document.querySelector("#toy-collection")

  const toyCard = document.createElement('div')
  toyCard.setAttribute('class', 'card')

  const toyHeader = document.createElement('h2')
  toyHeader.innerText = toy.name ? toy.name : "N/A"
  toyCard.appendChild(toyHeader)

  const toyImage = document.createElement('img')
  toyImage.setAttribute('src', toy.image)
  toyImage.setAttribute('class', 'toy-avatar')
  toyCard.appendChild(toyImage)

  const toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes ? toy.likes : "0"
  toyCard.appendChild(toyLikes)

  const likeButton = document.createElement('button')
  likeButton.setAttribute('class', 'like-btn')
  likeButton.innerText = `Like <3`
  toyCard.appendChild(likeButton)
  likeButton.addEventListener('click', (e) => {
    increaseLikes(toy, e.target)
  })

  toyCollection.appendChild(toyCard)
}

function increaseLikes(toy, target) {
  const configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes + 1
    })
  }
  return fetch(`http://localhost:3000/toys/${toy.id}`, configObject)
    .then(res => res.json())
    .then(json => {
    // update the target's card's like number based on the json response
})
}

function showError(e) {
  const container = document.querySelector('.container')
  const errorMessage = e.message
  const div = document.createElement('div')
  div.innerText = errorMessage
  container.appendChild(div)
}

function getConfigObject() {
  const configuration = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept" : "application/json"
    }
  }
  const toyName = document.querySelector('input[name="name"]').value
  const toyImage = document.querySelector('input[name="image"]').value
  configuration.body = JSON.stringify({
    name: toyName,
    image: toyImage,
    likes: "0"
  })
  return configuration
}