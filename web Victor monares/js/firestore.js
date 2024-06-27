import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDoc, onSnapshot, updateDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBVAam1hu4AX_IQ3sHMaFZTcj4xtQzFAhM",
    authDomain: "victor-monares.firebaseapp.com",
    projectId: "victor-monares",
    storageBucket: "victor-monares.appspot.com",
    messagingSenderId: "616594930592",
    appId: "1:616594930592:web:5cab47ff1a8d73d9ac42c5",
    measurementId: "G-L515D7E1F6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const save = async (proyecto) => {
    try {
        const codigoExiste = await checkCodigoExists(proyecto.codigo);
        if (codigoExiste) {
            throw new Error('El código del proyecto ya existe');
        }
        await addDoc(collection(db, 'Proyectos'), proyecto);
        return true;
    } catch (error) {
        console.error("Error saving document: ", error);
        throw error;
    }
};

export const getData = (callback) => {
    return onSnapshot(collection(db, 'Proyectos'), (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(data);
    });
};

export const remove = async (id) => {
    try {
        await deleteDoc(doc(db, 'Proyectos', id));
        return true;
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error;
    }
};


export const selectOne = async (id) => {
    try {
        const docRef = doc(db, 'Proyectos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("No se encontró el documento");
        }
    } catch (error) {
        console.error("Error fetching document: ", error);
        throw error;
    }
};

export const edit = async (id, proyecto) => {
    try {
        const docRef = doc(db, 'Proyectos', id);
        await updateDoc(docRef, proyecto);
        return true;
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
};

const checkCodigoExists = async (codigo) => {
    const q = query(collection(db, 'Proyectos'), where("codigo", "==", codigo));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};
