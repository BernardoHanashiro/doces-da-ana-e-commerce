import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-4 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "sweet" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`whitespace-nowrap ${
                activeCategory === category 
                  ? 'shadow-button' 
                  : 'hover:bg-accent/50 border-accent'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}