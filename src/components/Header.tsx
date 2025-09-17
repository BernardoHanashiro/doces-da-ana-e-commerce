import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import logo from '@/assets/logo.png';

interface HeaderProps {
  onCartOpen: () => void;
  onLoginOpen: () => void;
  onProfileOpen: () => void;
  cartItemCount: number;
  favoriteCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ 
  onCartOpen, 
  onLoginOpen, 
  onProfileOpen,
  cartItemCount, 
  favoriteCount,
  searchQuery,
  onSearchChange
}: HeaderProps) {
  const [showFavoriteTip, setShowFavoriteTip] = useState(false);

  return (
    <header className="bg-background border-b shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold bg-gradient-button bg-clip-text text-transparent">
              Doces da Ana
            </span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar doces..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-accent/30 border-accent focus:border-secondary"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCartOpen}
              className="relative hover:bg-accent/50"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Favorites */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowFavoriteTip(true)}
              className="relative hover:bg-accent/50"
            >
              <Heart className="h-5 w-5" />
              {favoriteCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-sweet-pink">
                  {favoriteCount}
                </Badge>
              )}
            </Button>

            {/* Profile */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onProfileOpen}
              className="hover:bg-accent/50"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar doces..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-accent/30 border-accent focus:border-secondary"
            />
          </div>
        </div>
      </div>

      {/* Favorites Tip Dialog */}
      <Dialog open={showFavoriteTip} onOpenChange={setShowFavoriteTip}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sweet-pink">
              <Heart className="h-5 w-5" />
              Salvar favoritos
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Clique no coração dos produtos para salvá-los como favoritos e encontrá-los facilmente depois!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}