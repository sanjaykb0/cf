import { getFirestore } from "firebase/firestore"
import { getApps, initializeApp } from "firebase/app"
import { ratingScale, first, second, third, uid } from "../../store";
import cfg from "../../firebase/config";

import { addSurveyDocument } from "../../firebase/utils"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const getFirebase = () => {
    if (getApps().length === 0) {
        initializeApp(cfg);
    }
    return {
        db: getFirestore()
    }
}
export const load = async () => {

    let name, image;
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=> {
        name = user?.displayName;
        image = user?.photoURL;
    })

    return {
        name : name,
        pfp : image
    }

}