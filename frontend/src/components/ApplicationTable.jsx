export default function ApplicationTable({ applications, onDeleteApplication, onEditApplication }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Interview':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Offer':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Job Applications</h2>
        <span className="text-xs text-gray-500 font-medium">Total: {applications.length}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date Applied</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm font-medium text-gray-700">
            {applications.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No applications found. Click "Add Job" to create one.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900">{app.company}</td>
                  <td className="px-6 py-4">{app.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{app.dateApplied}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => onEditApplication(app)}
                      className="text-blue-500 hover:text-blue-700 bg-transparent border-0 cursor-pointer"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => onDeleteApplication(app._id)}
                      className="text-red-500 hover:text-red-700 bg-transparent border-0 cursor-pointer"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
