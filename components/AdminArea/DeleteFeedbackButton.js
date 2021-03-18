import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const DeleteFeedbackButton = ({ postRef }) => {
  const router = useRouter();

  const deleteFeedback = async () => {
    const doIt = confirm('are you sure!');
    if (doIt) {
      await postRef.delete();
      router.push('/admin');
      toast('post annihilated ', { icon: '🗑️' });
    }
  };

  return (
    <button className="btn-red" onClick={deleteFeedback}>
      Delete
    </button>
  );
};
export default DeleteFeedbackButton;
