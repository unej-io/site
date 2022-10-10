import { getAuth } from "firebase-admin/auth";

import app from "./app";

const auth = getAuth(app);

export default auth;
