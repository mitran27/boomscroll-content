import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';

const sourceDir = new URL('./direct-content/', import.meta.url);
const outputDir = new URL('./content/', import.meta.url);
const indexFile = new URL('./index.json', import.meta.url);
const topics = new Map([
  ['books', 'self-help.json'],
  ['sd', 'system-design.json'],
  ['lld', 'low-level-design.json'],
  ['ai', 'ai-cv-llm.json'],
]);

async function refresh() {
  const filenames = (await readdir(sourceDir)).filter(name => name.endsWith('.json')).sort();
  if (!filenames.length) throw new Error('No JSON source files in direct-content/');

  const grouped = new Map([...topics.keys()].map(category => [category, []]));
  const ids = new Set();
  for (const filename of filenames) {
    const { posts } = JSON.parse(await readFile(new URL(filename, sourceDir), 'utf8'));
    if (!Array.isArray(posts)) throw new Error(filename + ' needs a posts array.');

    for (const post of posts) {
      if (!post || typeof post.id !== 'string' || !post.id.trim() || !topics.has(post.category)) {
        throw new Error(filename + ' has a post with an invalid id or category.');
      }
      if (ids.has(post.id)) throw new Error('Duplicate post id ' + post.id + ' in ' + filename);
      ids.add(post.id);
      grouped.get(post.category).push(post);
    }
  }

  await mkdir(outputDir, { recursive: true });
  const batches = [];
  for (const [category, filename] of topics) {
    const path = new URL(filename, outputDir);
    const posts = grouped.get(category);
    if (!posts.length) {
      await unlink(path).catch(error => {
        if (error.code !== 'ENOENT') throw error;
      });
      continue;
    }

    const content = JSON.stringify({ posts }, null, 2) + '\n';
    const revision = createHash('sha256').update(content).digest('hex').slice(0, 12);
    await writeFile(path, content);
    batches.push('content/' + filename + '?v=' + revision);
  }

  await writeFile(indexFile, JSON.stringify({ batches }, null, 2) + '\n');
  console.log('Refreshed ' + ids.size + ' posts across ' + batches.length + ' topics.');
}

refresh().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
