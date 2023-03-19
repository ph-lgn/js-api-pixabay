const loupe = document.querySelector('.choiceLeft i');
const input = document.querySelector('.rechercher')
const photos = document.querySelector('.photos');
const videos = document.querySelector('.videos');
const wrapper = document.querySelector('.wrapper')
const searching = document.querySelector('.searching');
const titre = document.querySelector('.title');

// appel des photos

function callPhotos(query) {
  fetch(
    `https://pixabay.com/api/?key=34258575-e05aab69d79efd1fc18069e00&q=${query}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      wrapper.innerHTML =""

      
      for(i=0; i < 20; i++){
         let format = "";
        if(data.hits[i].imageWidth > data.hits[i].imageHeight){
          format = "Affichage horizontal";
        } else {
          format = "Affichage vertical";
        }
        const selectedValue = select.value;
        // Vérifie si l'image doit être affichée ou non en fonction de l'option sélectionnée
        if (selectedValue === 'All' || selectedValue === format) {
          titre.innerHTML=`
          Voici les médias correspondants à votre recherche : <strong>${input.value}</strong>`
          wrapper.innerHTML += `
              <div class="imgGrid" data-format="${format}">
              <div class="imageWrapper">
                  <img src="${data.hits[i].webformatURL}">
              </div> 
              <i class="fa-solid fa-square-up-right"></i>
            </div>
              `;
        }
    
      }

  
      // modal window
   
      const grow = document.querySelectorAll('.imgGrid i');
      const popup = document.querySelector('.boxPopUp');

      grow.forEach((element, index) => {
        element.addEventListener('click', () => {
          popup.classList.add('active');

          popup.innerHTML = `
            <i class="fa-sharp fa-solid fa-xmark"></i>
            <div class="img"><img src="${data.hits[index].webformatURL}"></div>
            <div>
              <span>Télécharger ce média :</span>
              <a href="${data.hits[index].pageURL}" target="_blank">${data.hits[index].pageURL}</a>
            </div>
          `;

          const a = document.querySelector('a');
         a.addEventListener('click', (e) => {
          e.preventDefault();
           window.open(a.getAttribute('href'), '_blank');
         });

          const close = document.querySelector('.boxPopUp i');
          close.addEventListener('click', (e) => {
            popup.classList.remove('active');
            popup.innerHTML = ""; // vider le contenu de la popup
          });
        });
        
  


      
      });
    })

    .catch((error) => {
      console.error('Erreur lors de la récupération des données :', error);
    });
}

// appel des videos
function callVideos(videos) {
  fetch(`https://pixabay.com/api/videos/?key=34262484-9de7ff969e8bde64f0dad8c7a&q=${videos}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    wrapper.innerHTML=""
    for (let i = 0; i < 20; i++) {
    wrapper.innerHTML += ` 
    <div class="video">
      <div class="image_id"><img src="https://i.vimeocdn.com/video/${data.hits[i].picture_id}_640x360.jpg" alt="img"></div>
      <i class="fa-solid fa-square-up-right"></i>
    </div>
    `;
    }
    // modal window
 
  
    const grow = document.querySelectorAll('.video i');
    const popup = document.querySelector('.boxPopUp');

    grow.forEach((element, index) => {
      element.addEventListener('click', () => {
        popup.classList.add('active');

        popup.innerHTML = `
          <i class="fa-sharp fa-solid fa-xmark"></i>
          <video controls src="${data.hits[index].videos.small.url}"></video
          <div>
            <span>Télécharger ce média :</span>
            <a href="${data.hits[index].pageURL}">${data.hits[index].pageURL}</a>
          </div>
        `;

        const a = document.querySelector('a');
       a.addEventListener('click', (e) => {
        e.preventDefault();
         window.open(a.getAttribute('href'), '_blank');
       });

        const close = document.querySelector('.boxPopUp i');
        close.addEventListener('click', (e) => {
          popup.classList.remove('active');
          popup.innerHTML = ""; // vider le contenu de la popup
        });
      });
      



    
    });
  })


  .catch(error => {
    console.error("Erreur lors de la récupération des données :", error); 
  });
  
}




loupe.addEventListener('change', (e) => {
    const valueInput = input.value;

    if(valueInput == ""){
        searching.innerHTML += `<div class="empty"> <span>Attention, le champs de recherche est vide</span></div>`;
       
    }
   if (photos.checked == true){
        
        callPhotos(valueInput)
        wrapper.innerHTML=""
    }
    if(videos.checked == true) {
      callVideos(valueInput)
      wrapper.innerHTML=""
    }
   
});

input.addEventListener('keypress', function(event) {
  const valueInput = input.value;
  if (event.key === 'Enter') {
    if(valueInput == ""){
      searching.innerHTML += `<div class="empty"> <span>Attention, le champs de recherche est vide</span></div>`;
  }
 if (photos.checked == true){
      callPhotos(valueInput)
      wrapper.innerHTML=""
  }
  if(videos.checked == true) {
    callVideos(valueInput)
    wrapper.innerHTML=""
  }
    
  }
});

const up = document.querySelector('.up');

up.addEventListener('click', (e) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const select = document.querySelector('select');

select.addEventListener('change', () => {
  const format = select.value;
  const images = document.querySelectorAll('.imgGrid');
  images.forEach((img) => {
    if (format === "All" || img.dataset.format === format) {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });
});

// img.dataset.format est la valeur de l'attribut data-format . La condition img.dataset.format === format : teste si la valeur de l'attribut data-format de l'image est égale à la valeur de la variable format. Si ok-->affichée