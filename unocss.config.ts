import type { Preset, SourceCodeTransformer } from 'unocss'
import { defineConfig, presetAttributify, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'

import { presetApplet, presetRemRpx, transformerApplet, transformerAttributify } from 'unocss-applet'

import { presetAno } from 'ano-ui'

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp') ?? false
const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []

if (isApplet) {
  presets.push(presetApplet())
  presets.push(presetRemRpx())
  transformers.push(transformerAttributify({ ignoreAttributes: ['block'] }))
  transformers.push(transformerApplet())
}
else {
  presets.push(presetApplet())
  presets.push(presetAttributify())
  presets.push(presetRemRpx({ mode: 'rpx2rem' }))
}

export default defineConfig({
  shortcuts: {
    'u-bg': 'bg-gray-100 dark:bg-black',
    'u-bg-2': 'bg-white dark:bg-[#1C1C1E]',
    'u-border': 'border-[#EBEDF0] dark:border-[#3A3A3C]',
    'u-active': 'bg-[#F2F3F5] dark:!bg-[#3A3A3C]',
    'u-active-h5': 'active:bg-[#F2F3F5] active:dark:bg-[#3A3A3C]',
    'u-text-color': 'text-[#323233] dark:text-[#F5F5F5]',
    'u-text-color-2': 'text-[#969799] dark:text-[#707070]',
    'u-text-color-3': 'text-[#C8C9CC] dark:text-[#4D4D4D]',
    'bg-primary': 'bg-light-blue-500 dark:bg-light-blue-600',
  },
  presets: [
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    /**
     * you can add `presetAttributify()` here to enable unocss attributify mode prompt
     * although preset is not working for applet, but will generate useless css
     */
    ...presets,
    presetAno(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup(), ...transformers],
  rules: [
    [
      'p-safe',
      {
        padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
})
