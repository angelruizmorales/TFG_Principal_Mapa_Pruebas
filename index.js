import mapImage from './assets/images/warmap.webp';
import markersData from './assets/data/markers.json';
import {battleIcon, darkIcon, deathIcon, dwarfIcon, elfIcon, encounterIcon, hobbitIcon, humanIcon, ogreIcon, elfhelIcon, customIcon} from "./mapIcons.js";
import imgData from './assets/data/imgData.json';


// CRS.Simple toma la forma de [y, x] en lugar de [x, y], de la misma manera que Leaflet utiliza [lat, lng] en lugar de [lng, lat].Traducido esto a unas coordenadas cartesianas, tendríamos el par [y , x]||| defino el tamaño del zoom
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 1,
    zoomAnimation: true,
    zoomControl: false
});

const bounds = [[0, 0], [3093, 4524]];//Tamaño de la imagen en px en este caso es 4524x3093
L.imageOverlay(mapImage, bounds).addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById("lds-ring").style.opacity = '0';
        const loader = document.getElementById("loader-screen");
        loader.style.opacity = '0';
        loader.addEventListener('transitionend', () => loader.remove());
    }, 1500)
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
  const viewimg = document.getElementById('buttonViewImg');
  viewimg.onclick = renderImages;
  
  createImages();
  

//Función para volver al mapa de inicio.
  function moveToCoordinates(lat, lng, zoom) {
    map.setView([lat, lng], zoom);
}
const button = document.getElementById('inicial-point');
button.addEventListener('click', function() {
    //Llama a la función moveToCoordinates con las coordenadas y el zoom deseados.
    moveToCoordinates(2101.5, 2250, 0);
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