import * as React from 'react'
import crudeForm from '@crude/form'
import { TextStyle, ImageStyle } from 'react-native'
import { View, Text, ImageIcon } from '../../components'
import { platform, color } from '../../theme'
import { validator } from '../../utils/validate'
import { TextInput } from './input'

const { create: createForm, Field } = crudeForm
const { px2dp } = platform

export interface PriceSettingProps{
    forms: any
    title?: string
    getParams?: (params) => void
}

const LIST_TEXT_BOT: TextStyle = {
    marginBottom: px2dp(10)
}
const TEXT_TITLE: TextStyle = {
    marginRight: px2dp(20),
    lineHeight: 18
}
const TEXT_PRICE = {
    ...TEXT_TITLE,
    marginTop: px2dp(2)
}
const DOLLAR: ImageStyle = {
    marginLeft: px2dp(-70),
    marginTop: -2
}
const INPUT = {
    backgroundColor: color.background,
    padding: 0,
    borderRadius: px2dp(4),
    marginRight: px2dp(10),
    paddingHorizontal: px2dp(10),
    paddingVertical: px2dp(5),
    height: px2dp(24),
    width: px2dp(60),
    // textAlign: 'center'
}
const validate = validator({ extend: ['month', 'quarter', 'year'] })

@createForm({ validate, watch: ['month', 'quarter', 'year'] })
export class PriceSetting extends React.Component<PriceSettingProps> {
    render() {
        const { 
            title,
            getParams,
            forms: {
                values,
            }, 
        } = this.props
        getParams(values)

        return (
            <View>
                <View row align="flex-start">
                    <Text style={TEXT_PRICE} gary>{title}</Text>
                    <View>
                        <View row style={LIST_TEXT_BOT} align="center">
                            <Field
                                style={INPUT}
                                // initial="99"
                                name="month"
                                placeholder="99"
                                component={TextInput}
                                formatType="number"
                                // 禁止粘贴
                                contextMenuHidden={true}
                                maxLength={4}
                                keyboardType="numeric" 
                            />
                            <ImageIcon size={12} style={DOLLAR} icon="dollar" />
                            <Text note>30天自动跟投权限</Text>
                        </View>
                        <View row style={LIST_TEXT_BOT} align="center">
                            <Field
                                style={INPUT}
                                name="quarter"
                                placeholder="199"
                                component={TextInput}
                                formatType="number"
                                // 禁止粘贴
                                contextMenuHidden={true}
                                maxLength={4}
                                keyboardType="numeric" 
                            />
                            <ImageIcon size={12} style={DOLLAR} icon="dollar" />
                            <Text note>90天自动跟投权限</Text>
                        </View>
                        <View row align="center" style={LIST_TEXT_BOT}>
                            <Field
                                style={INPUT}
                                name="year"
                                placeholder="699"
                                component={TextInput}
                                formatType="number"
                                // 禁止粘贴
                                contextMenuHidden={true}
                                maxLength={4}
                                keyboardType="numeric" 
                            />
                            <ImageIcon size={12} style={DOLLAR} icon="dollar" />
                            <Text note>365天自动跟投权限</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
