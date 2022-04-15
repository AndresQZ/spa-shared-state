// Anything exported from this file is importable by other in-browser modules.

import { BehaviorSubject, of } from "rxjs";

export const auth$ = new BehaviorSubject({
  sessionToken: localStorage.getItem("sessionToken"),
  error: false,
  pending: false,
  message: "",
});

export const sharedData$ = new BehaviorSubject({
  host: "",
  origin: "",
  message: "",
});

export let shareData = {};

// This promise represents a request being made to some backend to have the user validated and logged in
// but is mocked here for convenience. I don't want to have to setup a backend just for this example.
const GET_LOGGED_IN = (username, password) =>
  new Promise((resolve, reject) => {
    auth$.next({
      sessionToken: null,
      error: false,
      pending: true,
      message: "",
    });
    setTimeout(() => {
      if (username === "exampleuser" && password === "examplepassword") {
        const sessionToken = "abc123def456";
        localStorage.setItem("sessionToken", sessionToken);
        resolve({
          sessionToken,
          error: false,
          pending: false,
          message: "",
        });
      } else {
        // Why resolve when invalid? Because the "backend" provided a valid response
        resolve({
          sessionToken: null,
          error: "Invalid user or password",
          pending: false,
        });
      }
    }, 2500);
  });

export function login(username, password) {
  if (!auth$.value.pending) {
    GET_LOGGED_IN(username, password).then((user: any) => {
      auth$.next(user);
    });
  }
}

export function sendData(message: string, origin: string, host: string) {
  //console.log("starting 'sendData()' method");
  //shareData = { message, origin, host};
  sharedData$.next({ message, origin, host });
}

export function getData() {
  return of(shareData);
}
