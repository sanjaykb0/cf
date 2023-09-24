import { getFirebase } from "./init";
import { getDoc, collection, orderBy, query, getDocs, addDoc, doc, runTransaction} from "firebase/firestore";

import { uid, first, second, third, ratingScale, ratingResponse } from "../store";
const getUserFormData = async () => {
    /**
     * @type {import("@firebase/firestore").DocumentData[]}
     */
    let res = [];
    const { db } = getFirebase();
    let user;
    uid.subscribe(t => user = t);

    const col = collection(db, `users/${user}/records`);
    const querySnapshot = await getDocs(query(col, orderBy("dateCreated", "desc")))

    querySnapshot.forEach(doc => {
        res.push(doc.data());
    })

    return res;
}

const incrementStreak = async () => {
    let user;
    uid.subscribe(t => user = t);

    const { db } = getFirebase();
    const userDocRef = doc(db, `users/${user}`);

    await runTransaction(db, async (transaction) => {
        try {
            const snapshot = await getDoc(userDocRef);
            const userData = snapshot.data();
            // @ts-ignore
            const newVal = ( userData.streak|| 0) + 1
            transaction.update(userDocRef, { streak : newVal });
        } catch (e) {
            console.error(e);
        }
    })

    console.log("Successfully incremented streak")
}

export const addSurveyDocument = async (/** @type {Number} */ rating, /** @type {string} */ firstAns, /** @type {string} */ secondAns, /** @type {string} */ thirdAns, /** @type {string} */ user) => {
    const { db } = getFirebase();
    try {
        console.log("\n\n Adding data \n")
        await addDoc(collection(db, `users/${user}/records`), {
            rating: rating,
            first : firstAns,
            second : secondAns,
            third: thirdAns
        }) 

        ratingScale.set(0);
        first.set("");
        second.set("")
        third.set("")
        ratingResponse.set(false)

        console.log(`Successfully added record to ${uid}`)
        return Promise.resolve()

    } catch (e){
        return Promise.reject(e);
    }

    console.log(`Successfully added record to ${uid}`)

}

