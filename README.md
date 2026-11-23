# BoomScroll content

Edit the JSON files in `direct-content/`. Each file has a top-level `posts` array. Keep each post's ID unique and stable so the app can associate saves and notes with it. Use the existing category keys `books`, `sd`, `lld`, and `ai`, and include the original URL in `sourceUrl` when citing a public source.

Run `node refresh-content.mjs` to scan the source files and regenerate the topic files in `content/` and the root `index.json`. The script gives each topic an index URL that changes when its content changes, so the app can pick up edits on refresh.

Commit the source files and generated feed together and push to `main`. BoomScroll reads the published index and topic files from this repository.
