import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {muxInput} from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'default',
  title: 'eliaClient',

  projectId: 'vkim1ezj',
  dataset: 'production',

  plugins: [structureTool(), unsplashImageAsset(), muxInput(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
