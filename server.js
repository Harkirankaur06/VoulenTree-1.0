// database

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/voluntree_push')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err));


// database
const Subscription = mongoose.model('Subscription', new mongoose.Schema({
  endpoint: String,
  keys: Object
}));


const express = require('express');
const webpush = require('web-push');
const cors = require('cors'); 

// const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const vapidKeys = {
  publicKey: 'BLyDnKw4BmwfiALsZBnnKR6Gh29EfnbXZ5twBLLpLPhterJMLjKl0X2-r26b1uAmwKeY9KG6Lkx1Wd7iPgj5ID8',
  privateKey: 'jgeguEFqeO1VrJz923PTh_IT0oUWtHLhKL18PrFsXzc',
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let subscriptions = [];

app.post('/subscribe', async (req, res) => {
  const sub = req.body;

  try {
    const exists = await Subscription.findOne({ endpoint: sub.endpoint });

    if (!exists) {
      await Subscription.create(sub);
      console.log("📥 New subscription saved to DB");
    }

    res.status(201).json({});
  } catch (err) {
    console.error("❌ Failed to save subscription:", err);
    res.status(500).send("DB error");
  }
});


app.post('/notify', async (req, res) => {
  const payload = JSON.stringify({ title: "VolunTree Alert", body: req.body.message });

  const allSubs = await Subscription.find();

  allSubs.forEach(sub => {
    webpush.sendNotification(sub, payload).catch(err => console.error(err));
  });

  res.send('✅ Notification sent');
});

app.listen(4000, () => console.log("Server started on http://localhost:4000"));
