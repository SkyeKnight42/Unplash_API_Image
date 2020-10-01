
const AccessKey = 'XAtVdRNagvmx4_-hzujS5jq9N3BXMNBWE1MoQPBhhA0'
const PrivateKey = 'cY0OyVXeasSHJPZ_Dpv1kO70VdzEEHqIaFX5QmYXrjU'

const imageContainer = document.getElementById('image_container')

const addItemButton = document.getElementById('add_button')
const newImageButton = document.getElementById('new_button')
const inputField = document.getElementById('email_input')
const emailError = document.getElementById('email_error')
const APIError = document.getElementById('API_error')

emailError.style.color = 'white'
APIError.style.color = 'white'

let testedEmail
let imageURL
previewImage()

addItemButton.addEventListener('click', () => {
    validateEmail(inputField.value)

    previewImage()
})

newImageButton.addEventListener('click', () => {
    previewImage();
})

function validateEmail(emailInput) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailInput.match(mailformat)) { //Validate Email

        emailError.style.color = 'white'

        // If email is valid, store the variable for once an image has successfully been retrieved from the API
        testedEmail = document.getElementById(emailInput) 

        // searchPhotos(emailInput)
        if (testedEmail) {
            addImagetoBox(imageURL, emailInput)
        } else {
            createImageBox(imageURL, emailInput)
        }

    } else {
        emailError.style.color = 'red'
    }
}

function createImageBox(_image, _email) {
    let image = _image
    let email = _email

    const imageBox = document.createElement('div')
    imageBox.classList.add('image_box')
    imageBox.id= email
    imageContainer.appendChild(imageBox)
    imageBox.insertAdjacentHTML("beforeend", `<p>${email}</p><img src="${image}" class="image">`)
}

function addImagetoBox(_image, _email) {
    let image = _image
    let email = _email

    const imageBox = document.getElementById(email)
    imageBox.insertAdjacentHTML("beforeend", `<img src="${image}" class="image">`)

}

function previewImage() {
    const url = "https://api.unsplash.com/photos/random/?client_id="+AccessKey
    fetch(url)
        .then(function (data) {
            APIError.style.color='white'
            return data.json()
        })
        .then(function(data) {
            imageURL = data.urls.regular
            document.getElementById('preview_image').src = imageURL
            APIError.style.color='white' 
        })
        .catch(function() {
            APIError.style.color = 'red'
        })
}