import React, { useState } from 'react';
import { ShoppingCart, X, Minus, Plus, Trash2, CreditCard, Smartphone, Landmark, QrCode, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const { toast } = useToast();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const paymentMethods = [
    { id: 'pix', name: 'PIX', icon: QrCode, description: 'Pagamento instantâneo' },
    { id: 'credit', name: 'Cartão de Crédito', icon: CreditCard, description: 'Até 12x sem juros' },
    { id: 'debit', name: 'Cartão de Débito', icon: Smartphone, description: 'À vista' },
    { id: 'boleto', name: 'Boleto', icon: Landmark, description: 'Vencimento em 3 dias' }
  ];

  const handleFinalizePurchase = () => {
    if (selectedPayment) {
      const method = paymentMethods.find(m => m.id === selectedPayment);
      toast({
        title: "Pedido confirmado!",
        description: `Pagamento via ${method?.name} será processado.`,
      });
      setShowPayment(false);
      setSelectedPayment('');
      onClose();
    }
  };

  const handleBack = () => {
    setShowPayment(false);
    setSelectedPayment('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {showPayment && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -ml-2"
                onClick={handleBack}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <ShoppingCart className="h-5 w-5 text-primary" />
            {showPayment ? 'Método de Pagamento' : 'Carrinho de Compras'}
            {!showPayment && itemCount > 0 && (
              <Badge className="bg-primary text-primary-foreground">
                {itemCount} {itemCount === 1 ? 'item' : 'itens'}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {showPayment ? (
            <div className="space-y-4">
              <p className="text-muted-foreground mb-6">
                Escolha o método de pagamento preferido:
              </p>
              
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPayment === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedPayment === method.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{method.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                      {selectedPayment === method.id && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted rounded-full p-4 mb-4">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-muted-foreground mb-6">
                Adicione alguns doces deliciosos para começar!
              </p>
              <Button variant="sweet" onClick={onClose}>
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gradient-card rounded-lg shadow-card">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {item.name}
                    </h4>
                    <p className="text-primary font-semibold">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="min-w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-6 space-y-4">
            <Separator />
            
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-primary">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {showPayment ? (
              <div className="space-y-2">
                <Button 
                  variant="sweet" 
                  size="lg" 
                  className="w-full"
                  disabled={!selectedPayment}
                  onClick={handleFinalizePurchase}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Confirmar Pedido
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={handleBack}
                >
                  Voltar ao Carrinho
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button 
                  variant="sweet" 
                  size="lg" 
                  className="w-full"
                  onClick={() => setShowPayment(true)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Finalizar Compra
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={onClose}
                >
                  Continuar Comprando
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}