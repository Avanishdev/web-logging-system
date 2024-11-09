export default function Pagination({ page, onPageChange }) {
    const handlePrevious = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        onPageChange(page + 1);
    };

    return (
        <div className="flex items-center justify-center mt-6 space-x-2">
            <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg transition-colors ${page === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                aria-label="Previous Page"
            >
                Previous
            </button>
            <span className="px-4 py-2 font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg">
                Page {page}
            </span>
            <button
                onClick={handleNext}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Next Page"
            >
                Next
            </button>
        </div>
    );
}
