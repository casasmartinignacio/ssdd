import { connect } from "mqtt";
const client = connect("mqtt://localhost:1883");

client.on("connect", () => {
  client.subscribe("presence", (err) => {
    if (err) {
      console.error("Subscription error:", err);
    } else {
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});

client.on("error", (err) => {
  console.error("Connection error:", err);
});