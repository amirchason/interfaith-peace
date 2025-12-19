# 🔄 IMAGE GENERATION - CRASH RECOVERY INSTRUCTIONS

## If Claude Crashes During Image Generation

### Quick Resume Steps:

1. **Check Progress File**:
   ```bash
   cd ~/proj/peace
   cat IMAGE_GENERATION_PROGRESS.json
   ```

2. **Find Last Position**:
   - Look at `"current_category"`: Which category was being processed
   - Look at `"current_post"`: Which post was being worked on
   - Look at `"current_image_index"`: Which image (1, 2, or 3)
   - Look at `"next_action"`: Exactly what to do next

3. **Resume Generation**:
   ```bash
   # Tell Claude:
   "Resume image generation from IMAGE_GENERATION_PROGRESS.json"
   
   # Claude will:
   - Read the progress file
   - Continue from exact checkpoint
   - Update progress as it goes
   ```

4. **Manual Resume** (if needed):
   - Open `IMAGE_GENERATION_MASTER_PLAN.txt`
   - Find the post in `"current_post"`
   - Look for the image number in `"current_image_index"`
   - Start generating from that specific image

### Example Recovery Scenario:

**Progress file shows:**
```json
{
  "current_category": "christianity",
  "current_post": "beatitudes",
  "current_image_index": 2,
  "next_action": "Generate content image 2 for beatitudes post"
}
```

**What this means:**
- We were working on Christianity category
- Specifically the "Beatitudes" post
- We completed title image (1) and content image 1 (2)
- Next: Generate content image 2
- After that: Move to next post (love-your-enemies)

### Files to Check After Crash:

1. **Master Plan**: `IMAGE_GENERATION_MASTER_PLAN.txt`
   - Contains all 111 image prompts
   - Organized by category and post
   - Each image has detailed prompt and placement info

2. **Progress Tracker**: `IMAGE_GENERATION_PROGRESS.json`
   - Shows exactly where we stopped
   - Lists completed posts
   - Lists failed images (if any)

3. **Generated Images**: `~/proj/peace/images/`
   - Check which images actually exist
   - Verify file sizes (should be > 50KB)
   - Confirm images match expected count

### Resume Command Templates:

**Option 1 - Automatic Resume:**
```
"Read IMAGE_GENERATION_PROGRESS.json and resume image generation from where we left off. Continue with [current_post] starting at image [current_image_index]."
```

**Option 2 - Specific Resume:**
```
"Resume generating images for [category] category. We completed [X] posts. Start with [next_post] post, generate all 3 images."
```

**Option 3 - Category Skip:**
```
"Skip [category] category (already complete). Move to [next_category] and generate all images."
```

### Progress Verification:

After resuming, verify:
```bash
# Count generated images
find ~/proj/peace/images -name "*.jpg" | wc -l

# Expected: Should match "completed_images" in progress file

# Check specific category
ls -lh ~/proj/peace/images/teachings/buddhism/
ls -lh ~/proj/peace/images/articles/christianity/

# Verify image sizes (none should be 0 bytes)
find ~/proj/peace/images -name "*.jpg" -size 0
```

### Common Issues & Solutions:

**Issue 1**: Progress file corrupted
- **Solution**: Use `IMAGE_GENERATION_MASTER_PLAN.txt` and manually count completed images

**Issue 2**: Images generated but not saved
- **Solution**: Check backup directory, re-generate missing images

**Issue 3**: Wrong image for post
- **Solution**: Delete bad image, update progress file to regenerate

**Issue 4**: Lost track of progress completely
- **Solution**: Count existing images, compare to master plan, resume from first missing

### Emergency Full Restart:

If progress tracking is completely lost:

```bash
# 1. Backup any existing images
mv ~/proj/peace/images ~/proj/peace/images_backup_$(date +%Y%m%d_%H%M%S)

# 2. Reset progress file
cp IMAGE_GENERATION_PROGRESS_TEMPLATE.json IMAGE_GENERATION_PROGRESS.json

# 3. Start fresh
"Start image generation from beginning using IMAGE_GENERATION_MASTER_PLAN.txt"
```

### Checkpoints:

Progress is saved after EVERY image generation:
- After each title image: Progress file updated
- After each content image: Progress file updated  
- After each post complete: Post added to `"completed_posts"` array
- After each category complete: Category marked complete

### Communication Protocol:

When resuming, tell Claude:

1. **What broke**: "Claude crashed while generating [specific image]"
2. **Where to resume**: "Resume from [post name], image [number]"
3. **How many done**: "Already completed [X] posts in [category]"
4. **What to skip**: "Skip these completed posts: [list]"

### Success Criteria:

Resume is successful when:
- ✅ Claude reads progress file
- ✅ Claude identifies correct starting point
- ✅ Claude skips already-completed images
- ✅ Claude continues with next image in sequence
- ✅ Progress file updates correctly
- ✅ Images save to correct directory

### Final Verification:

When all 111 images complete:
```bash
# Total count
find ~/proj/peace/images -name "*.jpg" | wc -l
# Should output: 111

# By category
ls ~/proj/peace/images/teachings/buddhism/ | wc -l  # 9 images
ls ~/proj/peace/images/teachings/christianity/ | wc -l  # 9 images
ls ~/proj/peace/images/articles/christianity/ | wc -l  # 9 images
# ... etc

# Check progress file shows 100%
grep "completed_images" IMAGE_GENERATION_PROGRESS.json
# Should show: "completed_images": 111
```

---

## 🎯 Quick Reference Card

**Files**:
- Master Plan: `IMAGE_GENERATION_MASTER_PLAN.txt`
- Progress: `IMAGE_GENERATION_PROGRESS.json`
- Resume: `RESUME_INSTRUCTIONS.md` (this file)

**Directories**:
- Images: `~/proj/peace/images/`
- Backup: `~/proj/peace/images_backup/`

**Resume Phrase**:
```
"Resume image generation from checkpoint in IMAGE_GENERATION_PROGRESS.json"
```

**Total Goal**: 111 images for 37 posts (3 images each)

---

*Keep this file handy during image generation process!*
