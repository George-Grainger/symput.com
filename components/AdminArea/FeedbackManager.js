import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import FeedbackForm from '../Form/FeedbackForm';
import DeleteFeedbackButton from './DeleteFeedbackButton';
import { getFeedbackPostRef } from '@/lib/dbUtils';

const FeedbackManager = () => {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = getFeedbackPostRef(slug);
  const [post] = useDocumentDataOnce(postRef);

  return (
    <>
      {post && (
        <section className="section-default section-default-padding">
          <div className="w-fs-card bg-white px-3 sm:px-8 sm:pb-4 dark:bg-gray-900 grid md:grid-cols-2 relative rounded-3xl transition-darkmode p-2">
            <div className="md:sticky md:top-20 pt-6 md:mb-24 md:pb-2 bg-white dark:bg-gray-900 z-10 transition-darkmode">
              <h1 className="prose text-3xl dark:prose-dark font-semibold md:mb-2">
                Title: {post?.title}
              </h1>
              <p className="prose text-xl dark:prose-dark">
                Slug: {post?.slug}
              </p>
            </div>

            <aside className="sticky top-20 pt-8 pb-2 md:pb-0 mb-24 bg-white dark:bg-gray-900 z-10 transition-darkmode">
              <div className="flex">
                <button
                  className={
                    'btn mr-2 md:mr-8 flex-auto ' +
                    (!preview
                      ? 'btn-black dark:btn-yellow'
                      : ' btn-black-inverted dark:btn-yellow-inverted')
                  }
                  onClick={() => setPreview(false)}
                >
                  Edit
                </button>
                <button
                  className={
                    'btn mr-2 md:mr-8 flex-auto ' +
                    (preview
                      ? 'btn-black dark:btn-yellow'
                      : ' btn-black-inverted dark:btn-yellow-inverted')
                  }
                  onClick={() => setPreview(true)}
                >
                  Preview
                </button>
                <DeleteFeedbackButton />
              </div>
            </aside>

            <FeedbackForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </div>
        </section>
      )}
    </>
  );
};
export default FeedbackManager;
