import BandwidthOptimizer from '../components/settings/BandwidthOptimizer';

export default function Settings() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Performance Settings</h1>
        <p className="text-gray-400">Optimize bandwidth and system performance</p>
      </div>

      <BandwidthOptimizer />
    </div>
  );
}
