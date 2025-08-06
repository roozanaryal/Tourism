import { ImCross } from "react-icons/im";
import { FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import PropTypes from "prop-types";

function NotificationModal({ showModal, onClose, notifications = [] }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden border border-gray-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primarycolor to-secondarycolor p-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            Notifications
          </h2>
          <button
            className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/20"
            onClick={onClose}
          >
            <ImCross size={18} />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">No notifications yet</div>
              <div className="text-sm text-gray-500">Bookings will appear here</div>
            </div>
          ) : (
            <ul className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-rounded">
              {notifications.map((notif, idx) => {
                // Check if notification is from today (considered "new")
                const isToday = notif.createdAt && new Date(notif.createdAt).toDateString() === new Date().toDateString();
                
                return (
                  <li
                    key={idx}
                    className={`p-4 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${isToday ? 'bg-blue-50 border-blue-200 hover:border-blue-300' : 'bg-white border-gray-100 hover:border-primarycolor/30'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-primarycolor">
                        <FaUserCircle size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{notif.userEmail}</div>
                        <div className="text-sm text-gray-600 mt-1">Booked <span className="font-semibold text-primarycolor">{notif.guideName}</span></div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                          <FaCalendarAlt size={10} />
                          <span>{notif.createdAt ? new Date(notif.createdAt).toLocaleString() : 'Unknown date'}</span>
                        </div>
                        {isToday && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">New</span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 text-center">
          {notifications.length > 0 && (
            <div>You have {notifications.length} notification{notifications.length !== 1 ? 's' : ''}</div>
          )}
        </div>
      </div>
    </div>
  );
}

NotificationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    userEmail: PropTypes.string.isRequired,
    guideName: PropTypes.string.isRequired,
    createdAt: PropTypes.string
  }))
};

export default NotificationModal;