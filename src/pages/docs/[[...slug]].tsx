import { GetStaticProps, GetStaticPaths } from 'next';
import { DocsLayout } from '../../layouts/DocsLayout';
import { promises as fs } from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

// MDX components
const components = {
  // Add your custom components here
};

interface DocsPageProps {
  source: any;
  frontMatter: {
    title: string;
    description?: string;
  };
}

export default function DocsPage({ source, frontMatter }: DocsPageProps) {
  return (
    <DocsLayout>
      <h1>{frontMatter.title}</h1>
      {frontMatter.description && (
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {frontMatter.description}
        </p>
      )}
      <MDXRemote {...source} components={components} />
    </DocsLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docsDirectory = path.join(process.cwd(), 'content/docs');
  const walkDir = async (dir: string): Promise<string[]> => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map((entry) => {
        const res = path.resolve(dir, entry.name);
        return entry.isDirectory() ? walkDir(res) : res;
      })
    );
    return files.flat();
  };

  const files = await walkDir(docsDirectory);
  const paths = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const relativePath = path.relative(docsDirectory, file);
      const slug = relativePath.replace(/\.mdx$/, '').split('/');
      return {
        params: { slug: slug === ['index'] ? [] : slug },
      };
    });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string[] | undefined;
  const filePath = path.join(
    process.cwd(),
    'content/docs',
    `${slug?.join('/') || 'index'}.mdx`
  );

  const fileContents = await fs.readFile(filePath, 'utf8');

  const mdxSource = await serialize(fileContents, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
            onVisitLine(node: any) {
              if (node.children.length === 0) {
                node.children = [{ type: 'text', value: ' ' }];
              }
            },
            onVisitHighlightedLine(node: any) {
              node.properties.className.push('line--highlighted');
            },
            onVisitHighlightedWord(node: any) {
              node.properties.className = ['word--highlighted'];
            },
          },
        ],
      ],
    },
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: mdxSource.frontmatter,
    },
  };
};
