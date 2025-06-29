import React, { createContext, useContext, useState } from 'react';

const MediacaoContext = createContext(null);

export function MediacaoProvider({ children }) {
  const [mediacao, setMediacao] = useState({});

  const updateMediacao = (newData) => {
    if (typeof newData === 'function') {
      setMediacao(currentData => newData(currentData));
    } else {
      setMediacao(currentData => ({ ...currentData, ...newData }));
    }
  };

  const clearMediacao = () => {
    setMediacao({});
  };

  return (
    <MediacaoContext.Provider value={{ mediacao, updateMediacao, clearMediacao }}>
      {children}
    </MediacaoContext.Provider>
  );
}

export function useMediacaoContext() {
  const context = useContext(MediacaoContext);
  if (!context) {
    throw new Error('useMediacaoContext must be used within a MediacaoProvider');
  }
  return context;
}
