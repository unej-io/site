import { getFirestore } from "firebase-admin/firestore";

import app from "./app";

const firestore = getFirestore(app);

export default firestore;
