
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, User, Crown, Award, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserLevel } from '@/hooks/useUserLevel';
import { AuthModal } from './AuthModal';

const levelConfig = {
  padrao: { label: 'Padrão', color: 'bg-red-100 text-red-800', icon: User },
  qualidade: { label: 'Qualidade', color: 'bg-yellow-100 text-yellow-800', icon: Award },
  excelencia: { label: 'Excelência', color: 'bg-green-100 text-green-800', icon: Crown }
};

export const AuthButton = () => {
  const { user, profile, signOut } = useAuth();
  const { userLevel, loading } = useUserLevel();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!user) {
    return (
      <>
        <Button onClick={() => setShowAuthModal(true)}>
          Entrar
        </Button>
        <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      </>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const levelInfo = levelConfig[userLevel];
  const LevelIcon = levelInfo.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {profile?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="flex-col items-start">
          <p className="text-sm font-medium">{profile?.name || 'Usuário'}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuItem>
        
        {!loading && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between">
              <span className="text-sm">Nível de Acesso:</span>
              <Badge className={levelInfo.color}>
                <LevelIcon className="h-3 w-3 mr-1" />
                {levelInfo.label}
              </Badge>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
