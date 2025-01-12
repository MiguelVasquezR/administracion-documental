import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "./app";

export const writeData = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), data);
    const docId = docRef.id;
    const dataWithId = { ...data, id: docId };
    await updateDoc(docRef, dataWithId);
    return 200;
  } catch (error) {
    console.error("Error al agregar el documento:", error);
    return 400;
  }
};

export const getData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

export const deleteData = async (collectionName: string, id: string) => {
  try {
    await deleteDoc(doc(firestore, collectionName, id));
    return 200;
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
    return 400;
  }
};

export const updateData = async (
  collectionName: string,
  id: string,
  data: any
) => {
  try {
    await updateDoc(doc(firestore, collectionName, id), data);
    return 200;
  } catch (error) {
    console.error("Error al actualizar el documento:", error);
    return 400;
  }
};

export const getDataById = async (collectionName: string, id: string) => {
  try {
    console.log(id);
    const docRef = doc(firestore, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("El documento no existe");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el documento por ID:", error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const usersQuery = query(
      collection(firestore, "usuarios"),
      where("correo", "==", email)
    );
    const querySnapshot = await getDocs(usersQuery);
    if (querySnapshot.empty) {
      return { status: 404, message: "Usuario no encontrado" };
    }
    const userDoc = querySnapshot.docs[0].data();
    if (userDoc.password === password) {
      return { status: 200, message: "Usuario autenticado", user: userDoc };
    } else {
      return { status: 401, message: "Contraseña incorrecta" };
    }
  } catch (error) {
    console.error("Error al autenticar el usuario:", error);
    return { status: 500, message: "Error en el servidor" };
  }
};
