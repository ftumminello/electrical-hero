import { Pressable, View } from "react-native";
import type { AccountSummary } from "@electrical-hero/shared";
import { cn } from "@electrical-hero/design-system/cn";
import { Building2, CircleCheck } from "@electrical-hero/core/icons";
import { formatCityState } from "@electrical-hero/core/lib/training";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";
import { Text } from "@electrical-hero/core/shared/text";

type SitePickerProps = {
  accounts: AccountSummary[];
  selectedId: string;
  onSelect: (accountId: string) => void;
};

/** The company's customer sites; the chosen one decides which problems come up. */
export function SitePicker({ accounts, selectedId, onSelect }: SitePickerProps) {
  const { colors } = useTheme();

  return (
    <View accessibilityRole="radiogroup" accessibilityLabel="Job site" className="gap-2">
      {accounts.map((account) => {
        const selected = account.id === selectedId;
        const Icon = selected ? CircleCheck : Building2;
        return (
          <Pressable
            key={account.id}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            onPress={() => onSelect(account.id)}
            className={cn(
              "flex-row items-start gap-3 rounded border bg-surface-200 p-4 active:bg-surface-300",
              selected ? "border-ink" : "border-border",
            )}
          >
            <Icon size={20} strokeWidth={2} color={selected ? colors.ground : colors.steel} style={{ marginTop: 2 }} />
            <View className="flex-1 gap-1">
              <Text className="font-semibold">{account.name}</Text>
              <Text variant="small" className="text-ink-muted">
                {formatCityState(account.address)} · {account.buildingType}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
