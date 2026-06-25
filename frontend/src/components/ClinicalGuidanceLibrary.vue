<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import type { ClinicalGuide, SourceFigure } from '@/data/workflow'

defineProps<{
  quickGuides?: ClinicalGuide[]
  sourceFigures?: SourceFigure[]
}>()

const { t } = useI18n()
</script>

<template>
  <section class="guidance-library" aria-labelledby="guidance-library-title">
    <div class="section-heading">
      <p class="eyebrow">{{ t('guidance.libraryEyebrow') }}</p>
      <h2 id="guidance-library-title">{{ t('guidance.libraryTitle') }}</h2>
    </div>

    <div class="guidance-library-grid">
      <section class="guidance-library-panel">
        <div class="section-heading">
          <h3>{{ t('guidance.quickGuideTitle') }}</h3>
          <p class="section-description">{{ t('guidance.quickGuideDescription') }}</p>
        </div>

        <p v-if="!quickGuides?.length" class="builder-empty compact">
          {{ t('guidance.noQuickGuides') }}
        </p>

        <article v-for="guide in quickGuides" :key="guide.title" class="guide-card">
          <h4>{{ guide.title }}</h4>
          <p v-if="guide.description">{{ guide.description }}</p>

          <div v-if="guide.criteria?.length" class="guide-list-group">
            <strong>{{ t('guidance.criteria') }}</strong>
            <ul>
              <li v-for="criterion in guide.criteria" :key="criterion">
                {{ criterion }}
              </li>
            </ul>
          </div>

          <div v-if="guide.actions?.length" class="guide-list-group">
            <strong>{{ t('guidance.actions') }}</strong>
            <ul>
              <li v-for="action in guide.actions" :key="action">
                {{ action }}
              </li>
            </ul>
          </div>
        </article>
      </section>

      <section class="guidance-library-panel">
        <div class="section-heading">
          <h3>{{ t('guidance.sourceFiguresTitle') }}</h3>
          <p class="section-description">{{ t('guidance.sourceFiguresDescription') }}</p>
        </div>

        <p v-if="!sourceFigures?.length" class="builder-empty compact">
          {{ t('guidance.noSourceFigures') }}
        </p>

        <component
          :is="figure.sourceUrl ? 'a' : 'article'"
          v-for="figure in sourceFigures"
          :key="figure.title"
          :href="figure.sourceUrl"
          :target="figure.sourceUrl ? '_blank' : undefined"
          :rel="figure.sourceUrl ? 'noreferrer' : undefined"
          class="guide-card source-figure-card"
        >
          <img
            v-if="figure.imageUrl"
            :src="figure.imageUrl"
            :alt="figure.altText ?? figure.title"
          />
          <h4>{{ figure.title }}</h4>
          <p>{{ figure.source }}</p>
          <p v-if="figure.notes">{{ figure.notes }}</p>
          <small v-if="figure.citation">{{ figure.citation }}</small>
          <strong v-if="figure.sourceUrl" class="source-link-label">
            {{ t('guidance.openSource') }}
          </strong>
        </component>
      </section>
    </div>
  </section>
</template>
