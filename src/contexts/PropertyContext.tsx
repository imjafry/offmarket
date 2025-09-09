import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property } from '@/components/PropertyCard';
import { mockProperties as initialProperties } from '@/data/mockProperties';

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getProperty: (id: string) => Property | undefined;
  incrementViews: (id: string) => void;
  incrementInquiries: (id: string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);

  // Load properties from localStorage on mount, fallback to mock data
  useEffect(() => {
    const savedProperties = localStorage.getItem('offmarket_properties');
    if (savedProperties) {
      try {
        setProperties(JSON.parse(savedProperties));
      } catch (error) {
        console.error('Error loading properties from localStorage:', error);
        setProperties(initialProperties);
      }
    } else {
      setProperties(initialProperties);
      // Save initial properties to localStorage
      localStorage.setItem('offmarket_properties', JSON.stringify(initialProperties));
    }
  }, []);

  // Save properties to localStorage whenever properties change
  useEffect(() => {
    if (properties.length > 0) {
      localStorage.setItem('offmarket_properties', JSON.stringify(properties));
    }
  }, [properties]);

  const addProperty = (propertyData: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(), // Simple ID generation
      views: 0,
      inquiries: 0,
    };
    setProperties(prev => [newProperty, ...prev]);
  };

  const updateProperty = (id: string, propertyData: Partial<Property>) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === id 
          ? { ...property, ...propertyData }
          : property
      )
    );
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(property => property.id !== id));
  };

  const getProperty = (id: string) => {
    return properties.find(property => property.id === id);
  };

  const incrementViews = (id: string) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === id 
          ? { ...property, views: (property.views || 0) + 1 }
          : property
      )
    );
  };

  const incrementInquiries = (id: string) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === id 
          ? { ...property, inquiries: (property.inquiries || 0) + 1 }
          : property
      )
    );
  };

  const value: PropertyContextType = {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    getProperty,
    incrementViews,
    incrementInquiries,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
