import mapImage from './assets/images/warmap.webp';
import markersData from './assets/data/markers.json';
import pathsData from './assets/data/paths.json';
import {battleIcon, darkIcon, deathIcon, dwarfIcon, elfIcon, encounterIcon, hobbitIcon, humanIcon, ogreIcon, elfhelIcon, customIcon} from "./mapIcons.js";


// CRS.Simple toma la forma de [y, x] en lugar de [x, y], de la misma manera que Leaflet utiliza [lat, lng] en lugar de [lng, lat].Traducido esto a unas coordenadas cartesianas, tendríamos el par [y , x]||| defino el tamaño del zoom
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 2
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


//var prueba = L.marker([2500,2500]).addTo(map).bindPopup('prueba');




//markerClusterGroup lo uso para agrupar marcadores que estan en la misma posición y así no se superponen . También utilizamos maxClusterRadius para el radio de efecto del mismo 
const cluster = L.markerClusterGroup({
    maxClusterRadius: 20
});
map.addLayer(cluster);

const pathsLayer = L.layerGroup([]);
map.addLayer(pathsLayer)
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
        'paths': [],
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
//carga los path
const renderPathsFromFilters = (filters) => {
    pathsLayer.clearLayers();
    for (const p of pathsData) {
        if (filters.paths.includes(p.id)) {
            const latLongs = p.path.map(l => [4334 - l[1], l[0]])
            const line = L.polyline(latLongs, {color: p.color, weight: 4})
            line.bindTooltip(pathTooltip(p), {
                sticky: true,
                className: "path-tooltip"
            }).addTo(pathsLayer);
        }
    }
}

//me da la info de los path nombre , distancia y fecha de inicio
const pathTooltip = (path) => (
    `
        <div class="path-name">${path.name}</div> 
        <div class="path-date">[ ${path.startDate} - <br/> ${path.endDate} ]</div>
        <div class="path-distance">${path.distance}</div> 
    `
)

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
    renderPathsFromFilters(getFilters());
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
renderPathsFromFilters(getFilters());


//Al hacer click me devuelve la posición en el mapa   /////Tamaño modificado en el index.css ".leaflet-popup" es de manera global ver si es posible cambiar el tamaño solo de este.
 var popup = L.popup();
 function onMapClick(e) {
     popup
         .setLatLng(e.latlng)
         .setContent("x:" +  e.latlng.lng.toString() + "<br>" + "y:" +  e.latlng.lat.toString()  )
         .openOn(map);
 }
 map.on('click', onMapClick);

////hacer una funciona que cuente valores en el json y nos devuelva la cantidad almacenada en una variable para luego mandarla al assets




//Función para guardar localizaciones en una base de datos.




//Overlays en el mapa
// var imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';

 
// function viewimg() {
//     if(BlackPyramid )

// }





var BlackPyramid = 'https://3.bp.blogspot.com/-c6pcdjcfx80/VKg9bmH0lgI/AAAAAAAAGZk/xBrdW4vGdcE/s1600/BlackPyramid.png';
var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
// Primero la y, luego la x   los primeros son los de arriba y los otros los de abajo
var BlackPyramidlatLngBounds = L.latLngBounds([[1803.375,2232], [1780.625,2262]]);
var BlackPyramid = L.imageOverlay(BlackPyramid, BlackPyramidlatLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
}).addTo(map);
// L.rectangle(BlackPyramidlatLngBounds).addTo(map);
// map.fitBounds(BlackPyramidlatLngBounds);
BlackPyramid.remove();



var Khemri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSldlkYu_MGLk6RZqwqyVslyCNLc1v2bqzIYA&usqp=CAU';
var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
//Primero la y, luego la x   los primeros son los de arriba y los otros los de abajo
var KhemrilatLngBounds = L.latLngBounds([[1824.625,2318], [1802.125,2343.75]]);
var Khemri = L.imageOverlay(Khemri, KhemrilatLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
}).addTo(map);
L.rectangle(KhemrilatLngBounds).addTo(map);
map.fitBounds(KhemrilatLngBounds);



var Lothern = 'https://2.bp.blogspot.com/-cQWGR84hYFo/Wfdb7UaprnI/AAAAAAAACU4/bniaIi25T2we5As9NqiXbLLsCSkq79hFgCLcBGAs/s400/lothern.jpg';
var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
//Primero la y, luego la x   los primeros son los de arriba y los otros los de abajo
var LotherntLngBounds = L.latLngBounds([[1865.625,1238.25], [1853.875,1261]]);
var Lothern = L.imageOverlay(Lothern, LotherntLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
}).addTo(map);
L.rectangle(LotherntLngBounds).addTo(map);
map.fitBounds(LotherntLngBounds);



// Para verificar si hay alguna capa en una determinada coordenada en Leaflet, puedes utilizar el método eachLayer() en el objeto map para recorrer todas las capas del mapa y verificar si alguna de ellas se superpone con la coordenada especificada. Aquí tienes un ejemplo de cómo hacerlo:

// javascript
// Copy code
// var targetLatLng = L.latLng(1800, 2250);  // Coordenada objetivo a verificar

// var hasLayer = false;

// map.eachLayer(function(layer) {
//   if (layer.getBounds && layer.getBounds().contains(targetLatLng)) {
//     hasLayer = true;
//   }
// });

// if (hasLayer) {
//   console.log('Hay una capa en la coordenada especificada.');
// } else {
//   console.log('No hay ninguna capa en la coordenada especificada.');
// }
// En este ejemplo, la variable targetLatLng representa la coordenada que deseas verificar. El código recorre todas las capas del mapa utilizando eachLayer() y verifica si alguna de ellas tiene límites (getBounds()) y si esos límites contienen la coordenada objetivo. Si se encuentra una capa en la coordenada especificada, la variable hasLayer se establece en true.

// Recuerda adaptar el código según tus necesidades y asegúrate de que map sea la referencia correcta a tu instancia del mapa Leaflet.
