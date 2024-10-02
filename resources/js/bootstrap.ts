import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// window.Pusher = Pusher;

// declare global {
//     interface Window {
//         Pusher: any;
//         Echo: Echo;
//     }
// }
// window.Pusher = Pusher;
// window.Echo = new Echo({
//     broadcaster: "pusher",
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     forceTLS: true,
// });
import Echo from "laravel-echo";
import Pusher from "pusher-js";
window.Pusher = Pusher;

//add these
declare global {
    interface Window {
        Pusher: any;
        Echo: Echo;
    }
}
// window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
});
