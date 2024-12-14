import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { DocSearch } from '@docsearch/react';
import { useTheme } from 'next-themes';

interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/docs',
    children: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'Core Concepts',
    href: '/docs/core',
    children: [
      { title: 'Architecture', href: '/docs/core/architecture' },
      { title: 'Authentication', href: '/docs/core/authentication' },
      { title: 'Products', href: '/docs/core/products' },
      { title: 'Orders', href: '/docs/core/orders' },
    ],
  },
  {
    title: 'API Reference',
    href: '/api',
    children: [
      { title: 'REST API', href: '/api/rest' },
      { title: 'GraphQL API', href: '/api/graphql' },
      { title: 'Webhooks', href: '/api/webhooks' },
    ],
  },
  {
    title: 'SDK',
    href: '/sdk',
    children: [
      { title: 'JavaScript/TypeScript', href: '/sdk/js' },
      { title: 'Python', href: '/sdk/python' },
      { title: 'Go', href: '/sdk/go' },
    ],
  },
  {
    title: 'UI Components',
    href: '/ui',
    children: [
      { title: 'Overview', href: '/ui' },
      { title: 'Core Components', href: '/ui/core' },
      { title: 'Commerce Components', href: '/ui/commerce' },
      { title: 'Theming', href: '/ui/theming' },
    ],
  },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'block px-3 py-2 text-sm font-medium rounded-md transition',
        isActive
          ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/10'
          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-primary-900/10'
      )}
    >
      {children}
    </Link>
  );
}

function NavGroup({ item }: { item: NavItem }) {
  const router = useRouter();
  const isActive = router.pathname.startsWith(item.href);

  return (
    <div>
      <h3
        className={clsx(
          'px-3 py-2 text-sm font-semibold',
          isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-gray-100'
        )}
      >
        {item.title}
      </h3>
      {item.children?.map((child) => (
        <NavLink key={child.href} href={child.href}>
          {child.title}
        </NavLink>
      ))}
    </div>
  );
}

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="/images/logo.svg"
              alt="Shora Cloud"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <DocSearch
                  appId="YOUR_APP_ID"
                  indexName="shora"
                  apiKey="YOUR_SEARCH_API_KEY"
                />
              </li>
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <NavGroup item={item} />
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-72">
        <main className="py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert prose-primary max-w-none">
              {children}
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
