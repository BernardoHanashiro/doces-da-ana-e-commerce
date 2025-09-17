import React, { useState } from 'react';
import { HelpCircle, Eye, EyeOff, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

const Index = () => {
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    // Simulate login/register success
    toast({
      title: isLogin ? "Login realizado!" : "Conta criada!",
      description: isLogin 
        ? "Bem-vindo(a) de volta à Doces da Ana!" 
        : "Sua conta foi criada com sucesso!",
    });
    
    // Redirect to shop after 1 second
    setTimeout(() => {
      window.location.href = '/loja';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-auth flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-32 w-20 h-20 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 left-32 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-32 left-1/2 w-12 h-12 bg-white rounded-full animate-pulse delay-1500"></div>
      </div>

      <Card className="w-full max-w-md bg-background/95 backdrop-blur shadow-soft border-0 relative z-10">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4">
            <img src={logo} alt="Doces da Ana" className="h-20 w-20 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-button bg-clip-text text-transparent">
            Doces da Ana
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? 'Entre na sua conta e descubra um mundo de doces' 
              : 'Crie sua conta e comece a explorar nossos doces'
            }
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="bg-accent/30 border-accent focus:border-secondary"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-accent/30 border-accent focus:border-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-accent/30 border-accent focus:border-secondary pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="bg-accent/30 border-accent focus:border-secondary pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            <Button type="submit" variant="sweet" size="lg" className="w-full">
              <Heart className="h-4 w-4 mr-2" />
              {isLogin ? 'Entrar na Doces da Ana' : 'Criar Conta Grátis'}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-muted-foreground">
              {isLogin ? 'Primeira vez aqui? ' : 'Já tem uma conta? '}
            </span>
            <Button
              variant="link"
              className="p-0 h-auto text-secondary font-medium"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
              }}
            >
              {isLogin ? 'Criar conta grátis' : 'Fazer login'}
            </Button>
          </div>

          {isLogin && (
            <>
              <Separator />
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-secondary"
                onClick={() => setShowHelp(true)}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Precisa de ajuda?
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Help Dialog */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-secondary">Como podemos ajudar?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-semibold mb-2">Problemas para entrar?</h4>
              <p className="text-sm text-muted-foreground">
                Verifique se seu email e senha estão corretos. Se esqueceu sua senha, entre em contato conosco.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Criar nova conta</h4>
              <p className="text-sm text-muted-foreground">
                Clique em "Criar conta grátis" para se registrar e começar a comprar nossos deliciosos doces!
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Suporte</h4>
              <p className="text-sm text-muted-foreground">
                Email: ajuda@docesdaana.com.br<br />
                WhatsApp: (11) 99999-9999
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
