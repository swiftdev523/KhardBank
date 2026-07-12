import SearchInput from "../shared/SearchInput";
import { categoryList } from "../../utils/categories";

export default function TransactionFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  accountId,
  onAccountChange,
  accounts,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  showAccountFilter = true,
}) {
  return (
    <div className="card p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search transactions..."
        className="md:w-64"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
        className="rounded-lg border border-slate/20 bg-white py-2 px-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass">
        <option value="all">All categories</option>
        {categoryList.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {showAccountFilter ? (
        <select
          value={accountId}
          onChange={(e) => onAccountChange(e.target.value)}
          aria-label="Filter by account"
          className="rounded-lg border border-slate/20 bg-white py-2 px-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass">
          <option value="all">All accounts</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      ) : null}

      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-sm text-slate">
          From
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="rounded-lg border border-slate/20 bg-white py-2 px-2 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate">
          To
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="rounded-lg border border-slate/20 bg-white py-2 px-2 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
          />
        </label>
      </div>
    </div>
  );
}
