import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  isSignInWithEmailLink as FBisSignInWithEmailLink,
  signInWithEmailLink as FBsignInWithEmailLink,
  signInWithCustomToken as FBsignInWithCustomToken,
  signOut as FBsignOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDxqRoRyOw4wjxaqnpArISouCd_ozH22gQ",
  authDomain: "fir-auth-app-e0044.firebaseapp.com",
  projectId: "fir-auth-app-e0044",
  storageBucket: "fir-auth-app-e0044.appspot.com",
  messagingSenderId: "389753144425",
  appId: "1:389753144425:web:be4638f130c4338ae34ef8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();


export const FirebaseActions = {
  signOutUser: () => {
    return FBsignOut(auth);
  },
  createUser: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return { data: userCredential.user, status: 1 };
      })
      .catch((error) => {
        return { data: error, status: 0 };
      });
  },
  signInUser: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return { data: userCredential.user, status: 1 };
      })
      .catch((error) => {
        return { data: error, status: 0 };
      });
  },
  signInWithCustomToken: (token: any) => {
    return FBsignInWithCustomToken(auth, token)
      .then((userCredential) => {
        return { data: userCredential.user, status: 1 };
      })
      .catch((error) => {
        return { data: error, status: 0 };
      });
  },
  sendAuthLinkToEmail: (email: string) => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "https://fir-auth-app-e0044.firebaseapp.com",
      // This must be true.
      handleCodeInApp: true,
    };
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    return sendEmailVerification(user, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        debugger;
      });
  },
  isSignInWithEmailLink: () => {
    return FBisSignInWithEmailLink(auth, window.location.href);
  },
  signInWithEmailLink: () => {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      /// email = window.prompt("Please provide your email for confirmation");
      return;
    }

    return FBsignInWithEmailLink(auth, email, window.location.href).then(
      (userCredential) => {
        window.localStorage.removeItem("emailForSignIn");
        return { data: userCredential.user, status: 1 };
      }
    );
  },
  getCurrentUser: () => {
    return auth.currentUser;
  },
};
