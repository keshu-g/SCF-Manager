const ImportExport = () => {
  const handleImport = () => {
    alert('Import functionality coming soon!');
  };

  const handleExport = () => {
    alert('Export functionality coming soon!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Import / Export</h1>

      <div className="flex gap-4">
        <button className="btn btn-primary" onClick={handleImport}>
          Import CSV
        </button>

        <button className="btn btn-secondary" onClick={handleExport}>
          Export CSV
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Import Instructions</h2>
        <ul className="list-disc list-inside text-sm mt-2">
          <li>CSV file must include: name, stock, price</li>
          <li>Ensure stock and price are numbers</li>
        </ul>
      </div>
    </div>
  );
};

export default ImportExport;
