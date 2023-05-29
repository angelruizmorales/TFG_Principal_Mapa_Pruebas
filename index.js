import mapImage from './assets/images/warmap2.webp';
import markersData from './assets/data/markers.json';
import {battleIcon, darkIcon, deathIcon, dwarfIcon, elfIcon, encounterIcon, hobbitIcon, humanIcon, ogreIcon, elfhelIcon, customIcon, reiklanIcon, lothernIcon, naggarondIcon, orionIcon, grimgorardboyzIcon,
goldtoothIcon, disciplesofthemawIcon, thedrakenhofconclaveicon, voncarsteinIcon, chaoswarriorsIcon} from "./mapIcons.js";
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
        info += `<h1 class="title">${data.title}`;
        if (data.sindarinTitle) {
            info += ` (${data.sindarinTitle})`
        }
        info += `</h1>`;
    }
    if (data.date) {
        info += `<h2 class="date">[${data.date}]</h2>`;
    }
    if (data.description) {
        info += `<p class="description">${data.description}</p>`;
    }
    console.log(data);
    if (data.infoLink) {
        info += `<span class="info-link-container"><a class="info-link" href="${data.infoLink}" target="_blank">Learn more on Tolkien Gateway</a></span>`;
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
    }else if (data.tags?.dwarfs?.includes('karaz')) {
      markerOptions.icon = dwarfIcon
    }else if (data.tags?.highelves?.includes('lothern')) {
      markerOptions.icon = lothernIcon
    }else if (data.tags?.darkelves?.includes('naggarond')) {
      markerOptions.icon = naggarondIcon
    }else if (data.tags?.woodelves?.includes('orion')) {
      markerOptions.icon = orionIcon
    }else if (data.tags?.greenskins?.includes('grimgorardboyz')) {
      markerOptions.icon = grimgorardboyzIcon
    }else if (data.tags?.ogre?.includes('goldtooth')) {
      markerOptions.icon = goldtoothIcon
    }else if (data.tags?.ogre?.includes('disciplesofthemaw')) {
      markerOptions.icon = disciplesofthemawIcon
    }else if (data.tags?.vampirecounts?.includes('thedrakenhofconclave')) {
      markerOptions.icon = thedrakenhofconclaveicon
    }else if (data.tags?.vampirecounts?.includes('voncarstein')) {
      markerOptions.icon = voncarsteinIcon
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
    //Llama a la función moveToCoordinates con las coordenadas y el zoom deseados.
    moveToCoordinates(3789,3948,0);
});

//GreenSkins
const buttongreemskins = document.getElementById('buttongreemskins');
buttongreemskins.addEventListener('click', function(){
  moveToCoordinates(4424.5,5267,0)
});

//OgreKimgdon
const buttongoldtooth = document.getElementById('buttongoldtooth');
buttongoldtooth.addEventListener('click', function(){
  moveToCoordinates(3639.5,5644,0)
});
const buttondisciplesofthemaw = document.getElementById('buttondisciplesofthemaw');
buttondisciplesofthemaw.addEventListener('click', function(){
  moveToCoordinates(3872.5,4239,0)
});
//VampireCounts
const buttonthedrakenhofconclave = document.getElementById('buttonthedrakenhofconclave');
buttonthedrakenhofconclave.addEventListener('click', function(){
  moveToCoordinates(2492.75,4160.5,0)
});
const buttonvoncarstein = document.getElementById('buttonvoncarstein');
buttonvoncarstein.addEventListener('click', function(){
  moveToCoordinates(4015.5,4659,0)
});
//Chaos
const buttonchaoswarriors = document.getElementById('buttonchaoswarriors');
buttonchaoswarriors.addEventListener('click', function(){
  moveToCoordinates(4639.5,5123,0)
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