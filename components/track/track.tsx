import { Horse } from "@/types/types";
import { Image, ImageBackground } from "expo-image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

const horseGif = require("./../../assets/animations/horse.gif");
const horsePng = require("./../../assets/images/horse.png");
const trackPng = require("./../../assets/images/track-bg.png");

function Track({
  horseID,
  horses,
  setHorses,
}: {
  horseID: number;
  horses: Horse[];
  setHorses: Dispatch<React.SetStateAction<Horse[]>>;
}) {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (horses[horseID].isFinished) return;

    translateX.setValue(0);

    Animated.timing(translateX, {
      toValue: 170,
      duration: horses[horseID].value * 100,
      useNativeDriver: true,
      easing: Easing.bezier(Math.random(), 0.05, 1, 1),
    }).start(() => {
      setHorses((horses) => {
        return horses.map((horse, index) => {
          if (index === horseID) {
            return {
              ...horse,
              isFinished: true,
            };
          }
          return horse;
        });
      });
    });
  }, [horses[horseID].value]);

  return (
    <ImageBackground source={trackPng} style={[styles.track]}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 30,
          height: "100%",
          backgroundColor: horses[horseID].color,
        }}
      />
      {/* Значение лошади (для дебага) */}
      {/* <Text>{horses[horseID].value}</Text> */}
      <Animated.View
        style={[
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <Image
          style={[styles.horse]}
          source={horses[horseID].isFinished ? horsePng : horseGif}
          contentFit="contain"
        />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  track: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundImage: trackPng,
    width: "100%",
    height: "auto",
    minHeight: 100,
  },
  horse: {
    width: 320,
    height: 100,
  },
});

export default Track;
