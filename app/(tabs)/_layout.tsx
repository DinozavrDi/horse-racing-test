import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Скачки",
          tabBarIcon: () => {
            return <Ionicons name="flag" size={24} color="#D47A21" />;
          },
          tabBarActiveTintColor: "#D47A21",
          tabBarInactiveTintColor: "black",
          tabBarActiveBackgroundColor: "white",
          tabBarInactiveBackgroundColor: "#dddddd",
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: "Результаты",
          tabBarIcon: () => {
            return <Ionicons name="list" size={24} color="#D47A21" />;
          },
          tabBarActiveTintColor: "#D47A21",
          tabBarInactiveTintColor: "black",
          tabBarActiveBackgroundColor: "white",
          tabBarInactiveBackgroundColor: "#dddddd",
        }}
      />
    </Tabs>
  );
}
