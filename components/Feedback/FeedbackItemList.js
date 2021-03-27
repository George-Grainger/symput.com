import FeedbackItem from './FeedbackItem';
import ButtonEllipsis from '@/components/Loading/ButtonEllipsis';
import uuid from 'react-uuid';
import { useAsync } from '@/lib/useAsync';
import { useContext, useEffect } from 'react';
import FeedbackPlaceholder from '../Loading/FeedbackPlaceHolder';

const FeedbackItemList = ({ getMore, context, trigger = false }) => {
  const { posts, setPosts, isEnd, setIsEnd } = useContext(context);
  const getMoreFeedback = async (last) => {
    const [newPosts, nowIsEnd] = await getMore(last);
    setPosts(posts.concat(newPosts));
    setIsEnd(nowIsEnd);
    return;
  };

  useEffect(() => {
    if (trigger) {
      execute();
    }
  }, []);

  const { loading, error, execute } = useAsync({
    asyncFunction: () => getMoreFeedback(posts[posts.length - 1] || -1)
  });
  if (posts?.length == 0 && loading) {
    return (
      <>
        <FeedbackPlaceholder />
        <FeedbackPlaceholder />
        <FeedbackPlaceholder />
      </>
    );
  } else {
    return (
      <>
        {posts.map((post) => (
          <FeedbackItem key={uuid()} post={post} key={post.slug} />
        ))}
        {!isEnd && (
          <button
            onClick={execute}
            disabled={loading}
            className={`btn-lg ${
              error ? 'btn btn-red' : 'btn-black dark:btn-yellow'
            } my-4`}
          >
            {error ? (
              'Please try again'
            ) : loading ? (
              <ButtonEllipsis color="bg-white" />
            ) : (
              'Load more'
            )}
          </button>
        )}
        {isEnd && (
          <div className="font-bold py-3 px-6 rounded shadow-md cursor-default bg-green-500 text-white my-4">
            You have reached the end!
          </div>
        )}
      </>
    );
  }
};

export default FeedbackItemList;
