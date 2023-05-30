import mapImage from './assets/images/warmap2.webp';
import markersData from './assets/data/markers.json';
import {battleIcon, darkIcon, deathIcon, dwarfIcon, elfIcon, encounterIcon, hobbitIcon, humanIcon, ogreIcon, elfhelIcon, customIcon, reiklanIcon, lothernIcon, naggarondIcon, orionIcon,argwylonIcon,heraldsofarielIcon
,wargroveofwoeIcon,grimgorardboyzIcon,goldtoothIcon, disciplesofthemawIcon, thedrakenhofconclaveicon, voncarsteinIcon, chaoswarriorsIcon,goldencollegeIcon,
thehuntsmarshalsexpeditionIcon, karazakarazIcon, clanangrundIcon, karazkadrinIcon, ironbrowexpeditionIcon, theancestralthrongIcon, orderofloremastersIcon,
nagarytheIcon,avelornIcon,yvresseIcon,knightsofcaledorIcon, cultofsigmarIcon,couronneIcon,bordeleauxerrantIcon,carcassonneIcon,chevaliersdelyonesseIcon, cultofpleasureIcon,haggraefIcon,harganethIcon,
theblesseddreadIcon,thethousandmawsIcon, bonerattlazIcon, thebloodyhandzIcon, crookedmoonIcon, brokenaxeIcon, hexoatlIcon,lastdefendersIcon,tlaquaIcon,cultofsotekIcon,itzaIcon,spiritofthejungleIcon,
ghostsofpahuaxIcon,worldwalkersIcon, wintertoothIcon} from "./mapIcons.js";
import imgData from './assets/data/imgData.json';
import imgFactionData from './assets/data/imgFactionData.json';


// CRS.Simple toma la forma de [y, x] en lugar de [x, y], de la misma manera que Leaflet utiliza [lat, lng] en lugar de [lng, lat].Traducido esto a unas coordenadas cartesianas, tendríamos el par [y , x]||| defino el tamaño del zoom
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 1,
    zoomAnimation: true,
    zoomControl: false
});

const bounds = [[0, 0], [5608, 8160]];//Tamaño de la imagen en px en este caso es 4524x3093 8160x5608
L.imageOverlay(mapImage, bounds).addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById("lds-ring").style.opacity = '0';
        const loader = document.getElementById("loader-screen");
        loader.style.opacity = '0';
        loader.addEventListener('transitionend', () => loader.remove());
    }, 1800)
}).addTo(map);


map.fitBounds(bounds);
map.setView([bounds[1][0] / 2, bounds[1][1] / 2], 0);

//markerClusterGroup lo uso para agrupar marcadores que estan en la misma posición y así no se superponen . También utilizamos maxClusterRadius para el radio de efecto del mismo 
const cluster = L.markerClusterGroup({
    maxClusterRadius: 20
});
map.addLayer(cluster);
//me devuelve la informacion de cada punto de interes como su nombre, descripción, fecha... "solo de los puntos de interes, de los path lo hacemos en otra"
const createInfoDialog = (data) => {
    let info = ``;
    if (data.title) {
        info += `<h1 class="title">${data.title}</h1>`;
    }
    if (data.date) {
        info += `<h2 class="date">[${data.date}]</h2>`;
    }
    if (data.description) {
        info += `<p class="description">${data.description}</p>`;
    }
    console.log(data);
    if (data.infoLink) {
        info += `<span class="info-link-container"><a class="info-link" href="${data.infoLink}" target="_blank">Learn more on Total War: Warhammer Wiki</a></span>`;
    }
    return info;
}

const getFilters = () => {
    let filters = {
        'places': [],
        'events': [],
        'quests': [],
        'spawn': [],
        'custom': [],
        'humans':[],
        'dwarfs':[],
        'highelves':[],
        'darkelves':[],
        'woodelves':[],
        'greenskins':[],
        'ogre':[],
        'vampirecounts':[],
        'lizardmen':[],
        'norsca':[],
        'chaos':[]
    };
    document.querySelectorAll('#filters fieldset').forEach(category => {
        category.querySelectorAll('input[type=checkbox]:checked').forEach(filter => {
            filters[filter.dataset.category].push(filter.dataset.filter);
        })
    });
    return filters;
}
//carga los puntos de interes
const renderMarkersFromFilters = (filters) => {
    cluster.clearLayers();
    let isRendered = false;
    let markers = [];

    for (const m of markersData) {
        isRendered = false;
        for (const category of Object.keys(filters)) {
            for (const filter of filters[category]) {
                if (m.tags[category]?.includes(filter)) {
                    isRendered = true;
                }
            }
        }
        if (isRendered) {
            markers.push(createMarker(map, m).setBouncingOptions({ //setBouncingOptions es para la animación del boto de los iconos.
                elastic: false,
                bounceHeight: 5
            }).addEventListener('mouseover', function () {
                this.bounce(1)
            }));
        }

    }
    cluster.addLayers(markers)
}
const onFilterChange = (e) => {
    const element = e.target;
    if (element.dataset.filter === 'all') {
        document.querySelectorAll(`#filters-${element.dataset.category} input[type=checkbox]:not([data-filter=all])`).forEach(el => {
            if (element.checked) {
                el.checked = true;
                el.disabled = true;
            } else {
                el.checked = false;
                el.disabled = false;
            }
        })
    }
    renderMarkersFromFilters(getFilters());
}
//creamos en los puntos de interes los icons
const createMarker = (map, data) => {
    const t = L.latLng([data.y, data.x]);
    let markerOptions = {
        title: data.title,
        alt: data.title,
    }
    if (data.tags?.events?.includes('battle')) {
        markerOptions.icon = battleIcon
    } else if (data.tags?.events?.includes('death')) {
        markerOptions.icon = deathIcon
    } else if (data.tags?.events?.includes('encounter')) {
        markerOptions.icon = encounterIcon
    } else if (data.tags?.places?.includes('dwarven')) {
        markerOptions.icon = dwarfIcon
    } else if (data.tags?.places?.includes('elven')) {
        markerOptions.icon = elfIcon
    } else if (data.tags?.places?.includes('human')) {
        markerOptions.icon = humanIcon
    } else if (data.tags?.places?.includes('dark')) {
        markerOptions.icon = darkIcon
    } else if (data.tags?.places?.includes('hobbit')) {
        markerOptions.icon = hobbitIcon
    } else if (data.tags?.places?.includes('ogre')) {
        markerOptions.icon = ogreIcon
    }else if (data.tags?.places?.includes('elfhel')) {
        markerOptions.icon = elfhelIcon
    }else if (data.tags?.spawn?.includes('caosspawn')) {
        markerOptions.icon = ogreIcon
    }else if (data.tags?.spawn?.includes('elfhelspawn')) {
        markerOptions.icon = elfhelIcon
    }else if (data.tags?.spawn?.includes('humanspawn')) {
        markerOptions.icon = humanIcon
    }else if (data.tags?.custom?.includes('custom')) {
        markerOptions.icon = customIcon
    }else if (data.tags?.humans?.includes('reiklan')) {
      markerOptions.icon = reiklanIcon
    }else if (data.tags?.humans?.includes('thehuntsmarshalsexpedition')) {
      markerOptions.icon = thehuntsmarshalsexpeditionIcon
    }else if (data.tags?.humans?.includes('goldencollege')) {
      markerOptions.icon = goldencollegeIcon
    }else if (data.tags?.humans?.includes('cultofsigmar')) {
      markerOptions.icon = cultofsigmarIcon
    }else if (data.tags?.humans?.includes('couronne')) {
      markerOptions.icon = couronneIcon
    }else if (data.tags?.humans?.includes('bordeleauxerrant')) {
      markerOptions.icon = bordeleauxerrantIcon
    }else if (data.tags?.humans?.includes('carcassonne')) {
      markerOptions.icon = carcassonneIcon
    }else if (data.tags?.humans?.includes('chevaliersdelyonesse')) {
      markerOptions.icon = chevaliersdelyonesseIcon
    }else if (data.tags?.dwarfs?.includes('karazakaraz')) {
      markerOptions.icon = karazakarazIcon
    }else if (data.tags?.dwarfs?.includes('clanangrund')) {
      markerOptions.icon = clanangrundIcon
    }else if (data.tags?.dwarfs?.includes('karazkadrin')) {
      markerOptions.icon = karazkadrinIcon
    }else if (data.tags?.dwarfs?.includes('ironbrowexpedition')) {
      markerOptions.icon = ironbrowexpeditionIcon
    }else if (data.tags?.dwarfs?.includes('theancestralthrong')) {
      markerOptions.icon = theancestralthrongIcon
    }else if (data.tags?.highelves?.includes('lothern')) {
      markerOptions.icon = lothernIcon
    }else if (data.tags?.highelves?.includes('orderofloremasters')) {
      markerOptions.icon = orderofloremastersIcon
    }else if (data.tags?.highelves?.includes('nagarythe')) {
      markerOptions.icon = nagarytheIcon
    }else if (data.tags?.highelves?.includes('avelorn')) {
      markerOptions.icon = avelornIcon
    }else if (data.tags?.highelves?.includes('yvresse')) {
      markerOptions.icon = yvresseIcon
    }else if (data.tags?.highelves?.includes('knightsofcaledor')) {
      markerOptions.icon = knightsofcaledorIcon
    }else if (data.tags?.darkelves?.includes('cultofpleasure')) {
      markerOptions.icon = cultofpleasureIcon
    }else if (data.tags?.darkelves?.includes('naggarond')) {
      markerOptions.icon = naggarondIcon
    }else if (data.tags?.darkelves?.includes('haggraef')) {
      markerOptions.icon = haggraefIcon
    }else if (data.tags?.darkelves?.includes('harganeth')) {
      markerOptions.icon = harganethIcon
    }else if (data.tags?.darkelves?.includes('theblesseddread')) {
      markerOptions.icon = theblesseddreadIcon
    }else if (data.tags?.darkelves?.includes('thethousandmaws')) {
      markerOptions.icon = thethousandmawsIcon
    }else if (data.tags?.woodelves?.includes('orion')) {
      markerOptions.icon = orionIcon
    }else if (data.tags?.woodelves?.includes('argwylon')) {
      markerOptions.icon = argwylonIcon
    }else if (data.tags?.woodelves?.includes('heraldsofariel')) {
      markerOptions.icon = heraldsofarielIcon
    }else if (data.tags?.woodelves?.includes('wargroveofwoe')) {
      markerOptions.icon = wargroveofwoeIcon
    }else if (data.tags?.greenskins?.includes('grimgorardboyz')) {
      markerOptions.icon = grimgorardboyzIcon
    }else if (data.tags?.greenskins?.includes('bonerattlaz')) {
      markerOptions.icon = bonerattlazIcon
    }else if (data.tags?.greenskins?.includes('thebloodyhandz')) {
      markerOptions.icon = thebloodyhandzIcon
    }else if (data.tags?.greenskins?.includes('crookedmoon')) {
      markerOptions.icon = crookedmoonIcon
    }else if (data.tags?.greenskins?.includes('brokenaxe')) {
      markerOptions.icon = brokenaxeIcon
    }else if (data.tags?.ogre?.includes('goldtooth')) {
      markerOptions.icon = goldtoothIcon
    }else if (data.tags?.ogre?.includes('disciplesofthemaw')) {
      markerOptions.icon = disciplesofthemawIcon
    }else if (data.tags?.vampirecounts?.includes('thedrakenhofconclave')) {
      markerOptions.icon = thedrakenhofconclaveicon
    }else if (data.tags?.vampirecounts?.includes('voncarstein')) {
      markerOptions.icon = voncarsteinIcon
    }else if (data.tags?.lizardmen?.includes('hexoatl')) {
      markerOptions.icon = hexoatlIcon
    }else if (data.tags?.lizardmen?.includes('lastdefenders')) {
      markerOptions.icon = lastdefendersIcon
    }else if (data.tags?.lizardmen?.includes('tlaqua')) {
      markerOptions.icon = tlaquaIcon
    }else if (data.tags?.lizardmen?.includes('cultofsotek')) {
      markerOptions.icon = cultofsotekIcon
    }else if (data.tags?.lizardmen?.includes('itza')) {
      markerOptions.icon = itzaIcon
    }else if (data.tags?.lizardmen?.includes('spiritofthejungle')) {
      markerOptions.icon = spiritofthejungleIcon
    }else if (data.tags?.lizardmen?.includes('ghostsofpahuax')) {
      markerOptions.icon = ghostsofpahuaxIcon
    }else if (data.tags?.norsca?.includes('worldwalkers')) {
      markerOptions.icon = worldwalkersIcon
    }else if (data.tags?.norsca?.includes('wintertooth')) {
      markerOptions.icon = wintertoothIcon
    }else if (data.tags?.chaos?.includes('chaoswarriors')) {
      markerOptions.icon = chaoswarriorsIcon
    }
    return L.marker(t, markerOptions).bindPopup(createInfoDialog(data));
}

document.querySelectorAll('#filters input[type=checkbox]').forEach(element => {
    element.addEventListener('change', onFilterChange);
});

document.getElementById('open-btn').addEventListener('click', () => {
    document.getElementById('filters-container').classList.add('active');

});

document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('filters-container').classList.remove('active');
});

renderMarkersFromFilters(getFilters());


//Al hacer click me devuelve la posición en el mapa   /////Tamaño modificado en el index.css ".leaflet-popup" es de manera global ver si es posible cambiar el tamaño solo de este.
var clickCoordinates = null;
var popup = L.popup();
function onMapClick(e) {
    clickCoordinates = e.latlng;
    popup
        .setLatLng(e.latlng)
        .setContent("x:" +  e.latlng.lng.toString() + "<br>" + "y:" +  e.latlng.lat.toString())
        .openOn(map);

    var coordinatesHtml = document.getElementById('coordinates');
    coordinatesHtml.innerHTML = "Coordenadas: " + e.latlng.lng.toString() + ", " + e.latlng.lat.toString();
}

map.on('click', onMapClick);

 
////hacer una funciona que cuente valores en el json y nos devuelva la cantidad almacenada en una variable para luego mandarla al assets
////Función para guardar localizaciones en una base de datos.


//Función para crear imageOverlay en el mapa y al hacer click en un botón en el html que cargue o elimine las imageOverlay.
  function createImages() {
    imgData.forEach(function(imgData) {
      const overlay = L.imageOverlay(imgData.url, L.latLngBounds(imgData.latLngBounds), {
        opacity: 0.8,
        errorOverlayUrl: imgData.errorOverlayUrl,
        alt: imgData.altText,
        interactive: true,
        className: 'blue-border'
      });
        overlay.on('click', function() {
            window.location.href = imgData.redirectUrl; // Redireccionar a la URL especificada en imgData.redirectUrl.
      });

      overlay.on('mouseover', function () {
        overlay.openPopup();
        overlay.setStyle({ className: 'blue-border-hover' });
      });
  
      overlay.on('mouseout', function () {
        overlay.closePopup();
        overlay.setStyle({ className: 'blue-border' });
      });
      overlay.bindPopup(
        `<div>
          <h3>${imgData.title}</h3>
          <p>${imgData.description}</p>
          <img src="${imgData.url}" alt="${imgData.altText}">
          <h5>${imgData.click}</h5>
        </div>`
      );
      imgData.overlay = overlay;
    });
  }
  function renderImages() {
    imgData.forEach(function(imgData) {
      if (imgData.isVisible) {
        map.removeLayer(imgData.overlay);
      } else {
        imgData.overlay.addTo(map);
      }
      imgData.isVisible = !imgData.isVisible;
    });
  }  
  const viewImg = document.getElementById('buttonViewImg');
  viewImg.onclick = renderImages;
  
  createImages();
  

//Función para volver al mapa de inicio.
  function moveToCoordinates(lat, lng, zoom) {
    map.setView([lat, lng], zoom);
}
//Map center
const button = document.getElementById('inicial-point');
button.addEventListener('click', function() {
        moveToCoordinates(4533,3906.5,0);
});
// //Humans
// const buttonreiklan = document.getElementById('buttonreiklan');
// buttonreiklan.addEventListener('click', function() {
//     moveToCoordinates(3914.5,4598.5,0);
// });
// const buttongoldencollege = document.getElementById('buttongoldencollege');
// buttongoldencollege.addEventListener('click', function() {
//     moveToCoordinates(3914.5,4598,0);
// });
// const buttonthehuntsmarshalsexpedition = document.getElementById('buttonthehuntsmarshalsexpedition');
// buttonthehuntsmarshalsexpedition.addEventListener('click', function() {
//     moveToCoordinates(1698.5,1267,0);
// });
// //dwarfs
// const buttonkarazakaraz = document.getElementById('buttonkarazakaraz');
// buttonkarazakaraz.addEventListener('click', function() {
//     moveToCoordinates(3940.75,4712.5,0);
// });
// const buttonclanangrund = document.getElementById('buttonclanangrund');
// buttonclanangrund.addEventListener('click', function() {
//     moveToCoordinates(3874.25,4378,0);
// });
// const buttonkarazkadrin = document.getElementById('buttonkarazkadrin');
// buttonkarazkadrin.addEventListener('click', function() {
//     moveToCoordinates(4188.75,4812.5,0);
// });
// //Elves
// const buttonlothern = document.getElementById('buttonlothern');
// buttonlothern.addEventListener('click', function() {
//     moveToCoordinates(2906.5,1946,0);
// });
// //WoodElves
// const buttonorion = document.getElementById('buttonorion');
// buttonorion.addEventListener('click', function() {
//     moveToCoordinates(3759.5,4304,0);
// });
// //GreenSkins
// const buttongreemskins = document.getElementById('buttongreemskins');
// buttongreemskins.addEventListener('click', function(){
//   moveToCoordinates(4424.5,5267,0)
// });

// //OgreKimgdon
// const buttongoldtooth = document.getElementById('buttongoldtooth');
// buttongoldtooth.addEventListener('click', function(){
//   moveToCoordinates(3639.5,5644,0)
// });
// const buttondisciplesofthemaw = document.getElementById('buttondisciplesofthemaw');
// buttondisciplesofthemaw.addEventListener('click', function(){
//   moveToCoordinates(3872.5,4239,0)
// });
// //VampireCounts
// const buttonthedrakenhofconclave = document.getElementById('buttonthedrakenhofconclave');
// buttonthedrakenhofconclave.addEventListener('click', function(){
//   moveToCoordinates(2492.75,4160.5,0)
// });
// const buttonvoncarstein = document.getElementById('buttonvoncarstein');
// buttonvoncarstein.addEventListener('click', function(){
//   moveToCoordinates(4015.5,4659,0)
// });
// //Chaos
// const buttonchaoswarriors = document.getElementById('buttonchaoswarriors');
// buttonchaoswarriors.addEventListener('click', function(){
//   moveToCoordinates(4639.5,5123,0)
// });

//Una Función para coger los valores lat,lng,zoom y pasar le a moveToCoordinates esos valores.
function handleButtonClick(lat, lng, zoom) {
  moveToCoordinates(lat, lng, zoom);
}

//Aquí guardo el nombre de los botones y sus coordenadas
const buttonCoordinates = {
  'inicial-point': [4533, 3906.5, -1],
  //Empire
  'buttonreiklan': [4452.5, 4496.25, 1],
  'buttongoldencollege': [4355.75, 4561, 1],
  'buttonthehuntsmarshalsexpedition': [2123.25, 1244.5, 1],
  'buttoncultofsigmar':[2294.75,4025,1],
  //Bretonnia
  'buttoncouronne':[4374.75,4050.5,1],
  'buttonbordeleauxerrant':[4434.25,4003.5,1],
  'buttoncarcassonne':[4016.25,4101,1],
  'buttonchevaliersdelyonesse':[3348.25,3170,1],
  //Dwarfs
  'buttonkarazakaraz': [4239.75, 4754, 1],
  'buttonclanangrund': [4094.25, 4352, 1],
  'buttonkarazkadrin': [4458.75, 4810.5, 1],
  'buttonironbrowexpedition':[2607.75, 4290, 1],
  'buttontheancestralthrong':[4411.75, 418, 1],
  //Elves
  'buttonlothern': [3228.75, 1906, 1],
  'buttonorderofloremasters':[839.75, 4190.5, 1],
  'buttonnagarythe':[3371.25,851,1],
  'buttonavelorn':[3426.25,1937.5,1],
  'buttonyvresse':[3444.75,2257.5,1],
  'buttonknightsofcaledor':[3428.75,4894.5,1],
  //DarkElves
  'buttonnaggarond':[4737.25,441.5,1],
  'buttoncultofpleasure':[3217.25,520,1],
  'buttonhaggraef':[4414.75,460,1],
  'buttonharganeth':[4572.75,953.5,1],
  'buttontheblesseddread':[4010.75,7074.5,1],
  'buttonthethousandmaws':[1132.75,1080-5,1],
  //WoodElves
  'buttonorion': [4283.25, 4330, 1],
  'buttonargwylon': [4369.75, 4289, 1],
  'buttonheraldsofariel': [3576.75, 493, 1],
  'buttonwargroveofwoe': [4463.75, 4689, 1],
  //GreenSkins
  'buttongreemskins': [4838.75, 5232, 1],
  'buttonbonerattlaz': [4356.75, 4880, 1],
  'buttonthebloodyhandz': [3633.5, 4356, 1],
  'buttoncrookedmoon': [3720.75, 4649.5, 1],
  'buttonbrokenaxe': [4356.75, 4180, 1],
  //OgreKimgdon
  'buttongoldtooth': [3639.5, 5644, 1],
  'buttondisciplesofthemaw': [3872.5, 4239, 1],
  //VampireCounts
  'buttonthedrakenhofconclave': [2492.75, 4160.5, 1],
  'buttonvoncarstein': [4348.25, 4610, 1],
  //Lizardmen
  'buttonhexoatl': [2305.25, 719, 1],
  'buttonlastdefenders': [2345.25, 4378, 1],
  'buttontlaqua': [2240.75, 4033, 1],
  'buttoncultofsotek': [651.75, 2248, 1],
  'buttonitza': [1230.75, 1763, 1],
  'buttonspiritofthejungle': [2829.25, 6915.5, 1],
  'buttonghostsofpahuax': [214.75, 3797, 1],
  //Norsca
  'buttonworldwalkers': [4832.25, 4001, 1],
  'buttonwintertooth': [4972.25, 4523.5, 1],
  //Chaos
  'buttonchaoswarriors': [5076.5, 5059, 1]
};

//Con el object.entries entro dentro de buttonCoordinates y itero sobre el para extraer los valores por separado y por último obtengo el buttonId y le doy un evento click.
Object.entries(buttonCoordinates).forEach(([buttonId, coordinates]) => {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', function() {
    handleButtonClick(...coordinates);
  });
});


//Función para mostrarlogin
  document.getElementById("loginButton").addEventListener("click", function() {
    document.getElementById("main").style.display = "none";
    document.getElementById("login").style.display = "block";
  });

  document.getElementById("backButton").addEventListener("click", function() {
    document.getElementById("login").style.display = "none";
    document.getElementById("main").style.display = "block";
  });


  //Función para las imagens de facción
  function createFactionImages() {
    imgFactionData.forEach(function(imgFactionData) {
      const overlay = L.imageOverlay(imgFactionData.url, L.latLngBounds(imgFactionData.latLngBounds), {
        opacity: 0.8,
        errorOverlayUrl: imgFactionData.errorOverlayUrl,
        alt: imgFactionData.altText,
        interactive: true,
      });
        overlay.on('click', function() {
            window.location.href = imgFactionData.redirectUrl; // Redireccionar a la URL especificada en imgData.redirectUrl.
      });

      overlay.on('mouseover', function () {
        overlay.openPopup();
      });
  
      overlay.on('mouseout', function () {
        overlay.closePopup();
      });
      overlay.bindPopup(
        `<div>
          <h3>${imgFactionData.title}</h3>
          <p>${imgFactionData.description}</p>
          <img src="${imgFactionData.url}" alt="${imgFactionData.altText}">
          <h5>${imgFactionData.click}</h5>
        </div>`
      );
      imgFactionData.overlay = overlay;
    });
  }
  function renderFactionImages() {
    imgFactionData.forEach(function(imgFactionData) {
      if (imgFactionData.isVisible) {
        map.removeLayer(imgFactionData.overlay);
      } else {
        imgFactionData.overlay.addTo(map);
      }
      imgFactionData.isVisible = !imgFactionData.isVisible;
    });
  }  
  const viewFactionImg = document.getElementById('buttonViewFactionImg');
  viewFactionImg.onclick = renderFactionImages;
createFactionImages();