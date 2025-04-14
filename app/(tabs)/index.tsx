import { Pressable, StyleSheet, Text, View } from "react-native";

import { useEffect, useState } from "react";
import Track from "@/components/track/track";
import { Horse } from "@/types/types";
import { useDispatch } from "react-redux";
import { addWinner } from "@/store/slices/winners-slice";

export default function HomeScreen() {
  const [horses, setHorses] = useState<Horse[]>([
    {
      value: 0,
      color: "red",
      name: "красная",
      isFinished: false,
    },
    {
      value: 0,
      color: "blue",
      name: "синяя",
      isFinished: false,
    },
    {
      value: 0,
      color: "green",
      name: "зелёная",
      isFinished: false,
    },
    {
      value: 0,
      color: "yellow",
      name: "жёлтая",
      isFinished: false,
    },
    {
      value: 0,
      color: "pink",
      name: "розовая",
      isFinished: false,
    },
  ]);

  const [isResultVisiable, setIsResultVisible] = useState(false);
  const [isFirstStart, setIsFirstStart] = useState(true);
  const [winner, setWinner] = useState<Horse>();

  const dispatch = useDispatch();

  const onStartPlayHandler = () => {
    const newHorses = horses.map((horse) => {
      return {
        ...horse,
        isFinished: false,
        value: generateNewHorseValue(),
      };
    });

    console.log(newHorses);
    setWinner(findWinner(newHorses));
    setIsFirstStart(false);
    setHorses(newHorses);
    setIsResultVisible(false);
  };

  const onFinishHandler = async () => {
    setIsResultVisible(true);

    dispatch(addWinner(winner!));
  };

  useEffect(() => {
    if (horses.every((horse) => horse.isFinished && !isFirstStart)) {
      onFinishHandler();
    }
  }, [horses]);

  return (
    <View style={styles.container}>
      <Track horseID={0} setHorses={setHorses} horses={horses} />
      <Track horseID={1} setHorses={setHorses} horses={horses} />
      <Track horseID={2} setHorses={setHorses} horses={horses} />
      <Track horseID={3} setHorses={setHorses} horses={horses} />
      <Track horseID={4} setHorses={setHorses} horses={horses} />
      <Text
        style={[
          styles.winnerText,
          { display: isResultVisiable ? "flex" : "none" },
        ]}
      >
        Победила {winner?.name} лошадь{" "}
      </Text>
      <Pressable
        onPress={onStartPlayHandler}
        style={[
          styles.startButton,
          { display: isResultVisiable || isFirstStart ? "flex" : "none" },
        ]}
      >
        <Text style={styles.startButtonText}>
          {isFirstStart ? "Начать" : "Рестарт"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    gap: 10,
  },
  startButton: {
    width: 140,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#D47A21",
    fontFamily: "SpaceMono",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  startButtonText: {
    color: "white",
    fontSize: 24,
    fontFamily: "Rubik",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
  },
  resultsModal: {
    padding: 20,
    width: "100%",
    height: "90%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  winnerText: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "Rubik",
    fontWeight: "bold",
    color: "white",
  },
});

function generateNewHorseValue(): number {
  return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
}

function findWinner(horses: Horse[]): Horse {
  let winner = horses[0];
  for (let i = 1; i < horses.length; i++) {
    if (horses[i].value < winner.value) {
      winner = horses[i];
    }
  }
  return winner;
}
