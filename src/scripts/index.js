const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites';


async function getRandomImages() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random')
  console.log(data)

  if (res.status !== 200) {
    // spanError.innerHTML = "Hubo un error: " + res.status;
    console.log('Hubo un error');
  } else {
    const img1 = document.getElementById('img-1');
    const img2 = document.getElementById('img-2');
    const btn1 = document.getElementById('btn-1');
    const btn2 = document.getElementById('btn-2');
    img1.src = data[0].url;
    img2.src = data[1].url;
    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
  }
}

function createCardsList() {

  for (let index = 0; index < 2; index++) {
    const dashboard = document.getElementById('dashboard');

    const img = document.createElement('img');
    img.id = `img-${index + 1}`;

    const btn = document.createElement('button');
    btn.id = `btn-${index + 1}`;
    btn.className = 'btn';
    btn.textContent = 'Add to favorites';

    const card = document.createElement('div');
    card.className = 'card';
    card.append(img, btn);
    dashboard.append(card)
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

createCardsList();
getRandomImages();
