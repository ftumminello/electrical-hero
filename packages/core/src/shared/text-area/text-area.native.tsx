import { TextInput, View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { useTheme } from "../../providers/theme-provider";
import { Text } from "../text";
import { FIELD, FIELD_ACCESSORY, FIELD_BOX, FIELD_HINT, FIELD_INPUT, FIELD_LABEL } from "./text-area.styles";
import type { TextAreaProps } from "./text-area.types";

const LINE_HEIGHT = 24;

export const TextArea = ({
  label,
  value,
  onChangeText,
  placeholder,
  hint,
  disabled,
  rows = 3,
  accessory,
  className,
}: TextAreaProps) => {
  const { colors } = useTheme();

  return (
    <View className={cn(FIELD, "min-w-0", className)}>
      <Text variant="label" className={FIELD_LABEL}>
        {label}
      </Text>
      <View className={FIELD_BOX}>
        <TextInput
          multiline
          scrollEnabled
          accessibilityLabel={label}
          accessibilityHint={hint}
          value={value}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={colors["ink-muted"]}
          onChangeText={onChangeText}
          textAlignVertical="top"
          style={{ height: Math.max(96, rows * LINE_HEIGHT + 24) }}
          className={cn(FIELD_INPUT, disabled && "opacity-50")}
        />
        {accessory && <View className={FIELD_ACCESSORY}>{accessory}</View>}
      </View>
      {hint && (
        <Text variant="small" className={FIELD_HINT}>
          {hint}
        </Text>
      )}
    </View>
  );
};
