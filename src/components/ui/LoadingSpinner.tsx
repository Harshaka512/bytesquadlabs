export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center p-12">
      <div className="spinner mb-4"></div>
      <span className="text-text-secondary animate-pulse-slow">Loading...</span>
    </div>
  );
}
