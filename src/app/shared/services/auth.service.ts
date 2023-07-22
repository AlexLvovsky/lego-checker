// // import { Injectable, NgZone, Optional } from '@angular/core';
// // import * as auth from 'firebase/auth';
// // import { Router } from '@angular/router';
// // import {
// //   Auth,
// //   createUserWithEmailAndPassword,
// //   signInWithEmailAndPassword,
// //   signInWithPopup,
// // } from '@angular/fire/auth';

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class AuthService {
// //   userData: any;
// //   constructor(
// //     @Optional() private auth: Auth,
// //     public router: Router
// //   ) {
// //     this.auth.onAuthStateChanged(user => {
// //       if (user) {
// //         this.userData = user;
// //       }
// //     });
// //   }

// //   signIn(email: string, password: string) {
// //     return signInWithEmailAndPassword(this.auth, email, password)
// //       .then(result => {
// //         // this.setUserData(result.user);
// //         this.auth.onAuthStateChanged(user => {
// //           if (user) {
// //             this.userData = user;
// //             console.log(user);

// //             // this.router.navigate(['homepage']);
// //           }
// //         });
// //       })
// //       .catch(error => {
// //         window.alert(error.message);
// //       });
// //   }

// //   signUp(disaplyName: string, email: string, password: string) {
// //     return createUserWithEmailAndPassword(this.auth, email, password)
// //       .then(result => {
// //         // this.setUserData(result.user);
// //       })
// //       .catch(error => {
// //         window.alert(error.message);
// //       });
// //   }

// //   googleAuth() {
// //     return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
// //       // this.router.navigate(['homepage']);
// //     });
// //   }
// //   // Auth logic to run auth providers
// //   authLogin(provider: any) {
// //     return signInWithPopup(this.auth, provider)
// //       .then(result => {
// //         // this.router.navigate(['homepage']);
// //         // this.SetUserData(result.user);
// //       })
// //       .catch(error => {
// //         window.alert(error);
// //       });
// //   }

// //   signOut() {
// //     return this.auth.signOut();
// //   }
// // }

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
// import {
//   Auth,
//   authState,
//   signInAnonymously,
//   signOut,
//   User,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from '@angular/fire/auth';
// import { EMPTY, Observable, Subscription } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { traceUntilFirst } from '@angular/fire/performance';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private readonly userDisposable: Subscription | undefined;
//   public readonly user: Observable<User | null> = EMPTY;
//   private readonly userData: Subscription | undefined;

//   showLoginButton = false;
//   showLogoutButton = false;
//   isLoggedIn = false;

//   public uid: string = '';
//   public username: string = '';

//   constructor(@Optional() private auth: Auth) {
//     if (auth) {
//       this.user = authState(this.auth);

//       this.userDisposable = authState(this.auth)
//         .pipe(
//           traceUntilFirst('auth'),
//           map(u => !!u)
//         )
//         .subscribe(isLoggedIn => {
//           this.showLoginButton = !isLoggedIn;
//           this.showLogoutButton = isLoggedIn;
//           this.isLoggedIn = isLoggedIn;
//         });

//       this.userData = authState(this.auth).subscribe(user => {
//         console.log('user state change', user);
//         if (user === undefined || user === null) {
//           this.username = '';
//           this.uid = '';
//           return;
//         }
//         this.username =
//           user.displayName === null ? user.email || '' : user.displayName;
//         this.uid = user.uid;
//       });
//     }
//   }

//   async emailSignUp(email: string, password: string): Promise<string> {
//     return await createUserWithEmailAndPassword(this.auth, email, password)
//       .then(userCredential => {
//         // Signed in
//         return '';
//         // ...
//       })
//       .catch(error => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         return errorCode;
//       });
//   }

//   async emailSignIn(email: string, password: string): Promise<string> {
//     return await signInWithEmailAndPassword(this.auth, email, password)
//       .then(userCredential => {
//         // Signed in
//         const user = userCredential.user;
//         return '';
//         // ...
//       })
//       .catch(error => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         return error.code;
//       });
//   }

//   async googleLogin() {
//     return await signInWithPopup(this.auth, new GoogleAuthProvider());
//   }

//   async loginAnonymously() {
//     return await signInAnonymously(this.auth);
//   }

//   async logout() {
//     return await signOut(this.auth);
//   }

//   ngOnDestroy(): void {
//     if (this.userDisposable) {
//       this.userDisposable.unsubscribe();
//     }

//     if (this.userData) {
//       this.userData.unsubscribe();
//     }
//   }
// }
// import { Injectable, NgZone, Optional } from '@angular/core';
// import * as auth from 'firebase/auth';
// import { Router } from '@angular/router';
// import {
//   Auth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from '@angular/fire/auth';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   userData: any;
//   constructor(
//     @Optional() private auth: Auth,
//     public router: Router
//   ) {
//     this.auth.onAuthStateChanged(user => {
//       if (user) {
//         this.userData = user;
//       }
//     });
//   }

//   signIn(email: string, password: string) {
//     return signInWithEmailAndPassword(this.auth, email, password)
//       .then(result => {
//         // this.setUserData(result.user);
//         this.auth.onAuthStateChanged(user => {
//           if (user) {
//             this.userData = user;
//             console.log(user);

//             // this.router.navigate(['homepage']);
//           }
//         });
//       })
//       .catch(error => {
//         window.alert(error.message);
//       });
//   }

//   signUp(disaplyName: string, email: string, password: string) {
//     return createUserWithEmailAndPassword(this.auth, email, password)
//       .then(result => {
//         // this.setUserData(result.user);
//       })
//       .catch(error => {
//         window.alert(error.message);
//       });
//   }

//   googleAuth() {
//     return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
//       // this.router.navigate(['homepage']);
//     });
//   }
//   // Auth logic to run auth providers
//   authLogin(provider: any) {
//     return signInWithPopup(this.auth, provider)
//       .then(result => {
//         // this.router.navigate(['homepage']);
//         // this.SetUserData(result.user);
//       })
//       .catch(error => {
//         window.alert(error);
//       });
//   }

//   signOut() {
//     return this.auth.signOut();
//   }
// }

import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username: string | null = null;
  isLoggedIn = false;
  public readonly user$ = user(this.auth);

  constructor(private auth: Auth) {}

  signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      userCredentials => {
        updateProfile(userCredentials.user, {
          displayName: `${firstName} ${lastName}`,
        });
      }
    );
  }

  emailSignIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  googleLogin(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout(): Promise<any> {
    return signOut(this.auth);
  }

  updateUserName(userName: string) {
    this.username = userName;
  }
}
