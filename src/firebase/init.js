import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import cfg from "./config"

export function getFirebase() {
    if (getApps().length === 0) {
        initializeApp(cfg);
    }

    return {
        db: getFirestore()
    }
}