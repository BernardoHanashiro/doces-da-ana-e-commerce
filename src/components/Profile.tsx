import React, { useState } from 'react';
import { User, LogOut, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function Profile({ isOpen, onClose, onLogout }: ProfileProps) {
  const [profileData, setProfileData] = useState({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    birthDate: '1990-01-01'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    alert('Perfil será salvo com Supabase!');
  };

  const mockOrders = [
    {
      id: '001',
      date: '2024-01-15',
      total: 45.90,
      status: 'Entregue',
      items: 3
    },
    {
      id: '002', 
      date: '2024-01-10',
      total: 32.50,
      status: 'Em trânsito',
      items: 2
    }
  ];

  const mockFavorites = [
    {
      id: '1',
      name: 'Trufas Gourmet',
      price: 24.90,
      image: '/api/placeholder/100/100'
    },
    {
      id: '2',
      name: 'Macarons Franceses', 
      price: 32.90,
      image: '/api/placeholder/100/100'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Meu Perfil
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-button text-white text-xl font-semibold">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground">{profileData.email}</p>
              <Button
                variant="link"
                className="p-0 h-auto text-destructive hover:text-destructive/80"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair da Conta
              </Button>
            </div>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="addresses">Endereços</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="favorites">Favoritos</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="bg-accent/30 border-accent focus:border-secondary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="bg-accent/30 border-accent focus:border-secondary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="bg-accent/30 border-accent focus:border-secondary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Data de nascimento</Label>
                      <Input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={profileData.birthDate}
                        onChange={handleInputChange}
                        className="bg-accent/30 border-accent focus:border-secondary"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="sweet" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Endereços de Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Nenhum endereço cadastrado ainda.
                    </p>
                    <Button variant="sweet">
                      Adicionar Endereço
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Histórico de Pedidos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg bg-gradient-card">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">Pedido #{order.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Badge 
                          variant={order.status === 'Entregue' ? 'default' : 'secondary'}
                          className={order.status === 'Entregue' ? 'bg-green-500' : 'bg-secondary'}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          {order.items} {order.items === 1 ? 'item' : 'itens'}
                        </p>
                        <p className="font-semibold text-primary">
                          R$ {order.total.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Produtos Favoritos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockFavorites.map((product) => (
                      <div key={product.id} className="flex items-center space-x-3 p-3 border rounded-lg bg-gradient-card">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-primary font-semibold">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <Button variant="cart" size="sm">
                          Comprar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}