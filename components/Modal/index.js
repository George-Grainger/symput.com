import { FaTimes } from 'react-icons/fa';

export default function Modal({
  hidden,
  title,
  children,
  button1,
  button2,
  handleClose
}) {
  return (
    <>
      <div
        className={`${
          hidden ? 'hidden' : 'flex'
        } justify-center pointer-events-none items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-black dark:text-white`}
      >
        <div className="relative w-auto m-6 max-w-xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button
                aria-label="Close sidebar"
                onClick={handleClose}
                className="p-4 absolute top-3 right-3 cursor-pointer"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <div className="relative p-6 flex-auto">{children}</div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              {button1 && (
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={handleClose}
                >
                  {button1}
                </button>
              )}
              {button2 && (
                <button
                  className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={handleClose}
                >
                  {button2}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
