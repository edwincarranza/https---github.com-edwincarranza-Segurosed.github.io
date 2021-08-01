import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  urlStorage
} from "../lib/storage.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

/** @type {HTMLUListElement} */
// @ts-ignore
const lista = document.
  querySelector("#lista");
const firestore = getFirestore();
const daoRol = firestore.
  collection("Rol");
const daoSeguro = firestore.
  collection("Seguro");
const daoAsegurado = firestore.
  collection("Asegurado");

getAuth().onAuthStateChanged(
  protege, muestraError);

async function protege(Asegurado) {
  if (tieneRol(Asegurado,
    ["Administrador"])) {
    consulta();
  }
}

function consulta() {
  daoAsegurado.onSnapshot(
    htmlLista, errConsulta);
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    QuerySnapshot} snap */
async function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    /** @type {
          Promise<string>[]} */
    let Asegurados = [];
    snap.forEach(doc => Asegurados.
      push(htmlFila(doc)));
    const htmlFilas =
      await Promise.all(Asegurados);
    
    html += htmlFilas.join("");
  } else {
    html += /* html */
      `<li class="vacio">
        -- Por el momento no se tiene ningun Asegurado registrado. --
      </li>`;
  }
  lista.innerHTML = html;
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    DocumentSnapshot} doc */
async function htmlFila(doc) {
  /**
   * @type {import("./tipos.js").
                      Usuario} */
  const data = doc.data();
  const img = cod(
    await urlStorage(doc.id));
  const Seguro =
    await buscaSeguro(
      data.SeguroId);
  const roles =
    await buscaRoles(data.rolIds);
  const parámetros =
    new URLSearchParams();
  parámetros.append("id", doc.id);
  return (/* html */
    `<li>
      <a class="fila conImagen"
          href=
    "Asegurado.html?${parámetros}">
        <span class="marco">
          <img src="${img}"
            alt="Falta el Avatar">
        </span>
        <span class="texto">
          <strong
              class="primario">
            ${cod(doc.id)}
          </strong>
          <span
              class="secundario">
            ${Seguro}<br>
            ${roles}
          </span>
        </span>
      </a>
    </li>`);
}

/** Recupera el html de un
 * pasatiempo en base a su id.
 * @param {string} id */
async function
  buscaSeguro(id) {
  if (id) {
    const doc =
      await daoSeguro.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {import(
          "./tipos.js").
            } */
      const data = doc.data();
      return (/* html */
        `${cod(data.nombre)}`);
    }
  }
  return " ";
}

/** Recupera el html de los
 * roles en base a sus id
 * @param {string[]} ids */
async function buscaRoles(ids) {
  let html = "";
  if (ids && ids.length > 0) {
    for (const id of ids) {
      const doc = await daoRol.
        doc(id).
        get();
      /**
       * @type {
      import("./tipos.js").Rol} */
      const data = doc.data();
      html += /* html */
        `<em>${cod(doc.id)}</em>
        <br>
        ${cod(data.descripción)}
        <br>`;
    }
    return html;
  } else {
    return "-- Sin Roles --";
  }
}

/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}
