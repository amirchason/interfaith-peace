# Legacy Articles Requiring Component Refactoring

## Status: 4 Articles Need Component Syntax Updates

The following 4 articles have excellent content but use outdated component syntax that causes MDX parsing errors. They need component refactoring before activation.

### Files:
1. `src/content/articles/what-is-religious-extremism.mdx.old` (7,000+ words)
2. `src/content/articles/belief-spectrum-moderate-extremist.mdx.old` (6,500+ words)
3. `src/content/articles/how-extremists-recruit.mdx.old` (6,000+ words)
4. `src/content/articles/root-causes-religious-extremism.mdx.old` (5,500+ words)

### Issue:
These articles use components with content outside the component tags:
```mdx
<TacticBreakdown
  tactic="Example"
  description="Description"

  **Content here**  ← This should be inside component tags
/>
```

Should be:
```mdx
<TacticBreakdown tactic="Example" description="Description">

**Content here**  ← Inside the tags

</TacticBreakdown>
```

### Components Affected:
- `ActionableInsight`
- `TacticBreakdown`  
- `ManipulationTechnique`
- `RecruitmentStage`
- Possibly others

### Solution Required:
1. **Manual review** of each component usage
2. **Convert** self-closing tags `/>` to closing tags `</ComponentName>`
3. **Move** content inside component tags
4. **Test build** after each file
5. **Commit** fixed files

### Content Quality:
⭐ **All 4 articles are publication-ready content-wise** ⭐
- Comprehensive research
- Proper citations
- Clear structure
- SEO-optimized
- Just need technical component syntax fixes

### Priority:
**Medium** - These are articles 1-4 in the Counter-Extremism series. Current articles 6-7 are already published. These would fill gaps in the series.

### Estimated Time:
- 2-3 hours manual refactoring
- OR automated script with careful testing

