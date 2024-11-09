export default function LogTable({ logs }) {
    return (
        <div className="w-full overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-300">Action Type</th>
                        <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-300">Timestamp</th>
                        <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-300">User ID</th>
                        <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-300">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.length > 0 ? (
                        logs?.map((log) => (
                            <tr
                                key={log._id}
                                className="hover:bg-gray-100 focus-within:bg-gray-100 even:bg-gray-50"
                            >
                                <td className="p-3 text-gray-600 border-b border-gray-300">{log.actionType}</td>
                                <td className="p-3 text-gray-600 border-b border-gray-300">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td className="p-3 text-gray-600 border-b border-gray-300">{log.userId}</td>
                                <td className="p-3 text-gray-600 border-b border-gray-300">{log.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="p-4 text-center text-gray-500">No data found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
