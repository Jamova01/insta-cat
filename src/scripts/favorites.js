// import { saveFavouriteMichi } from './main.js';

const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': 'live_LQdBU6Mhcou5uaKSyEH05klVqL3l3H6Qfh5U0QXnFogVn6F8i9X1kjEMo6xTROXz'
    },
  });

  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Michi eliminado de favoritos');
    loadFavouriteMichis();
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOTITES,
    {
      method: 'GET',
      headers: { 'X-API-KEY': 'live_LQdBU6Mhcou5uaKSyEH05klVqL3l3H6Qfh5U0QXnFogVn6F8i9X1kjEMo6xTROXz' }
    });
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

  if (res.status !== 200) {
    // spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    console.log('Hubo un erro');
  } else {
    const favorites = document.getElementById('favorites');
    favorites.innerHTML = "";

    data.forEach(michi => {
      console.log('michis favoritos');
      const img = document.createElement('img');
      img.src = michi.image.url

      const btn = document.createElement('button');
      btn.id = `btn-${michi.id}`;
      btn.className = 'btn';
      btn.textContent = 'Delete';
      btn.onclick = () => deleteFavouriteMichi(michi.id);

      const card = document.createElement('div');
      card.className = 'card';
      card.append(img, btn);
      favorites.append(card)
    });
  }
}

async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'live_LQdBU6Mhcou5uaKSyEH05klVqL3l3H6Qfh5U0QXnFogVn6F8i9X1kjEMo6xTROXz'
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  // const data = await res.json();

  console.log('Save')
  console.log(res)

  if (res.status !== 200) {
    // spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    // console.log('Added to favoritos');
    // loadFavouriteMichis();
  }
}


async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm');
  const formData = new FormData(form);

  console.log(formData.get('file'));

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',

      'X-API-KEY': 'live_LQdBU6Mhcou5uaKSyEH05klVqL3l3H6Qfh5U0QXnFogVn6F8i9X1kjEMo6xTROXz',
    },
    body: formData,
  });

  const data = await res.json();

  if (res.status !== 201) {
    spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
  } else {
    console.log("Foto de michi cargada :)");
    console.log({ data });
    console.log(data.url);
    saveFavouriteMichi(data.id) //para agregar el michi cargado a favoritos.
    loadFavouriteMichis();
  }

}

loadFavouriteMichis();
