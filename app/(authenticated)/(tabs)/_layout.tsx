import { Colors } from "@/constants/Colors";
import { Tabs } from "@/components/Tabs";

const Layout = () => {
  return (
    <Tabs
      ignoresTopSafeArea
      hapticFeedbackEnabled
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.dark,
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
        }}
      />
    </Tabs>
  );
};
export default Layout;
