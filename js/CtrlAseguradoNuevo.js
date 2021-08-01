import {
  getAuth
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  checksRoles,
  guardaAsegurado,
  selectSeguros
} from "./Asegurados.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLUListElement} */
const listaRoles = document.
  querySelector("#listaRoles");

getAuth().onAuthStateChanged(
  protege, muestraError);

async function protege(Asegurado) {
  if (tieneRol(Asegurado,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
    selectSeguros(
      forma.SeguroId, "");
    checksRoles(listaRoles, []);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  const formData =
    new FormData(forma);
  const id = getString(
    formData, "cue").trim();
  await guardaAsegurado(evt,
    formData, id);
}
