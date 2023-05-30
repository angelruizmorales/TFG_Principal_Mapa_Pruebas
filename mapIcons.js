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
import customImg from './assets/icons/custom.svg'
//Empire
import reiklanImg from './assets/icons/imgFaction/reiklan.png'
import goldencollegeImg from './assets/icons/imgFaction/goldencollege.png'
import thehuntsmarshalsexpeditionImg from './assets/icons/imgFaction/thehuntsmarshalsexpedition.png'
import cultofsigmarImg from './assets/icons/imgFaction/cultofsigmar.png'
//Bretonnia
import couronneImg from './assets/icons/imgFaction/couronne.png'
import bordeleauxerrantImg from './assets/icons/imgFaction/bordeleauxerrant.png'
import carcassonneImg from './assets/icons/imgFaction/carcassonne.png'
import chevaliersdelyonesseImg from './assets/icons/imgFaction/chevaliersdelyonesse.png'
//Dwarfs
import karazakarazImg from './assets/icons/imgFaction/karazakaraz.png'
import clanangrundImg from './assets/icons/imgFaction/angrund.png'
import karazkadrinImg from './assets/icons/imgFaction/karazkadrin.png'
import ironbrowexpeditionImg from './assets/icons/imgFaction/ironbrowexpedition.png'
import theancestralthrongImg from  './assets/icons/imgFaction/theancestralthrong.png'
//Elves
import lothernImg from './assets/icons/imgFaction/Lothern.png'
import orderofloremastersImg from './assets/icons/imgFaction/orderofloremasters.png'
import nagarytheImg from './assets/icons/imgFaction/nagarythe.png'
import avelornImg from './assets/icons/imgFaction/avelorn.png'
import yvresseImg from './assets/icons/imgFaction/yvresse.png'
import knightsofcaledorImg from './assets/icons/imgFaction/knightsofcaledor.png'
//DarkElves
import naggarondImg from './assets/icons/imgFaction/naggarond.png'
import cultofpleasureImg from './assets/icons/imgFaction/cultofpleasure.png'
import haggraefImg from './assets/icons/imgFaction/haggraef.png'
import harganethImg from './assets/icons/imgFaction/harganeth.png'
import theblesseddreadImg from './assets/icons/imgFaction/theblesseddread.png'
import thethousandmawsImg from './assets/icons/imgFaction/thethousandmaws.png'
//WoodElves
import orionImg from './assets/icons/imgFaction/orion.png'
import argwylonImg from './assets/icons/imgFaction/argwylon.png'
import heraldsofarielImg from './assets/icons/imgFaction/heraldsofariel.png'
import wargroveofwoeImg from './assets/icons/imgFaction/wargroveofwoe.png'
//GreenSkins
import grimgorardboyzImg from './assets/icons/imgFaction/grimgorardboyz.png'
import bonerattlazImg from './assets/icons/imgFaction/bonerattlaz.png'
import thebloodyhandzImg from './assets/icons/imgFaction/The Bloody Handz.png'
import crookedmoonImg from './assets/icons/imgFaction/Crooked Moon.png'
import brokenaxeImg from './assets/icons/imgFaction/Broken Axe.png'
//OgreKimgdon
import goldtoothImg from './assets/icons/imgFaction/goldtooth.png'
import disciplesofthemawImg from './assets/icons/imgFaction/DisciplesOfTheMaw.png'
//VampireCounts
import thedrakenhofconclaveImg from './assets/icons/imgFaction/TheDrakenhofConclave.png'
import voncarsteinImg from './assets/icons/imgFaction/voncarstein.png'
//Lizardmen
import hexoatlImg from './assets/icons/imgFaction/hexoatl.png'
import lastdefendersImg from './assets/icons/imgFaction/lastdefenders.png'
import tlaquaImg from './assets/icons/imgFaction/tlaqua.png'
import cultofsotekImg from './assets/icons/imgFaction/cultofsotek.png'
import itzaImg from './assets/icons/imgFaction/itza.png'
import spiritofthejungleImg from './assets/icons/imgFaction/spiritofthejungle.png'
import ghostsofpahuaxImg from './assets/icons/imgFaction/ghostsofpahuax.png'
//Norsca
import worldwalkersImg from './assets/icons/imgFaction/worldwalkers.png'
import wintertoothImg from './assets/icons/imgFaction/wintertooth.png'
//Chaos
import chaoswarriorsImg from './assets/icons/imgFaction/chaoswarriors.png'

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
export const customIcon = L.icon({
    iconUrl: customImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//Empire
export const reiklanIcon = L.icon({
    iconUrl: reiklanImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const goldencollegeIcon = L.icon({
    iconUrl: goldencollegeImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const thehuntsmarshalsexpeditionIcon = L.icon({
    iconUrl: thehuntsmarshalsexpeditionImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const cultofsigmarIcon = L.icon({
    iconUrl: cultofsigmarImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//Bretonia
export const couronneIcon = L.icon({
    iconUrl: couronneImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const bordeleauxerrantIcon = L.icon({
    iconUrl: bordeleauxerrantImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const carcassonneIcon = L.icon({
    iconUrl: carcassonneImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const chevaliersdelyonesseIcon = L.icon({
    iconUrl: chevaliersdelyonesseImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//Dwarfs
export const karazakarazIcon = L.icon({
    iconUrl: karazakarazImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const karazkadrinIcon = L.icon({
    iconUrl: karazkadrinImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const clanangrundIcon = L.icon({
    iconUrl: clanangrundImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const ironbrowexpeditionIcon = L.icon({
    iconUrl: ironbrowexpeditionImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const theancestralthrongIcon = L.icon({
    iconUrl: theancestralthrongImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//Elves
export const lothernIcon = L.icon({
    iconUrl: lothernImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const orderofloremastersIcon = L.icon({
    iconUrl: orderofloremastersImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const nagarytheIcon = L.icon({
    iconUrl: nagarytheImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const avelornIcon = L.icon({
    iconUrl: avelornImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const yvresseIcon = L.icon({
    iconUrl: yvresseImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const knightsofcaledorIcon = L.icon({
    iconUrl: knightsofcaledorImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//Darck Elves
export const naggarondIcon = L.icon({
    iconUrl: naggarondImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const cultofpleasureIcon = L.icon({
    iconUrl: cultofpleasureImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const haggraefIcon = L.icon({
    iconUrl: haggraefImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const harganethIcon = L.icon({
    iconUrl: harganethImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const theblesseddreadIcon = L.icon({
    iconUrl: theblesseddreadImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const thethousandmawsIcon = L.icon({
    iconUrl: thethousandmawsImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//Wood Elves
export const orionIcon = L.icon({
    iconUrl: orionImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const argwylonIcon = L.icon({
    iconUrl: argwylonImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const heraldsofarielIcon = L.icon({
    iconUrl: heraldsofarielImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const wargroveofwoeIcon = L.icon({
    iconUrl: wargroveofwoeImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//GreenSkins
export const grimgorardboyzIcon = L.icon({
    iconUrl: grimgorardboyzImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const bonerattlazIcon = L.icon({
    iconUrl: bonerattlazImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const thebloodyhandzIcon = L.icon({
    iconUrl: thebloodyhandzImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const crookedmoonIcon = L.icon({
    iconUrl: crookedmoonImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const brokenaxeIcon = L.icon({
    iconUrl: brokenaxeImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//OgreKimgdon
export const goldtoothIcon = L.icon({
    iconUrl: goldtoothImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const disciplesofthemawIcon = L.icon({
    iconUrl: disciplesofthemawImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//VampireCounts
export const thedrakenhofconclaveicon = L.icon({
    iconUrl: thedrakenhofconclaveImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const voncarsteinIcon = L.icon({
    iconUrl: voncarsteinImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const chaoswarriorsIcon = L.icon({
    iconUrl: chaoswarriorsImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//Lizardmen
export const hexoatlIcon = L.icon({
    iconUrl: hexoatlImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const lastdefendersIcon = L.icon({
    iconUrl: lastdefendersImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const tlaquaIcon = L.icon({
    iconUrl: tlaquaImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const cultofsotekIcon = L.icon({
    iconUrl: cultofsotekImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const itzaIcon = L.icon({
    iconUrl: itzaImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const spiritofthejungleIcon = L.icon({
    iconUrl: spiritofthejungleImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const ghostsofpahuaxIcon = L.icon({
    iconUrl: ghostsofpahuaxImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//Norsca
export const worldwalkersIcon = L.icon({
    iconUrl: worldwalkersImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
export const wintertoothIcon = L.icon({
    iconUrl: wintertoothImg,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor
});
//Chaos