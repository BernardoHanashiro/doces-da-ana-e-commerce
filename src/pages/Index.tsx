import React, { useState, useMemo } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductCard, Product } from '@/components/ProductCard';
import { Cart, CartItem } from '@/components/Cart';
import { Auth } from '@/components/Auth';
import { Profile } from '@/components/Profile';
import { useToast } from '@/hooks/use-toast';
import heroBackground from '@/assets/hero-background.jpg';
import trufflesImg from '@/assets/truffles.jpg';
import gummyBearsImg from '@/assets/gummy-bears.jpg';
import macaronsImg from '@/assets/macarons.jpg';
import brigadeirosImg from '@/assets/brigadeiros.jpg';

const Index = () => {
  const { toast } = useToast();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Trufas Gourmet',
      description: 'Deliciosas trufas artesanais com recheios especiais',
      price: 24.90,
      image: trufflesImg,
      category: 'Chocolates',
      rating: 4.8,
      isFavorite: false
    },
    {
      id: '2',
      name: 'Gominhas Coloridas',
      description: 'Gomas de frutas em formato de ursinhos, sabores variados',
      price: 12.50,
      image: gummyBearsImg,
      category: 'Gomas',
      rating: 4.6,
      isFavorite: false
    },
    {
      id: '3',
      name: 'Macarons Franceses',
      description: 'Autênticos macarons franceses com sabores únicos',
      price: 32.90,
      image: macaronsImg,
      category: 'Biscoitos',
      rating: 4.9,
      isFavorite: false
    },
    {
      id: '4',
      name: 'Brigadeiros Gourmet',
      description: 'Brigadeiros artesanais com coberturas especiais',
      price: 18.90,
      image: brigadeirosImg,
      category: 'Doces Brasileiros',
      rating: 4.7,
      isFavorite: false
    }
  ]);

  const categories = ['Todos', 'Chocolates', 'Gomas', 'Biscoitos', 'Doces Brasileiros', 'Balas'];

  // Computed values
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favoriteCount = products.filter(p => p.isFavorite).length;

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (activeCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, activeCategory, searchQuery]);

  // Event handlers
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        }];
      }
    });

    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Produto removido",
      description: "Item removido do carrinho.",
    });
  };

  const handleToggleFavorite = (productId: string) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );

    const product = products.find(p => p.id === productId);
    if (product) {
      toast({
        title: product.isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
        description: `${product.name} ${product.isFavorite ? 'foi removido dos' : 'foi adicionado aos'} seus favoritos.`,
      });
    }
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onCartOpen={() => setIsCartOpen(true)}
        onLoginOpen={() => setIsAuthOpen(true)}
        onProfileOpen={() => setIsProfileOpen(true)}
        cartItemCount={cartItemCount}
        favoriteCount={favoriteCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <section 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-2xl px-4">
            <h1 className="text-5xl font-bold mb-4">Mundo dos Doces</h1>
            <p className="text-xl mb-8 text-white/90">
              Os melhores doces artesanais do Brasil
            </p>
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Star className="h-5 w-5 mr-2" />
              Explorar Produtos
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Products Section */}
      <section id="products" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-2">
              Nossos Produtos
            </h2>
            <p className="text-muted-foreground text-center">
              {searchQuery ? (
                `${filteredProducts.length} resultado${filteredProducts.length !== 1 ? 's' : ''} para "${searchQuery}"`
              ) : (
                `Descubra nossa seleção de doces artesanais`
              )}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                Nenhum produto encontrado
              </p>
              <Button variant="sweet" onClick={() => {
                setSearchQuery('');
                setActiveCategory('Todos');
              }}>
                Ver todos os produtos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Doces da Ana. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Auth
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Index;
