/** Datos que Firebase proporciona
 * sobre un usuario autorizado.
 * @typedef {Object} User
 * @property {string} email email del usuario.
 * @property {string} displayName nombre del usuario.
 * @property {string} photoURL URL de la foto del usuario.
 */

/** Implementación de seguridad;
 * por ejemplo Google, Microsoft,
 * Twiter, etc.
 * @see https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider
 * 
 * @typedef {Object} AuthProvider
 */

/** Implementación de AuthProvider
 * que usa el sistema de seguridad
 * de Google,
 * @see https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider
 * 
 * @typedef {Object} GoogleAuthProvider
 * @property {(p:Object)=>AuthProvider} setCustomParameters asigna
 *  parámetros para el sistema
 *  OAuth de Google.
 */

/** Servicio de autenticación de
 * usuarios.
 * @see https://firebase.google.com/docs/reference/js/firebase.auth.Auth
 * 
 * @typedef {Object} Auth
 * @property {(provider:AuthProvider)=>Promise<void>} signInWithRedirect
 * @property {()=>Promise<void>} signOut
 * @property {(n:(user: User)=>void, e:(e:Error)=>void)=>void} onAuthStateChanged
 */

/**
 * @see https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot
 * 
 * @typedef {Object} DocumentSnapshot
 * @property {boolean} exists
 * @property {string} id
 * @property {()=>Object} data
 */

/**  https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference
 * @typedef {Object} DocumentReference
 * @property {()=>Promise<DocumentSnapshot>} get
 * @property {(o:Object)=>Promise<void>} set
 * @property {()=>Promise<void>} delete
 * @property {(n:(snap: DocumentSnapshot)=>void, e:(e:Error)=>void)=>void} onSnapshot 
 */

/** https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot
 * @typedef {Object} 	QuerySnapshot
 * @property {number} size 
 * @property {(f:(d:DocumentSnapshot)=>any)=>void} forEach los documentos existen
 */

/** https://firebase.google.com/docs/reference/js/firebase.firestore.Query
 * @typedef {Object} Query
 * @property {(n:(snap: QuerySnapshot)=>void, e:(e:Error)=>void)=>void} onSnapshot 
 * @property {()=>Promise<QuerySnapshot>} get
 */

/** https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference
 * @typedef {Object} CollectionReference
 * @property {(ruta:string)=>DocumentReference} doc
 * @property {(campo:string, orden?:string)=>Query} orderBy
 * @property {(n:(snap: QuerySnapshot)=>void, e:(e:Error)=>void)=>void} onSnapshot 
 * @property {(o:Object)=>Promise<void>} add
 */

/** https://firebase.google.com/docs/reference/js/firebase.firestore.Firestore
 * @typedef {Object} Firestore
 * @property {(ruta:string)=>CollectionReference} collection
 */

/** https://firebase.google.com/docs/reference/js/firebase.storage.Reference
 * @typedef {Object} 	Reference
 * @property {(datos:FormDataEntryValue)=>Promise<void>} put
 * @property {()=>Promise<string>} getDownloadURL
 * @property {()=>Promise<void>} delete
 */

/** https://firebase.google.com/docs/reference/js/firebase.storage.Storage
 * @typedef {Object} Storage
 * @property {(ruta:string)=>	Reference} ref
 */

export const __tiposFire = 0;
