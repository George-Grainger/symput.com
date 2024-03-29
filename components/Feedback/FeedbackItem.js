import Link from 'next/link';
import { FeedbackItemListContext, UserContext } from '@/lib/context';
import { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaEdit, FaHeart, FaInfoCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { getAuth } from 'firebase/auth';

export default function FeedbackItem({ post, initialAdmin = false }) {
  const auth = getAuth();
  const { locale } = useRouter();
  const [admin, setAdmin] = useState(initialAdmin);
  const { user, loading } = useContext(UserContext);
  const { words_i18n, minRead_i18n, unpublished_i18n } = useContext(
    FeedbackItemListContext
  );

  useEffect(() => {
    if (user?.uid === post.uid) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user]);

  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  const updatedDate =
    typeof post?.updatedAt === 'number'
      ? new Date(post.updatedAt)
      : post.updatedAt?.toDate();
  const published = post?.published;

  return (
    <Link href={`/${post.username}/${post.slug}`} passHref>
      <div
        tabIndex="0"
        className="px-5 py-4 bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg min-w-feedback max-w-3xl mb-6 cursor-pointer prose prose-lg dark:prose-dark transition-darkmode focus-within:ring-gray-900 dark:focus-within:ring-yellow-400"
      >
        <div className="relative flex mb-4 items-start right-0">
          {admin &&
            (auth.currentUser.emailVerified ? (
              <Link href={`/admin/${post.slug}`}>
                <a className="absolute right-0">
                  <FaEdit className="h-6 w-6 hover:text-yellow-600 dark:hover:text-yellow-400" />
                </a>
              </Link>
            ) : (
              <Link
                href="/admin"
                onClick={() =>
                  toast(
                    <span>
                      You must verify your email before you can edit posts again
                    </span>,
                    { icon: <FaInfoCircle /> }
                  )
                }
              >
                <a className="absolute right-0">
                  <FaEdit className="h-6 w-6 hover:text-yellow-600 dark:hover:text-yellow-400" />
                </a>
              </Link>
            ))}
          <Link href={`/${post.username}`} passHref>
            <a className="flex items-center">
              <Image
                height="50px"
                width="50px"
                className="object-cover rounded-full"
                src={post.photoURL || '/images/hacker.png'}
                alt={`${post.username} avatar`}
              />
            </a>
          </Link>
          <div className="ml-4 mt-0.5">
            <Link href={`/${post.username}`}>
              <a className="block leading-snug hover:text-yellow-600 dark:hover-link-yellow-400 mb-1">
                {post.moderatedUsername}
              </a>
            </Link>
            <span className="block text-sm font-light leading-snug">
              {updatedDate
                ? updatedDate.toLocaleString(locale, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })
                : 'Just created'}
            </span>
          </div>
        </div>
        <p className="text-xl font-semibold max-w-none">
          {post?.title || 'Untitled feedback'}
        </p>
        <ReactMarkdown
          className="max-w-none"
          unwrapDisallowed={true}
          allowedElements={['root', 'text', 'paragraph']}
        >
          {post?.summary}
        </ReactMarkdown>
        <div className="flex justify-between items-center mt-5">
          <div className="flex ml-1 font-light items-center">
            <FaHeart className="text-red-500 inline mr-2" />
            {post.heartCount || 0}
          </div>
          {!published && (
            <p className="text-red-500 uppercase text-center">
              {unpublished_i18n}
            </p>
          )}
          <div className="ml-1 font-light lang-switch">
            {`${wordCount} ${words_i18n} ${minutesToRead} ${minRead_i18n}`}
          </div>
        </div>
      </div>
    </Link>
  );
}
