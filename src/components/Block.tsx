import React from 'react'
import { View, ViewProps, ViewStyle, StyleProp, StyleSheet } from 'react-native'

type StyleKeys = keyof ViewStyle

type BlockProps = ViewProps &
  Partial<ViewStyle> & {
    children?: React.ReactNode
    style?: StyleProp<ViewStyle>
  }

const Block: React.FC<BlockProps> = ({ children, style, ...rest }) => {
  const extractedStyle: ViewStyle = {}

  // Lấy các props là style hợp lệ trong ViewStyle
  Object.keys(rest).forEach((key) => {
    if (StyleSheet.flatten({})[key as StyleKeys] !== undefined) {
      (extractedStyle as any)[key] = rest[key]
      delete rest[key] // bỏ khỏi props View tránh warning
    }
  })

  const mergedStyle: StyleProp<ViewStyle> = [extractedStyle, style]

  return (
    <View {...rest} style={mergedStyle}>
      {children}
    </View>
  )
}

export default Block
