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
    .then(json => makeCards(json))
    .catch(error => showError(error))
})

function makeCards(toys) {
  const toyCollection = document.querySelector("#toy-collection")

  toys.forEach(toy => {
    const toyCard = document.createElement('div')
    toyCard.setAttribute('class', 'card')

    const toyHeader = document.createElement('h2')
    toyHeader.innerText = toy.name
    toyCard.appendChild(toyHeader)

    const toyImage = document.createElement('img')
    toyImage.setAttribute('src', toy.image)
    toyImage.setAttribute('class', 'toy-avatar')
    toyCard.appendChild(toyImage)

    const toyLikes = document.createElement('p')
    toyLikes.innerText = toy.likes 
    toyCard.appendChild(toyLikes)

    const likeButton = document.createElement('button')
    likeButton.setAttribute('class', 'like-btn')
    likeButton.innerText = `Like <3`
    toyCard.appendChild(likeButton)

    toyCollection.appendChild(toyCard)
  })
}

function showError(e) {
  const container = document.querySelector('.container')
  const errorMessage = e.message
  const div = document.createElement('div')
  div.innerText = errorMessage
  container.appendChild(div)
}