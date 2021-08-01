import {
  getStorage
} from "./fabrica.js";

const storage = getStorage();

/**
 * @param {string} nombre nombre
 *  con que se sube el archivo.
 * @param {
    FormDataEntryValue}
    archivo archivo a subir. */
export async function
  subeStorage(nombre, archivo) {
  if (archivo instanceof File &&
    archivo.size > 0) {
    await storage.
      ref(nombre).
      put(archivo);
  }
}

/**
 * @param {string} nombre nombre
 *  del archivo. */
export async function
  urlStorage(nombre) {
  try {
    return await storage.
      ref(nombre).
      getDownloadURL();
  } catch (e) {
    console.log(e);
    return "";
  }
}

/**
 * @param {string} nombre nombre
 *  del archivo. */
export async function
  eliminaStorage(nombre) {
  return await storage.
    ref(nombre).delete();
}
