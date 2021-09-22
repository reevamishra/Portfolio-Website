const allPosts = require.context(
  '!babel-loader!mdx-loader!posts',
  true,
  /\.mdx$/,
  'lazy'
);

const posts = allPosts
  .keys()
  .filter(path => path.startsWith('posts/'))
  .map(async filePath => {
    const { default: content, frontMatter } = await allPosts(filePath);

    return {
      content,
      ...frontMatter,
    };
  });

const fetchPosts = async () =>
  (await Promise.all(posts)).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export default fetchPosts;
