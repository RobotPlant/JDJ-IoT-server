const express = require("express");
const cors = require("cors");
const mqtt = require("mqtt");

const app = express();
app.use(express.json());

app.use(cors());

app.post("/", async (req, res) => {
  try {
    const body = req.body;

    console.log(body);

    const client = mqtt.connect("mqtt://10.0.0.103:1883");

    client.on("connect", () => {
      client.publish(
        "device/aea93e78-8e5b-4e76-9224-459593499ab9/state",
        body.command || "OFF"
      );
      client.end();
      res.status(200).send();
    });
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
});

app.listen(process.env.port || 8080, () => console.log("Servidor ON"));
