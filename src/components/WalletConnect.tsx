import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, LogOut, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnect = async (connector: any) => {
    try {
      setIsConnecting(true);
      connect({ connector });
      toast({
        title: "Connecting wallet...",
        description: "Please check your wallet app for the connection request.",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been successfully disconnected.",
    });
  };

  if (isConnected && address) {
    return (
      <Card className="p-6 bg-gradient-secondary border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Connected</p>
              <p className="font-mono text-lg font-semibold">{formatAddress(address)}</p>
            </div>
          </div>
          <Button variant="web3" size="sm" onClick={handleDisconnect}>
            <LogOut className="h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-secondary border-primary/20">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Wallet className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground">
              Choose a wallet to connect to this dApp
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {connectors.map((connector) => (
          <Button
            key={connector.uid}
            variant="web3"
            size="lg"
            onClick={() => handleConnect(connector)}
            disabled={isPending || isConnecting}
            className="w-full justify-start text-left"
          >
            <Wallet className="h-5 w-5" />
            <span className="flex-1">
              {connector.name}
              {isPending && " (connecting...)"}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}