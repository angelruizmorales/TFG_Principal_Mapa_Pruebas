import mapImage from './assets/images/warmap2.webp';
import markersData from './assets/data/markers.json';
import {reiklanIcon, lothernIcon, naggarondIcon, orionIcon,argwylonIcon,heraldsofarielIcon
,wargroveofwoeIcon,grimgorardboyzIcon,goldtoothIcon, disciplesofthemawIcon, thedrakenhofconclaveicon, voncarsteinIcon,caravanofbluerosesIcon,thebarrowlegionIcon,chaoswarriorsIcon,
goldencollegeIcon,thehuntsmarshalsexpeditionIcon, karazakarazIcon, clanangrundIcon, karazkadrinIcon, ironbrowexpeditionIcon, theancestralthrongIcon, orderofloremastersIcon,
nagarytheIcon,avelornIcon,yvresseIcon,knightsofcaledorIcon, cultofsigmarIcon,couronneIcon,bordeleauxerrantIcon,carcassonneIcon,chevaliersdelyonesseIcon, cultofpleasureIcon,haggraefIcon,harganethIcon,
theblesseddreadIcon,thethousandmawsIcon, bonerattlazIcon, thebloodyhandzIcon, crookedmoonIcon, brokenaxeIcon, hexoatlIcon,lastdefendersIcon,tlaquaIcon,cultofsotekIcon,itzaIcon,spiritofthejungleIcon,
ghostsofpahuaxIcon,worldwalkersIcon, wintertoothIcon,clanmorsIcon,clanpestilensIcon,clanrictusIcon,claneshinIcon,clanskryreIcon,clanmoulderIcon,khemriIcon,courtoflybarasIcon,exilesofnehekIcon,
followersofnagashIcon,thedrownedIcon,thedreadfleetIcon,piratesofsartosaIcon,theawakenedIcon,warherdoftheoneeyeIcon,harbingerofdisasterIcon,warherdoftheshadowgaveIcon,
slaughterhorntribeIcon,thenorthernprovincesIcon,thewesternprovincesIcon,legionofchaosIcon,exilesofkhorneIcon,poxmakersofnurgleIcon,seducersofslaaneshIcon,oraclesoftzeentchIcon,shadowlegionIcon,
theicecourtIcon,thegreatorthodoxyIcon,ursunrevivalistsIcon,disciplesofhashutIcon,thelegionofazgorhIcon,thewarhostofzharrIcon} from "./mapIcons.js";
import imgData from './assets/data/imgData.json';
import imgQuestData from './assets/data/imgQuestData.json';
import ruin from './assets/data/ruins.json';


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
    }, 2800)
}).addTo(map);


map.fitBounds(bounds);
map.setView([bounds[1][0] / 2, bounds[1][1] / 2], 0);

//markerClusterGroup lo uso para agrupar marcadores que estan en la misma posición y así no se superponen . También utilizamos maxClusterRadius para el radio de efecto del mismo 
const cluster = L.markerClusterGroup({
    maxClusterRadius: 20
});
map.addLayer(cluster);

//me devuelve la informacion de cada punto de interes como su nombre, descripción, fecha...
const createInfoDialog = (data) => {
    let info = ``;
    if (data.title) {
        info += `<h1 class="title">${data.title}</h1>`;
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
        'events': [],
        'humans':[],
        'dwarfs':[],
        'highelves':[],
        'darkelves':[],
        'woodelves':[],
        'greenskins':[],
        'ogre':[],
        'vampirecounts':[],
        'lizardmen':[],
        'grandcathay':[],
        'norsca':[],
        'skaven':[],
        'tombkings':[],
        'vampirecoast':[],
        'beastmen':[],
        'chaos':[],
        'chaosdwarfs':[]
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
    if (data.tags?.humans?.includes('reiklan')) {
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
    }else if (data.tags?.humans?.includes('theicecourt')) {
      markerOptions.icon = theicecourtIcon
    }else if (data.tags?.humans?.includes('thegreatorthodoxy')) {
      markerOptions.icon = thegreatorthodoxyIcon
    }else if (data.tags?.humans?.includes('ursunrevivalists')) {
      markerOptions.icon = ursunrevivalistsIcon
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
    }else if (data.tags?.vampirecounts?.includes('caravanofblueroses')) {
      markerOptions.icon = caravanofbluerosesIcon
    }else if (data.tags?.vampirecounts?.includes('thebarrowlegion')) {
      markerOptions.icon = thebarrowlegionIcon
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
    }else if (data.tags?.grandcathay?.includes('thenorthernprovinces')) {
      markerOptions.icon = thenorthernprovincesIcon
    }else if (data.tags?.grandcathay?.includes('thewesternprovinces')) {
      markerOptions.icon = thewesternprovincesIcon
    }else if (data.tags?.norsca?.includes('worldwalkers')) {
      markerOptions.icon = worldwalkersIcon
    }else if (data.tags?.norsca?.includes('wintertooth')) {
      markerOptions.icon = wintertoothIcon
    }else if (data.tags?.skaven?.includes('clanmors')) {
      markerOptions.icon = clanmorsIcon
    }else if (data.tags?.skaven?.includes('clanpestilens')) {
      markerOptions.icon = clanpestilensIcon
    }else if (data.tags?.skaven?.includes('clanrictus')) {
      markerOptions.icon = clanrictusIcon
    }else if (data.tags?.skaven?.includes('claneshin')) {
      markerOptions.icon = claneshinIcon
    }else if (data.tags?.skaven?.includes('clanskryre')) {
      markerOptions.icon = clanskryreIcon
    }else if (data.tags?.skaven?.includes('clanmoulder')) {
      markerOptions.icon = clanmoulderIcon
    }else if (data.tags?.tombkings?.includes('khemri')) {
      markerOptions.icon = khemriIcon
    }else if (data.tags?.tombkings?.includes('courtoflybaras')) {
      markerOptions.icon = courtoflybarasIcon
    }else if (data.tags?.tombkings?.includes('exilesofnehek')) {
      markerOptions.icon = exilesofnehekIcon
    }else if (data.tags?.tombkings?.includes('followersofnagash')) {
      markerOptions.icon = followersofnagashIcon
    }else if (data.tags?.vampirecoast?.includes('theawakened')) {
      markerOptions.icon = theawakenedIcon
    }else if (data.tags?.vampirecoast?.includes('piratesofsartosa')) {
      markerOptions.icon = piratesofsartosaIcon
    }else if (data.tags?.vampirecoast?.includes('thedreadfleet')) {
      markerOptions.icon = thedreadfleetIcon
    }else if (data.tags?.vampirecoast?.includes('thedrowned')) {
      markerOptions.icon = thedrownedIcon
    }else if (data.tags?.beastmen?.includes('warherdoftheoneeye')) {
      markerOptions.icon = warherdoftheoneeyeIcon
    }else if (data.tags?.beastmen?.includes('harbingerofdisaster')) {
      markerOptions.icon = harbingerofdisasterIcon
    }else if (data.tags?.beastmen?.includes('warherdoftheshadowgave')) {
      markerOptions.icon = warherdoftheshadowgaveIcon
    }else if (data.tags?.beastmen?.includes('slaughterhorntribe')) {
      markerOptions.icon = slaughterhorntribeIcon
    }else if (data.tags?.chaos?.includes('chaoswarriors')) {
      markerOptions.icon = chaoswarriorsIcon
    }else if (data.tags?.chaos?.includes('legionofchaos')) {
      markerOptions.icon = legionofchaosIcon
    }else if (data.tags?.chaos?.includes('exilesofkhorne')) {
      markerOptions.icon = exilesofkhorneIcon
    }else if (data.tags?.chaos?.includes('poxmakersofnurgle')) {
      markerOptions.icon = poxmakersofnurgleIcon
    }    else if (data.tags?.chaos?.includes('seducersofslaanesh')) {
      markerOptions.icon = seducersofslaaneshIcon
    }    else if (data.tags?.chaos?.includes('oraclesoftzeentch')) {
      markerOptions.icon = oraclesoftzeentchIcon
    }    else if (data.tags?.chaos?.includes('shadowlegion')) {
      markerOptions.icon = shadowlegionIcon
    }else if (data.tags?.chaosdwarfs?.includes('disciplesofhashut')) {
      markerOptions.icon = disciplesofhashutIcon
    }else if (data.tags?.chaosdwarfs?.includes('thelegionofazgorh')) {
      markerOptions.icon = thelegionofazgorhIcon
    }else if (data.tags?.chaosdwarfs?.includes('thewarhostofzharr')) {
      markerOptions.icon = thewarhostofzharrIcon
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


//Al hacer click me devuelve la posición en el mapa .Tamaño modificado en el index.css ".leaflet-popup" es de manera global ver si es posible cambiar el tamaño solo de este.
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


//Función para crear imageOverlay en el mapa y al hacer click en un botón en el html que cargue o elimine las imageOverlay.
const viewImg = document.getElementById('buttonViewImg');
viewImg.addEventListener('click', renderImages);
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
  createImages();
  

//Función para volver al mapa de inicio.
  function moveToCoordinates(lat, lng, zoom) {
    map.setView([lat, lng], zoom);
}
//Una Función para coger los valores lat,lng,zoom y pasar le a moveToCoordinates esos valores.
function handleButtonClick(lat, lng, zoom) {
  moveToCoordinates(lat, lng, zoom);
}
//Aquí guardo el nombre de los botones y sus coordenadas
const buttonCoordinates = {
  'inicial-point': [3412,3873.5,0],
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
  //Kislev
  'buttontheicecourt':[4622.25,4786,1],
  'buttonthegreatorthodoxy':[4790.25,4828,1],
  'buttonursunrevivalists':[5196.25,4731,1],
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
  'buttoncaravanofblueroses': [3036.25, 5833.5, 1],
  'buttonthebarrowlegion': [4459.25, 4178.5, 1],
  //Lizardmen
  'buttonhexoatl': [2305.25, 719, 1],
  'buttonlastdefenders': [2345.25, 4378, 1],
  'buttontlaqua': [2240.75, 4033, 1],
  'buttoncultofsotek': [651.75, 2248, 1],
  'buttonitza': [1230.75, 1763, 1],
  'buttonspiritofthejungle': [2829.25, 6915.5, 1],
  'buttonghostsofpahuax': [214.75, 3797, 1],
  //GranCathay
  'buttonthenorthernprovinces': [3973.75, 6336, 1],
  'buttonthewesternprovinces': [2941.75, 6326, 1],
  //Norsca
  'buttonworldwalkers': [4832.25, 4001, 1],
  'buttonwintertooth': [4972.25, 4523.5, 1],
  //Skaven
  'buttonclanmors': [3120.25, 4523.5, 1],
  'buttonclanpestilens': [795.25, 1829.5, 1],
  'buttonclanrictus': [3976.25, 4880.5, 1],
  'buttonclaneshin': [3216.25, 6147.5, 1],
  'buttonclanskryre': [4122.25, 4054.5, 1],
  'buttonclanmoulder': [4969.25, 4777.5, 1],
  //tombkings
  'buttonkhemri': [3080.25, 4194.5, 1],
  'buttoncourtoflybaras': [2830.25, 4679.5, 1],
  'buttonexilesofnehek': [3540.25, 273.5, 1],
  'buttonfollowersofnagash': [2872.25, 2993.5, 1],
  //VampireCoast
  'buttontheawakened': [1646.25, 2081.5, 1],
  'buttonpiratesofsartosa': [3853.25, 4067.5, 1],
  'buttonthedreadfleet': [2653.25, 1967.5, 1],
  'buttonthedrowned': [4368.25, 1612.5, 1],
  //beastmen
  'buttonwarherdoftheoneeye': [4608.25, 4462.5, 1],
  'buttonharbingerofdisaster': [3332.25, 4283.5, 1],
  'buttonwarherdoftheshadowgave': [4068.25, 3928.5, 1],
  'buttonslaughterhorntribe': [3666.25, 617.5, 1],
  //ChaosDwarfs
  'buttondisciplesofhashut': [4931.25, 5042.5, 1],
  'buttonthelegionofazgorh': [3501.25, 5354.5, 1],
  'buttonthewarhostofzharr': [4607.25, 5206.5, 1],
  //Chaos
  'buttonchaoswarriors': [5076.5, 5059, 1],
  'buttonlegionofchaos': [5255.5, 4280, 1],
  'buttonexilesofkhorne': [3203.5, 4394, 1],
  'buttonpoxmakersofnurgle': [3074.5, 5420, 1],
  'buttonseducersofslaanesh': [3945.5, 2007, 1],
  'buttonoraclesoftzeentch': [187.5, 4120, 1],
  'buttonshadowlegion': [4518.5, 3587, 1],
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


 // Función para crear las imágenes de las quests
  const viewquestImg = document.getElementById('buttonViewquestImg');
  viewquestImg.addEventListener('click', renderquestImages);
  function createquestImages() {
    imgQuestData.forEach(function(imgQuestData) {
          const overlay = L.imageOverlay(imgQuestData.url, L.latLngBounds(imgQuestData.latLngBounds), {
              opacity: 0.8,
              errorOverlayUrl: imgQuestData.errorOverlayUrl,
              alt: imgQuestData.altText,
              interactive: true,
              className: 'blue-border'
          });
          overlay.on('click', function() {
              window.location.href = imgQuestData.redirectUrl;//Redireccionar al hacer click
          });
  
          overlay.on('mouseover', function () {
              overlay.openPopup();
          });
  
          overlay.on('mouseout', function () {
              overlay.closePopup();
          });
          overlay.bindPopup(
              `<div>
                  <h3>${imgQuestData.title}</h3>
                  <p>${imgQuestData.description}</p>
                  <h5>${imgQuestData.click}</h5>
              </div>`
          );
          imgQuestData.overlay = overlay;
      });
  }
  // Función para renderizar las imágenes de las quests
  function renderquestImages() {
    imgQuestData.forEach(function(imgQuestData) {
          if (imgQuestData.isVisible) {
              map.removeLayer(imgQuestData.overlay);
          } else {
            imgQuestData.overlay.addTo(map);
          }
          imgQuestData.isVisible = !imgQuestData.isVisible;
      });
  }
  // Llamar a la función para crear las imágenes de las quests
  createquestImages();




  // Función para crear las imágenes de las ruinas
  const viewruinImg = document.getElementById('buttonViewruinImg');
  viewruinImg.addEventListener('click', renderruinImages);
  function createruinImages() {
    ruin.forEach(function(ruin) {
          const overlay = L.imageOverlay(ruin.url, L.latLngBounds(ruin.latLngBounds), {
              opacity: 0.8,
              errorOverlayUrl: ruin.errorOverlayUrl,
              alt: ruin.altText,
              interactive: true,
              className: 'blue-border'
          });
          overlay.on('click', function() {
              window.location.href = ruin.redirectUrl;//Redireccionar al hacer click
          });
  
          overlay.on('mouseover', function () {
              overlay.openPopup();
          });
  
          overlay.on('mouseout', function () {
              overlay.closePopup();
          });
          overlay.bindPopup(
              `<div>
                  <h3>${ruin.title}</h3>
                  <p>${ruin.description}</p>
                  <h5>${ruin.click}</h5>
              </div>`
          );
          ruin.overlay = overlay;
      });
  }
  // Función para renderizar las imágenes de las ruinas
  function renderruinImages() {
    ruin.forEach(function(ruin) {
          if (ruin.isVisible) {
              map.removeLayer(ruin.overlay);
          } else {
            ruin.overlay.addTo(map);
          }
          ruin.isVisible = !ruin.isVisible;
      });
  }
  // Llamar a la función para crear las imágenes de las ruinas
  createruinImages();