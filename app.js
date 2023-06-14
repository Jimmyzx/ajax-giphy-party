async function handleFormSubmit(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchGiphy').value;
    const apiUrl = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`;
  
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
  
      if (data.data.length > 0) {
        const gifUrl = data.data[0].images.fixed_height.url;
        appendGif(gifUrl);
        removeAllAlerts();
      } else {
        const alertDiv = createAlert('NO GIPHYs FOUND!');
        const searchForm = document.getElementById('searchForm');
        searchForm.insertBefore(alertDiv, searchForm.firstChild);
        const closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.classList.add('close');
        closeButton.innerHTML = '&times;';
        alertDiv.appendChild(closeButton);
        closeButton.addEventListener('click', removeAlert);
      }
    } catch (error) {
      console.log(error);
    }
  
    document.getElementById('searchGiphy').value = '';
  }
  
  function createAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-danger');
    alertDiv.textContent = message;
    return alertDiv;
  }
  
  function removeAllAlerts() {
    const alertDivs = document.querySelectorAll('.alert');
    alertDivs.forEach((alertDiv) => {
      alertDiv.remove();
    });
  }
  
  function removeAlert() {
    const alertDiv = document.querySelector('.alert');
    if (alertDiv) {
      alertDiv.remove();
    }
  }
  
  function appendGif(gifUrl) {
    const imagesContainer = document.getElementById('imagesContainer');
    const colDiv = document.createElement('div');
    colDiv.setAttribute('class', 'col');
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', gifUrl);
    imgElement.setAttribute('class', 'card-img-top');
    cardDiv.appendChild(imgElement);
    colDiv.appendChild(cardDiv);
    imagesContainer.appendChild(colDiv);
  }
  
  function removeGifs() {
    const imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('remove').addEventListener('click', removeGifs);
  });
  
  console.log("Let's get this party started!");
  