# DxNavigator Roadmap

This document stores future product directions that are valuable but not immediate implementation work.

The current priority remains the core workflow engine, workflow builder, authentication, and persistence. Items here should be treated as staged product ideas until the foundation is stable.

## Product North Star

DxNavigator should help clinicians move from structured findings to better next steps:

```text
Given what you already entered, here's what deserves attention next.
```

This means the system should not behave like a black-box diagnosis generator. It should organize reasoning, highlight missing data, surface risk, and connect the clinician to useful references at the right moment.

## Future Direction: Clinical Routing and Hints

### Concept

Workflows should eventually support declarative decision-support rules that react to the current form answers.

Example:

```text
Structured answers
  -> pattern detected
  -> focused clinical hint
  -> missing questions or exam findings
  -> suggested next workup
```

### Example

If a respiratory workflow has:

- fever
- productive cough
- dyspnea

DxNavigator could display:

```text
Concern: possible lower respiratory tract infection.
Check next: oxygen saturation, respiratory effort, focal lung findings, comorbidities.
Consider: CXR depending on severity, abnormal vitals, hypoxemia, or high-risk context.
```

### Design Notes

- Rules should be declarative, not hand-coded per workflow.
- Rules should suggest attention, not declare a diagnosis.
- Initial UI should be passive hints, not forced navigation.
- Later actions could highlight fields, scroll to sections, or suggest another workflow.

Possible future workflow metadata:

```ts
clinicalRules: [
  {
    id: 'possible-pneumonia',
    title: 'Possible pneumonia',
    when: {
      all: [
        { field: 'fever', equals: true },
        { field: 'productiveCough', equals: true },
      ],
    },
    guidance: {
      hint: 'Fever with productive cough raises concern for lower respiratory tract infection.',
      askNext: ['Dyspnea', 'Oxygen saturation', 'Focal lung findings'],
      workup: ['Pulse oximetry', 'Consider chest X-ray in the right context'],
    },
  },
]
```

## Future Direction: Visual Reference Libraries

### Concept

Some high-friction diagnostic areas rely heavily on visual pattern recognition. Two especially useful library candidates are:

- CXR reference library.
- Dermatology reference library.

The goal is not automated image interpretation. The goal is clinician-controlled visual comparison against verified source examples.

```text
Clinical suspicion or finding
  -> filtered visual examples
  -> compare pattern
  -> return to workflow with better diagnostic confidence
```

### Product Boundary

The visual library should be a reference tool:

- Not an AI image interpreter.
- Not a diagnosis oracle.
- Not a replacement for radiology, dermatology, biopsy, or clinical judgment.

## CXR Reference Library

### Use Case

Emergency clinicians frequently wait on or reason around chest X-rays. A CXR library could support quick visual comparison for common patterns.

Example:

```text
I suspect pneumonia, but this CXR looks unusual.
Open CXR library -> filter pneumonia -> compare verified examples.
```

### Candidate Filters

- Diagnosis or pattern:
  - pneumonia
  - pneumothorax
  - pleural effusion
  - pulmonary edema
  - cardiomegaly
  - atelectasis
  - hyperinflation/COPD
  - normal variants
- Finding:
  - consolidation
  - interstitial opacity
  - air bronchograms
  - volume loss
  - unilateral hyperlucency
  - blunted costophrenic angle
- View:
  - PA
  - lateral
  - AP portable

### Source and Licensing Notes

Radiopaedia is a likely high-value source for radiology examples.

Known constraint from discussed Radiopaedia terms:

- attribution required
- same-license redistribution required
- non-commercial use only

If DxNavigator ever has paid features, the CXR reference library should remain clearly separated as a free educational/reference module.

Each CXR entry should store:

```ts
license: {
  name: 'CC BY-NC-SA',
  requiresAttribution: true,
  requiresShareAlike: true,
  permitsCommercialUse: false,
}
```

## Dermatology Reference Library

### Use Case

Dermatology complaints are common in urgent and emergency care, but many rashes look similar and definitive diagnosis may require time, follow-up, dermatology, biopsy, scraping, culture, or clinical evolution.

Example:

```text
Patient has a red itchy patch.
Open dermatology library -> choose ER pattern "red itchy rash" -> compare common and must-not-miss diagnoses.
```

### Core Product Insight

DermNet is clinically rich and has a large image library, but its filters are dermatologist-oriented.

DxNavigator's differentiator should be the filter layer:

```text
ER language
  -> dermatology ontology
  -> useful ER visual differential
```

The image source is not the differentiator. The clinical filter is.

### ER-Oriented Filter Layer

Instead of starting with advanced morphology only, the ER mode should start with common complaint patterns:

- red itchy rash
- painful rash
- blistering rash
- rash with fever
- rash in child
- rash on palms/soles
- facial swelling or facial rash
- genital rash or ulcers
- purpura or bruising
- necrotic or black lesion
- tick or insect bite
- drug rash

These patterns can map internally to dermatology terms.

Example:

```ts
{
  id: 'red-itchy-rash',
  label: 'Red itchy rash',
  mapsTo: {
    colour: ['red', 'pink'],
    lesionType: ['papule', 'plaque', 'wheal/welt/hive', 'eruption'],
    characteristics: ['erythematous', 'excoriation', 'scale'],
  },
  commonDifferentials: [
    'Urticaria',
    'Contact dermatitis',
    'Scabies',
    'Atopic dermatitis',
    'Tinea corporis',
    'Drug eruption',
  ],
  mustNotMissWhen: [
    {
      if: ['mucosal involvement', 'new medication'],
      consider: ['SJS/TEN'],
    },
    {
      if: ['fever', 'purpura'],
      consider: ['Meningococcemia', 'Purpura fulminans'],
    },
  ],
}
```

### Danger-Oriented Filters

ER mode should prioritize risk and disposition:

- fever or systemic toxicity
- mucosal involvement
- skin pain
- non-blanching rash or purpura
- necrosis or black lesion
- rapidly spreading rash
- immunocompromised state
- recent new medication
- pregnancy

Results should be grouped by clinical usefulness:

- must not miss
- common ER diagnoses
- contagious or needs isolation
- needs urgent referral
- likely outpatient follow-up

### Advanced Dermatology Filters

DxNavigator can still support a DermNet-compatible advanced mode.

Useful filter groups include:

- skin of colour
- body location
- age
- sex
- category
- lesion type
- colour
- distribution
- shape
- characteristics

This advanced ontology should exist under the hood, even if the ER UI exposes a simpler layer first.

### Source and Licensing Notes

DermNet watermarked images may be usable for education under Attribution-NonCommercial-NoDerivatives 4.0.

Known constraints from discussed DermNet terms:

- attribution required
- non-commercial use only
- no derivatives
- watermark must remain
- source DermNet page should be linked

Therefore the app should:

- display original watermarked images only
- avoid cropping, visual filters, or modified derivatives
- avoid overlay annotations directly on the image
- show visible attribution near the image
- link to the exact DermNet source page
- keep the dermatology image section free/non-commercial

Each DermNet image entry should store:

```ts
license: {
  name: 'CC BY-NC-ND 4.0',
  attributionText: 'Image sourced from DermNet.',
  permitsCommercialUse: false,
  permitsDerivatives: false,
  requiresWatermarkPreserved: true,
}
```

## Workflow Integration

Visual libraries become most useful when connected to workflows.

Examples:

```text
Pneumonia concern
  -> Open CXR examples for pneumonia
```

```text
Rash workflow answers:
  location = leg
  colour = red
  lesion type = plaque
  shape = annular
  characteristic = scale
  -> Open dermatology visual matches
```

The workflow should be able to prefill visual library filters from structured answers.

Possible future route:

```text
/private/library/dermatology?pattern=red-itchy-rash&location=leg&shape=annular
```

## Not Immediate

These ideas should wait until:

- core workflow persistence exists
- workflow ownership and marketplace model are clearer
- image licensing/attribution rules are reviewed source by source
- a small proof-of-concept dataset is curated manually

First useful proof of concept:

- 10 to 20 CXR examples for common ER chest findings
- 20 to 40 dermatology examples for common ER rash presentations
- source links and license metadata on every item
