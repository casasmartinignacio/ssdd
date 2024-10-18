import { connect } from "mqtt";

const options = {
  username: "usuario1",
  password: "123456"
};

const client = connect("mqtt://localhost:1883", options);

client.on("connect", () => {
  client.subscribe("presence", (err) => {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});