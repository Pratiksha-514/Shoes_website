import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
                    <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
                        <p className="text-gray-500 dark:text-gray-300 mb-6">
                            We're sorry, but an error occurred while loading this page.
                        </p>
                        {this.state.error && (
                            <details className="text-left bg-gray-50 dark:bg-gray-900 p-4 rounded text-xs text-gray-700 dark:text-gray-300 overflow-auto max-h-40 mb-6 border border-gray-100 dark:border-gray-700">
                                <summary className="cursor-pointer font-medium mb-2 text-gray-900 dark:text-white">Error Details</summary>
                                <pre className="whitespace-pre-wrap">{this.state.error.toString()}</pre>
                                <br />
                                <pre className="whitespace-pre-wrap">{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                            </details>
                        )}
                        <button
                            onClick={() => {
                                this.setState({ hasError: false });
                                window.location.reload();
                            }}
                            className="bg-gray-900 dark:bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-pink-700 transition transform hover:scale-105 shadow-md"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
