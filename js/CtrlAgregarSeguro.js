import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraSeguros
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoSeguro =
  getFirestore().
    collection("Seguro");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(Asegurado) {
  if (tieneRol(Asegurado,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const matricula = getString(
        formData, "matricula").trim();  
    const nombre = getString(formData, "Nombre Completo").trim();
    const nombres = getString(formData, "Nombre Seguro").trim();
    const auto = getString(formData, "Auto").trim();
    const modeloa = getString(formData, "Modelo").trim();
    const poliza = getString(formData, "Poliza").trim();
    const telefono = getString(formData, "telefono").trim();
    const correo = getString(formData, "Correo").trim();
    const fecha = getString(formData, "fecha").trim();
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    const modelo = {
      matricula,
      nombre,
      nombres,
      auto,
      modeloa,
      poliza,
      telefono,
      correo,
      fecha 
    };
    await daoSeguro.
      add(modelo);
    muestraSeguros();
  } catch (e) {
    muestraError(e);
  }
}

