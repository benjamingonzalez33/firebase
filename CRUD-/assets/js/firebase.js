// Importaciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZZfVx1avAfl5AtVqOUbaMSNWXbkN14Oc",
  authDomain: "ev-front-end.firebaseapp.com",
  projectId: "ev-front-end",
  storageBucket: "ev-front-end.appspot.com",
  messagingSenderId: "255388327056",
  appId: "1:255388327056:web:cd0d9a8381e2662971cc15"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Nombre de la colección
const coleccion = "tbl_empleados";

// Funciones CRUD

// Crear
export const addEmpleado = (nombre, cedula, edad, sexo, telefono, cargo) =>
  addDoc(collection(db, coleccion), { nombre, cedula, edad, sexo, telefono, cargo });

// Leer todos
export const getEmpleadosCollection = () => getDocs(collection(db, coleccion));

// Leer uno
export const getEmpleadoCollection = (id) => getDoc(doc(db, coleccion, id));

// Actualizar
export const updateEmpleadoCollection = (id, newFields) =>
  updateDoc(doc(db, coleccion, id), newFields);

// Eliminar
export const deleteEmpleadoCollection = (id) => deleteDoc(doc(db, coleccion, id));