import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// UI component for main post content
export default function FeedbackContent({ post }) {
  const updatedDate =
    typeof post?.updatedAt === 'number'
      ? new Date(post.updatedAt)
      : post.updatedAt.toDate();

  return (
    <article>
      <h1 className="text-4xl text-center">{post?.title}</h1>
      <hr className="my-8 border-gray-900" />
      <ReactMarkdown className="prose mx-auto max-w-markdown sm:max-w-prose">
        {post?.content}
      </ReactMarkdown>
      <hr className="my-8 border-gray-900" />
      <p className="text-center">
        Written by&nbsp;
        <Link href={`/${post.username}/`}>
          <a className="link link-light-bg p-1">@{post.username}</a>
        </Link>
        &nbsp;on&nbsp;
        {updatedDate.toLocaleString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        })}
      </p>
    </article>
  );
}
