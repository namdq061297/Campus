/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  Text,
  TextProps,
  TextStyle,
  StyleProp,
} from 'react-native'
import TypographyStyles from 'theme/TypographyStyles'

type AppTextProps = {
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
} & TextStyle &
  TextProps

const AppText: React.FC<AppTextProps> = ({ children, style, ...rest }) => {
  // Tách style từ TextStyle props (như color, fontSize, ...)
  const { color, fontSize, fontWeight, textAlign, lineHeight, ...textProps } =
    rest

  const dynamicStyle: TextStyle = {
    color,
    fontSize,
    fontWeight,
    textAlign,
    lineHeight
  }

  return (
    <Text
      {...textProps}
      style={[
        dynamicStyle,
        style,
      ]}>
      {children}
    </Text>
  )
}

export default AppText
