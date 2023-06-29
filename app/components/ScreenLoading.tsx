import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS} from '../style';

interface ScreenLoadingProps {
  size?: number | 'small' | 'large';
  color?: string;
}

const ScreenLoading: React.FC<ScreenLoadingProps> = ({size, color}) => (
  <View style={styles.container}>
    <ActivityIndicator size={size || 'large'} color={color || COLORS.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenLoading;
