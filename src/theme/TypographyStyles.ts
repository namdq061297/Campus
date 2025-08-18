import { Platform, StyleSheet } from 'react-native'
import COLORS from './colors'

const TypographyStyles = StyleSheet.create({
    titleMedium: {
        fontSize: 18,
        fontWeight: '600'
    },
    label: {
        fontSize: 16,
        color: COLORS.text_main
    }
})

export default TypographyStyles
