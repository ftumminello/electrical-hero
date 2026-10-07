import { Tabs } from "expo-router";
import { Trophy, UserRound, Zap } from "@electrical-hero/core/icons";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.steel,
        tabBarActiveBackgroundColor: colors["surface-300"],
        tabBarStyle: { backgroundColor: colors["surface-200"], borderTopColor: colors.border },
        tabBarLabelStyle: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
        sceneStyle: { backgroundColor: colors["surface-100"] },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Train", tabBarIcon: ({ color, size }) => <Zap color={color} size={size} strokeWidth={2} /> }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}
