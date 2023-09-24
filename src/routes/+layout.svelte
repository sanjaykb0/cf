<script>
    import Nav from "../components/Nav.svelte";
    import "../app.css";
    import { getApp, initializeApp } from "firebase/app";
    import { getAuth, onAuthStateChanged } from "firebase/auth";

    import { isLoggedIn, uid } from "../store";

    import { onMount } from "svelte";
    import cfg from "../firebase/config"
    import { goto } from "$app/navigation";

    const app = initializeApp(cfg)
    const auth = getAuth(app);

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                uid.set(user.uid)
                isLoggedIn.set(true)
            } else {
                isLoggedIn.set(false)
                goto('/')
            }
        })
    })

</script>

<Nav />
<slot />