/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
// import { defineSecret } from 'firebase-functions/params';
// import * as functions from 'firebase-functions';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// const rebrickableKey = defineSecret('REBRICKABLE_KEY');
export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export const getRebrickableKey = onRequest(
  { secrets: ['REBRICKABLE_KEY'] },
  (request, response) => {
    logger.log(process.env.REBRICKABLE_KEY);
    response.json({ key: process.env.REBRICKABLE_KEY });
    // response.send(JSON.stringify({ key: process.env.REBRICKABLE_KEY }));
  },
);
