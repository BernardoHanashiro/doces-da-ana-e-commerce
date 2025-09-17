import React, { useState } from 'react';
import { HelpCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import logo from '@/assets/logo.png';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Auth({ isOpen, onClose }: AuthProps) {
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
    // Authentication logic will be implemented with Supabase
    alert(`${isLogin ? 'Login' : 'Cadastro'} será implementado com Supabase!`);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-0 bg-gradient-auth border-0 overflow-hidden">
          <div className="relative min-h-[500px] flex items-center justify-center p-6">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute top-1/2 right-20 w-12 h-12 bg-white rounded-full"></div>
            </div>

            <Card className="w-full bg-background/95 backdrop-blur shadow-soft border-0">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4">
                  <img src={logo} alt="Logo" className="h-16 w-16 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-button bg-clip-text text-transparent">
                  Doces da Ana
                </h2>
                <p className="text-muted-foreground">
                  {isLogin 
                    ? 'Entre na sua conta e descubra um mundo de doces' 
                    : 'Crie sua conta e comece a explorar nossos doces'
                  }
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
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

                  <Button type="submit" variant="auth" size="lg" className="w-full">
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
                    onClick={() => setIsLogin(!isLogin)}
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
          </div>
        </DialogContent>
      </Dialog>

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
    </>
  );
}