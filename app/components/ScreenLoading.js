import React from 'react'
import {
    ActivityIndicator, View,
} from 'react-native'
import { COLORS } from '../style'

const ScreenLoading = ({
                           size = 'large', color = COLORS.primary
                       }) => {
    return (
        <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center'
        }}
        >
            <ActivityIndicator size={size} color={color} />
        </View>
    )
}
export default ScreenLoading
