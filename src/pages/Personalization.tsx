import { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';

const Personalization = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto min-h-screen p-8">
      <h1 className="mb-8 text-4xl font-bold">Personnalisation</h1>
      <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
        <p className="text-gray-600">Content coming soon...</p>
      </div>
    </div>
  );
};

export default Personalization;