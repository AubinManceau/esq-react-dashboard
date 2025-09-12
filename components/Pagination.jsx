export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end mt-2 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="pagination-previous"
      >
        Précédent
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`w-[34px] aspect-square border-bleu border rounded-md ${
            currentPage === i + 1
              ? "bg-bleu text-white"
              : "hover:bg-bleu/10 cursor-pointer"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-next"
      >
        Suivant
      </button>
    </div>
  );
}
