import React, { Component } from "react";
import { View, Text } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

class Home extends Component {
  componenDidMount() {
    this.getPush();
  }

  getPush = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    alert(token);
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "accept-encoding": "gzip, deflate",
        host: "exp.host"
      },
      body: JSON.stringify({
        to: token,
        title: "New Notification",
        body: "The notification worked!",
        priority: "high",
        sound: "default",
        channelId: "default"
      })
    })
      .then(response => response.json())
      .then(responseJson => {})
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        <Text>Hello World!</Text>
      </View>
    );
  }
}

export default Home;
