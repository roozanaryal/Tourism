import { ImCross } from "react-icons/im";
import PropTypes from "prop-types";

function NotificationModal({ showModal, onClose, notifications = [] }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-lg w-96 max-w-full p-6 border">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-primarycolor"
          onClick={onClose}
        >
          <ImCross />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-primarycolor">Notifications</h2>
        {notifications.length === 0 ? (
          <div className="text-gray-500 text-center">No notifications.</div>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notif, idx) => (
              <li
                key={idx}
                className="p-3 bg-gray-100 rounded text-gray-800 hover:bg-primarycolor hover:text-white transition"
              >
                {notif}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

NotificationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.string),
};

export default NotificationModal;