import { RootState } from "@/store/store";
import { Horse } from "@/types/types";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function TabTwoScreen() {
  const results = useSelector((state: RootState) => state.winners.data);

  return (
    <SafeAreaView>
      {results.length === 0 ? (
        <Text>Нет данных</Text>
      ) : (
        <FlatList
          data={results}
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Result>{item}</Result>}
        />
      )}
    </SafeAreaView>
  );
}

function Result({ children }: { children: Horse }) {
  return (
    <View style={styles.resultContainter}>
      <Text style={styles.resultText}>Победитель: {children.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainter: {
    flexDirection: "row",
    width: 300,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#D47A21",
    marginBottom: 20,
  },
  resultText: {
    fontFamily: "Rubik",
    fontWeight: 700,
    fontSize: 24,
  },
});
