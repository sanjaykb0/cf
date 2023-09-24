import { writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';

export const isLoggedIn = writable(false);
export const uid = writable("");

export const ratingScale = writable(0);


export const first = writable('')
export const second = writable('')
export const third = writable('')
export const progressBarPercent = writable(0)

export const ratingResponse = writable(false)
