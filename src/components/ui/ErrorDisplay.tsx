interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
      <div className="text-6xl mb-4 animate-float">⚠️</div>
      <h3 className="text-xl font-bold text-text-primary mb-2">Something went wrong</h3>
      <p className="text-text-secondary mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
