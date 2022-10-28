import { TPageData } from '@workspace/core/entities';
import { useState, useEffect, useRef } from 'react';

import { File, PaperPlaneTilt, Plus, TrashSimple } from 'phosphor-react';

import classes from './PageNavigation.module.scss';
import { useRouter } from 'next/router';
import { useSiteContext } from '@workspace/core/contexts';

import uniqid from 'uniqid';

export const PageNavigation = () => {
  const [pages, setPages] = useState<TPageData[]>([]);
  const router = useRouter();
  const { connector } = useSiteContext();

  useEffect(() => {
    setTimeout(() => {
      connector.getAllPages().then(setPages);
    }, 500);
  }, []);

  return (
    <div className={classes['PageNavigation']}>
      {pages.map((page) => (
        <div>
          <button
            onClick={() => {
              router.push(page.slug);
            }}
          >
            <File />
            {page.slug}
          </button>

          <button
            onClick={() => {
              connector.deletePage(page.slug).then(() => {
                getAllPages().then(setPages);
              });
            }}
          >
            <TrashSimple />
          </button>
        </div>
      ))}

      <CreatePageButton
        handleRefresh={() => {
          getAllPages().then(setPages);
        }}
      />
    </div>
  );
};

const getAllPages = async () => {
  const headers = new Headers({ 'Content-Type': 'application/json' });

  const result = await fetch(
    `${process.env['NEXT_PUBLIC_API_ENDPOINT']}/getAllPages`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({}),
    }
  ).then((result) => result.json());

  return result.pages;
};

const CreatePageButton = ({ handleRefresh }: { handleRefresh: () => void }) => {
  const [state, setState] = useState('button');

  const inputRef = useRef<HTMLInputElement>(null);

  const { connector } = useSiteContext();

  useEffect(() => {
    if (state === 'input' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state]);

  const handleCreate = (slug: string) => {
    if (slugIsValid(slug)) {
      connector
        .createPage(slug, {
          id: uniqid(),
          metadata: {
            title: '',
            description: '',
          },
          sections: [
            {
              id: uniqid(),
              type: 'head',
              data: {
                title: 'New page',
                description: "Let's create a new amazing page.",
                image:
                  'https://images.unsplash.com/photo-1500576992153-0271099def59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80',
                buttons: [],
              },
            },
          ],
          slug,
        })
        .then(() => {
          handleRefresh();
        });
    }
  };

  return (
    <div className={classes['CreatePageButton']}>
      {state === 'button' ? (
        <button
          onClick={() => {
            setState('input');
          }}
        >
          <Plus />
          Create a page
        </button>
      ) : state === 'input' ? (
        <span className={classes['input']}>
          <input
            ref={inputRef}
            placeholder="slug"
            defaultValue={'/'}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (!inputRef.current) return;
                const value = inputRef.current.value;

                handleCreate(value);
                setState('button');
              }
            }}
          />{' '}
          <button
            onClick={() => {
              if (!inputRef.current) return;
              const value = inputRef.current.value;
              handleCreate(value);
              setState('button');
            }}
          >
            <PaperPlaneTilt />
          </button>
        </span>
      ) : null}
    </div>
  );
};

const slugIsValid = (slug: string) => /^(\/[a-z]*)+$/.test(slug);
