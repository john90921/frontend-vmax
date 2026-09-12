import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/theme';

type ButtonVariant = 'primary' | 'onAccent' | 'outline';
type IconName = React.ComponentProps<typeof Ionicons>['name'];

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  styles?: string;
  icon?: IconName;
  disabled?: boolean;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn btn-primary',
  onAccent: 'btn btn-on-accent',
  outline: 'btn btn-outline',
};

const Button = ({
  title,
  onPress,
  variant = 'primary',
  styles,
  icon,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`flex-row gap-1.5 ${variantClass[variant]} ${styles ?? ''} ${disabled ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}>
      {icon ? <Ionicons name={icon} size={20} color={colors.primary} /> : null}
      {title ? <Text className="btn-label">{title}</Text> : null}
    </TouchableOpacity>
  );
};

export default Button;
