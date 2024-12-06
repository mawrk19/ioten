const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-project-id>.firebaseio.com" // Replace with your Firestore URL
});

const db = admin.firestore();

app.post('/api/temperature-data', async (req, res) => {
    const { temperature } = req.body;
    await db.collection('temperatures').add({
        temperature,
        timestamp: new Date().toISOString()
    });
    res.send({ message: "Data added successfully!" });
});
