import { useState } from "react";
import { TextInput, View } from "react-native";
import { useTheme } from "@electrical-hero/core/providers/theme-provider";
import { useTrainee } from "@electrical-hero/core/providers/trainee-provider";
import { Button } from "@electrical-hero/core/shared/button";
import { Text } from "@electrical-hero/core/shared/text";

/** The name sent with each session (the API has no accounts). Saved on this device. */
export function TraineeNameForm({ submitLabel = "Save name" }: { submitLabel?: string }) {
  const { colors } = useTheme();
  const { traineeName, setTraineeName } = useTrainee();
  const [value, setValue] = useState(traineeName ?? "");
  const trimmed = value.trim();
  const save = () => trimmed && setTraineeName(trimmed);

  return (
    <View className="gap-2">
      <Text variant="label">Your name</Text>
      <TextInput
        accessibilityLabel="Your name"
        value={value}
        maxLength={100}
        autoComplete="name"
        textContentType="name"
        returnKeyType="done"
        placeholder="First and last name"
        placeholderTextColor={colors["ink-muted"]}
        onChangeText={setValue}
        onSubmitEditing={save}
        className="min-h-11 rounded-sm border border-border-strong bg-surface-200 px-3 text-ink type-body"
      />
      <Text variant="small" className="text-ink-muted">
        Your trainer sees this name on each session you start.
      </Text>
      <Button
        variant={traineeName ? "secondary" : "primary"}
        label={submitLabel}
        disabled={!trimmed || trimmed === traineeName}
        onPress={save}
      />
    </View>
  );
}
