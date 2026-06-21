<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import type { ClinicalGuide, SourceFigure } from '@/data/workflow'
import { resolveText } from '@/i18n/locales'

defineProps<{
  quickGuides?: ClinicalGuide[]
  sourceFigures?: SourceFigure[]
}>()

const { locale, t } = useI18n()
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

        <article v-for="guide in quickGuides" :key="resolveText(guide.title, locale)" class="guide-card">
          <h4>{{ resolveText(guide.title, locale) }}</h4>
          <p v-if="guide.description">{{ resolveText(guide.description, locale) }}</p>

          <div v-if="guide.criteria?.length" class="guide-list-group">
            <strong>{{ t('guidance.criteria') }}</strong>
            <ul>
              <li v-for="criterion in guide.criteria" :key="resolveText(criterion, locale)">
                {{ resolveText(criterion, locale) }}
              </li>
            </ul>
          </div>

          <div v-if="guide.actions?.length" class="guide-list-group">
            <strong>{{ t('guidance.actions') }}</strong>
            <ul>
              <li v-for="action in guide.actions" :key="resolveText(action, locale)">
                {{ resolveText(action, locale) }}
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

        <article
          v-for="figure in sourceFigures"
          :key="resolveText(figure.title, locale)"
          class="guide-card source-figure-card"
        >
          <img
            v-if="figure.imageUrl"
            :src="figure.imageUrl"
            :alt="figure.altText ? resolveText(figure.altText, locale) : resolveText(figure.title, locale)"
          />
          <h4>{{ resolveText(figure.title, locale) }}</h4>
          <p>{{ resolveText(figure.source, locale) }}</p>
          <p v-if="figure.notes">{{ resolveText(figure.notes, locale) }}</p>
          <small v-if="figure.citation">{{ resolveText(figure.citation, locale) }}</small>
        </article>
      </section>
    </div>
  </section>
</template>
