import { WalletConnect } from "@/components/WalletConnect";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Hero section */}
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                Web3 Wallet
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Connect
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-sm mx-auto">
              Connect your favorite wallet to start interacting with decentralized applications
            </p>
          </div>

          {/* Wallet connection component */}
          <WalletConnect />

          {/* Footer info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by WalletConnect & Wagmi</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
    </div>
  );
};

export default Index;
