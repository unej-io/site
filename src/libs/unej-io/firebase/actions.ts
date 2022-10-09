import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebase$signOut } from "firebase/auth";

import { auth } from "./const";

async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

async function signUp(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

async function signOut() {
  return await firebase$signOut(auth);
}

export { signIn, signUp, signOut };
