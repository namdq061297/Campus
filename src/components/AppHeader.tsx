import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import COLORS from 'theme/colors';

type Props = {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
};

const AppHeader: React.FC<Props> = ({
  title,
  showBack = true,
  onBackPress,
  rightIcon,
  onRightPress,
  style,
  titleStyle,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, style]}>
      {showBack ? (
        <TouchableOpacity style={styles.side} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}

      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      {rightIcon ? (
        <TouchableOpacity style={styles.side} onPress={onRightPress}>
          <Ionicons name={rightIcon} size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}
    </View>
  );
};

export default React.memo(AppHeader);

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.silver
    // backgroundColor: '#fff',
    // // Shadow for iOS
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,

    // // Shadow for Android
    // elevation: 4,
  },
  side: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
