# Legacy Articles: Component Syntax Issues

**Status**: 3 articles deactivated pending syntax refactoring
**Date**: December 18, 2025
**Build Status**: ✅ Successfully building (38 pages)

---

## Summary

Three counter-extremism articles have extensive MDX component syntax issues that prevent compilation. The articles are temporarily deactivated (renamed to `.syntax-issues` extension) pending systematic refactoring.

---

## Affected Articles

1. **how-extremists-recruit.mdx.syntax-issues**
   - Target keyword: "how extremists recruit"
   - Search volume: 3,800/month
   - Estimated fixes needed: 15-20 component corrections

2. **belief-spectrum-moderate-extremist.mdx.syntax-issues**
   - Target keyword: "belief spectrum moderate extremist"
   - Search volume: 2,100/month
   - Estimated fixes needed: 10-15 component corrections

3. **root-causes-religious-extremism.mdx.syntax-issues**
   - Target keyword: "root causes of religious extremism"
   - Search volume: 4,200/month
   - Estimated fixes needed: 10-15 component corrections

**Total potential traffic**: 10,100 monthly searches

---

## Syntax Issues Identified

### Problem Pattern

**Incorrect syntax** (causing build failures):
```astro
<ComponentName
  prop1="value"
  prop2="value"

  **Markdown content here**
  More content...

  invalidProp="value"
/>
```

**Correct syntax**:
```astro
<ComponentName prop1="value" prop2="value">

**Markdown content here**
More content...

**Additional info**: Value that was in invalidProp

</ComponentName>
```

### Specific Issues

**1. Component opening tags not closed before content**
- ❌ Props defined, then content appears without closing `>`
- ✅ Should close tag with `>` before any slot content

**2. Invalid props used**
- ❌ `evidence="..."` on components that don't accept it
- ❌ `source="..."` on components that don't accept it
- ✅ Move these to slot content with proper formatting

**3. Self-closing syntax misused**
- ❌ Using `/>` when slot content exists
- ✅ Use `</ComponentName>` when there's slot content

### Components Affected

- **TacticBreakdown.astro**: Accepts `tactic`, `description` props only
- **CaseStudy.astro**: Accepts `title`, `description`, `context` props (all optional now)
- **ActionableInsight.astro**: Accepts `title` prop (optional)
- **ManipulationTechnique.astro**: Check component definition for accepted props
- **RecruitmentStage.astro**: Check component definition for accepted props
- **WarningSign.astro**: Check component definition for accepted props
- **ExpertQuote.astro**: Check component definition for accepted props
- **SpectrumLevel.astro**: Check component definition for accepted props
- **SpectrumMovement.astro**: Check component definition for accepted props
- **ResearchData.astro**: Check component definition for accepted props

---

## How to Fix

### Step-by-Step Process

**For each affected article:**

1. **Read the component definition** to understand accepted props:
   ```bash
   cat src/components/ComponentName.astro
   ```

2. **Identify all malformed component usages**:
   ```bash
   # Find lines with markdown content inside component tags
   grep -n "^  \*\*" article.mdx
   ```

3. **Fix each usage**:
   - Close opening tag with `>` after all valid props
   - Move invalid props to slot content with proper markdown formatting
   - Replace `/>` with `</ComponentName>`

4. **Test build** after each article:
   ```bash
   npm run build
   ```

### Example Fix

**Before** (line 148-174 in how-extremists-recruit.mdx.syntax-issues):
```astro
<TacticBreakdown
  tactic="Keyword Targeting"
  description="Extremists optimize content"

  **How it works:**
  ...content...

  evidence="Guillaume Chaslot quote..."
/>
```

**After**:
```astro
<TacticBreakdown tactic="Keyword Targeting" description="Extremists optimize content">

**How it works:**
...content...

**Evidence:** Guillaume Chaslot quote...

</TacticBreakdown>
```

---

## Automation Potential

**Semi-automated fix possible**:
- Pattern-match opening tags with newlines before content
- Identify invalid props based on component definitions
- Apply consistent transformation

**Script outline**:
```bash
# 1. Find all component usages with content
# 2. Check component file for valid props
# 3. Restructure: valid props on opening line, content in slot, proper closing tag
# 4. Move invalid props to content as markdown
```

---

## Priority Recommendation

**High Priority** (high-value content, syntax issues blocking activation):
1. Fix these 3 articles before launch
2. Combined SEO value: 10K monthly searches
3. Counter-extremism content highly relevant to site mission

**Alternative**:
- Simplify component usage in legacy articles
- Replace custom components with standard markdown
- Reactivate with simpler formatting

---

## Already Fixed

✅ **Components** (working correctly):
- ActionableInsight.astro
- ComparisonTable.astro
- CaseStudy.astro
- RelatedArticles.astro
- SEOArticleSchema.astro
- ArticleSchema.astro

✅ **Articles** (successfully activated):
- what-is-religious-extremism.mdx (19 articles total live)

---

## Next Steps

1. **Option A**: Fix all 3 articles systematically (2-3 hours work)
2. **Option B**: Simplify articles to use basic markdown (1 hour work)
3. **Option C**: Build custom MDX linter/fixer script (3-4 hours work, reusable)

**Recommendation**: Fix articles systematically - content is high-quality and worth preserving original formatting.

---

**Build Status After Fixes**: ✅ 38 pages → 41 pages (3 more articles activated)
**SEO Impact**: +10K monthly search traffic potential
