import { useSelector } from 'react-redux';

const Dashboard = () => {
  const products = useSelector((state) => state.products.products);
  const totalStock = products.reduce((sum, item) => sum + Number(item.stock), 0);
  const totalProducts = products.length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-primary text-primary-content p-4">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-3xl">{totalProducts}</p>
        </div>

        <div className="card bg-secondary text-secondary-content p-4">
          <h2 className="text-lg font-semibold">Total Stock</h2>
          <p className="text-3xl">{totalStock}</p>
        </div>

        <div className="card bg-accent text-accent-content p-4">
          <h2 className="text-lg font-semibold">Low Stock Alerts</h2>
          <p className="text-3xl">
            {products.filter((item) => item.stock < 10).length}
          </p>
        </div>

        <div className="card bg-neutral text-neutral-content p-4">
          <h2 className="text-lg font-semibold">Placeholder Metric</h2>
          <p className="text-3xl">123</p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sales / Stock Chart (Coming Soon)</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
