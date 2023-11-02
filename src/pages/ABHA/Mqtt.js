import mqtt from "mqtt"

const Mqtt = () => {
  const client = mqtt.connect('mqtt://3.108.145.57:7889', {
    username: 'plenome',
    password: 'cloud@PT2023',
  });

  client.on('connect', function () {
    client.subscribe('abdm/response', function (err) {
      if (!err) {
        console.log('Subscribed to responseTopic');
      }
    });
  });

  client.on('message', function (topic, message) {
    console.log('Received message:', message.toString());
    // Handle the message here
  });
};

export default Mqtt
