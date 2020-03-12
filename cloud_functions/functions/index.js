const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

//API to get all users
exports.getAllUsers = functions.runWith({ memory: '2GB', timeoutSeconds: 540 }).https.onRequest(async (request, response) => {
    return cors(request, response, async () => {
        let userDocs = await db.collection('users').get();
        let users = [];
        for (let item of userDocs.docs) {                   
            const userId={
                id:item.id
            };         
            const user={...userId,...item.data()}
            users.push(user);
        }
        response.status(200).send(users)
    });
});

// API to get addresses for given user id
exports.getGivenUserAddresses = functions.runWith({ memory: '2GB', timeoutSeconds: 540 }).https.onRequest(async (request, response) => {
    return cors(request, response, async () => {
        const userId  = request.query.userId;
        let userAdresses = await db.collection('users').doc(userId).collection('addresses').get();
        let addresses = [];
        for (let item of userAdresses.docs) {
            addresses.push(item.data());
        }
        response.status(200).send(addresses)
    });
});