import {
  getFirestore
} from "../lib/fabrica.js";
import {
  subeStorage
} from "../lib/storage.js";
import {
  cod, getForánea, muestraError
} from "../lib/util.js";
import {
  muestraAsegurados,
  muestraUsuarios
} from "./navegacion.js";

const SIN_SEGUROS = /* html */
  `<option value="">
    -- Sin Seguros --
  </option>`;

const firestore = getFirestore();
const daoRol = firestore.
  collection("Rol");
const daoSeguro = firestore.
  collection("Seguro");
const daoAsegurado = firestore.
  collection("Asegurado");

/**
 * @param {
    HTMLSelectElement} select
 * @param {string} valor */
export function
  selectSeguros(select,
    valor) {
  valor = valor || "";
  daoAlumno.
    orderBy("nombre").
    onSnapshot(
      snap => {
        let html = SIN_SEGUROS;
        snap.forEach(doc =>
          html += htmlSeguro(
            doc, valor));
        select.innerHTML = html;
      },
      e => {
        muestraError(e);
        selectSeguros(
          select, valor);
      }
    );
}

/**
 * @param {
  import("../lib/tiposFire.js").
  DocumentSnapshot} doc
 * @param {string} valor */
function
  htmlSeguro(doc, valor) {
  const selected =
    doc.id === valor ?
      "selected" : "";
  /**
   * @type {import("./tipos.js").
                  } */
  const data = doc.data();
  return (/* html */
    `<option
        value="${cod(doc.id)}"
        ${selected}>
      ${cod(data.nombre)}
    </option>`);
}

/**
 * @param {HTMLElement} elemento
 * @param {string[]} valor */
export function
  checksRoles(elemento, valor) {
  const set =
    new Set(valor || []);
  daoRol.onSnapshot(
    snap => {
      let html = "";
      if (snap.size > 0) {
        snap.forEach(doc =>
          html +=
          checkRol(doc, set));
      } else {
        html += /* html */
          `<li class="vacio">
              -- No hay roles
              registrados. --
            </li>`;
      }
      elemento.innerHTML = html;
    },
    e => {
      muestraError(e);
      checksRoles(
        elemento, valor);
    }
  );
}

/**
 * @param {
    import("../lib/tiposFire.js").
    DocumentSnapshot} doc
 * @param {Set<string>} set */
export function
  checkRol(doc, set) {
  /**
   * @type {
      import("./tipos.js").Rol} */
  const data = doc.data();
  const checked =
    set.has(doc.id) ?
      "checked" : "";
  return (/* html */
    `<li>
      <label class="fila">
        <input type="checkbox"
            name="rolIds"
            value="${cod(doc.id)}"
          ${checked}>
        <span class="texto">
          <strong
              class="primario">
            ${cod(doc.id)}
          </strong>
          <span
              class="secundario">
          ${cod(data.descripción)}
          </span>
        </span>
      </label>
    </li>`);
}

/**
 * @param {Event} evt
 * @param {FormData} formData
 * @param {string} id  */
export async function
  guardaUsuario(evt, formData,
    id) {
  try {
    evt.preventDefault();
    const SeguroId =
      getForánea(formData,
        "SeguroId");
    const rolIds =
      formData.getAll("rolIds");
    await daoAsegurado.
      doc(id).
      set({
        SeguroId,
        rolIds
      });
    const avatar =
      formData.get("avatar");
    await subeStorage(id, avatar);
    muestraAsegurados();
  } catch (e) {
    muestraError(e);
  }
}
