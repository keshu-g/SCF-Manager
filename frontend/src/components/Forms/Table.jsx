import React from "react";
import { Edit, Trash2 } from "lucide-react";

const Table = ({ columns, data, actions }) => {
  return (
    <div className="mt-6 shadow-lg rounded-lg border border-border-color dark:border-dark-border-color">
      {/* Wrapper with overflow for scrolling */}
      <div className="overflow-auto rounded-lg">
        <table className="min-w-full table-auto bg-white dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text border-collapse">
          <thead>
            <tr className="bg-secondary-bg dark:bg-dark-secondary-bg">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wide"
                >
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 py-3 w-1/12"></th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-6 text-center text-sm text-gray-500 dark:text-dark-muted"
                >
                  No data available.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-t border-border-color dark:border-dark-border-color"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm">
                      {row[col.key] || "-"}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 flex items-center justify-end space-x-2">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(rowIndex)}
                          className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white rounded transition"
                          title={action.label}
                        >
                          {action.label === "Edit" ? (
                            <Edit size={18} />
                          ) : action.label === "Delete" ? (
                            <Trash2 size={18} />
                          ) : (
                            action.icon
                          )}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
