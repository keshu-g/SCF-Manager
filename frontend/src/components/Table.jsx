const Table = ({ columns = [], data = [] }) => {
    return (
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No data found.
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col.key}>{row[col.dataIndex]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
      