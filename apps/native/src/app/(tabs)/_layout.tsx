import { Tabs } from "expo-router";
import { Trophy, UserRound, Zap } from "@electrical-hero/core/icons";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";
import { GlassTabBar, GlassTabBarContext } from "@features/navigation/glass-tab-bar";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <GlassTabBarContext.Provider value>
      <Tabs
        tabBar={(props) => <GlassTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: colors["surface-100"] },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Train",
            tabBarIcon: ({ color, size }) => <Zap color={color} size={size} strokeWidth={2} />,
          }}
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
    </GlassTabBarContext.Provider>
  );
}
