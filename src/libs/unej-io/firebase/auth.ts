import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as _signOut } from "firebase/auth";

import app from "./app";

const auth = getAuth(app);

async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

async function signUp(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

async function signOut() {
  return await _signOut(auth);
}

export { signIn, signUp, signOut };
export default auth;
