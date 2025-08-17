'use client';

import { useState } from 'react';

export default function DebugPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const timestamp = Date.now();
      const response = await fetch(`/api/blogs?refresh=true&t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      
      const data = await response.json();
      setResult(data);
      console.log('API Response:', data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testDevTo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blogs/test');
      const data = await response.json();
      setResult(data);
      console.log('Dev.to Test Response:', data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
      console.error('Dev.to Test Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Blog API Debug</h1>
      
      <div className="space-y-4 mb-8">
        <button
          onClick={testAPI}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded mr-4"
        >
          {loading ? 'Testing...' : 'Test Blog API'}
        </button>
        
        <button
          onClick={testDevTo}
          disabled={loading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 rounded"
        >
          {loading ? 'Testing...' : 'Test Dev.to API'}
        </button>
      </div>

      {result && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Result:</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
