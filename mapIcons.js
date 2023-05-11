import battleImg from './assets/icons/swords.svg'
import deathImg from './assets/icons/coffin.svg'
import encounterImg from './assets/icons/eye.svg'
import hobbitImg from './assets/icons/hobbit.svg'
import dwarfImg from './assets/icons/dwarf.svg'
import elfImg from './assets/icons/elf.svg'
import humanImg from './assets/icons/castle.svg'
import darkImg from './assets/icons/evil.svg'
import ogreImg from './assets/icons/ogre.svg'
import eflhelImg from './assets/icons/elfhel.svg'
import caosImg from './assets/icons/ogre.svg'

const iconSize = [30, 30];
const iconAnchor = [15, 30];
const popupAnchor = [3, -27];

export const battleIcon = L.icon({
    iconUrl: battleImg,

    iconSize: iconSize, // Tamaño
    iconAnchor: iconAnchor, //posición del icono que depende de su marcador 
    popupAnchor: popupAnchor, // posición en la que se abre el popup dependiedo del iconAnchor
    // autoPanPaddingTopLeft: L.Point(1000, 1000)
});

export const deathIcon = L.icon({
    iconUrl: deathImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});

export const encounterIcon = L.icon({
    iconUrl: encounterImg,

    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});

export const hobbitIcon = L.icon({
    iconUrl: hobbitImg,

    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});

export const dwarfIcon = L.icon({
    iconUrl: dwarfImg,

    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});

export const elfIcon = L.icon({
    iconUrl: elfImg,

    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});

export const humanIcon = L.icon({
    iconUrl: humanImg,

    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});

export const darkIcon = L.icon({
    iconUrl: darkImg,

    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const ogreIcon = L.icon({
    iconUrl: ogreImg,

    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const elfhelIcon = L.icon({
    iconUrl: eflhelImg,

    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const caosIcon = L.icon({
    iconUrl: caosImg,

    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});