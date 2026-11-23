# BoomScroll content

Edit the JSON files in `direct-content/`. Each file has a top-level `posts` array. Keep each post's ID unique and stable so the app can associate saves and notes with it. Use the existing category keys `books`, `sd`, `lld`, and `ai`, and include the original URL in `sourceUrl` when citing a public source.

Run `node refresh-content.mjs` to scan the source files and regenerate the topic files in `content/` and the root `index.json`. The script gives each topic an index URL that changes when its content changes, so the app can pick up edits on refresh.

Commit the source files and generated feed together and push to `main`. BoomScroll reads the published index and topic files from this repository.

## Books and chapter guides

| Book | Original reading | BoomScroll guide |
| --- | --- | --- |
| James Allen, *As a Man Thinketh* | [Complete public-domain text](content/books/as-a-man-thinketh/original.txt), from [Project Gutenberg](https://www.gutenberg.org/ebooks/4507) via [GITenberg](https://github.com/GITenberg/As-a-Man-Thinketh_4507) | [PDF](content/books/as-a-man-thinketh/boomscroll-guide.pdf) |
| Martin Kleppmann, *Designing Data-Intensive Applications*, first edition | [O’Reilly sample hosted by ScyllaDB](https://www.scylladb.com/wp-content/uploads/ScyllaDB-Designing-Data-Intensive-Applications.pdf), with chapters 3, 5, and 8 | [PDF](content/books/ddia/boomscroll-guide.pdf) |

For each new book, record the title, author, edition, and source. Store the original under `content/books/<book-slug>/` when its license permits redistribution. For a copyrighted title, link to the authorized edition or chapter sample and use any separately supplied copy locally.

Read the selected chapters and turn the important ideas into original cards. Give each card a chapter reference, a concrete example or trade-off, and a design question or exercise. Put the cards in `direct-content/<book-slug>-guide.json` and export the same material as `content/books/<book-slug>/boomscroll-guide.pdf`. Run the feed refresh script before publishing. Start DDIA coverage with first-edition chapters 3, 5, and 8. Add chapters 6 (Partitioning) and 7 (Transactions) to the guide when source copies are available to review.
