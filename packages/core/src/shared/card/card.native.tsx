import { View } from "react-native";
import { cn } from "@electrical-hero/design-system/cn";
import { CARD } from "./card.styles";
import type { CardProps } from "./card.types";

export const Card = ({ className, children }: CardProps) => <View className={cn(CARD, className)}>{children}</View>;
