
import { useState } from 'react';
import { Wallet, ExternalLink, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WalletPanelProps {
  coins: number;
}

const WalletPanel = ({ coins }: WalletPanelProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress] = useState('UQBvW8Z5huBkMJYdnfAEM5JqTNkuWX3diqYENkWsIL0XggGG');
  const [copied, setCopied] = useState(false);

  const handleConnect = () => {
    // Simulate wallet connection
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canClaim = coins >= 10000;
  const claimAmount = Math.floor(coins / 1000);

  return (
    <div className="flex-1 p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple p-1 mb-4 animate-glow-pulse">
          <div className="w-full h-full rounded-full bg-dark-future flex items-center justify-center">
            <Wallet className="w-8 h-8 text-neon-cyan" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">TON Wallet</h2>
        <p className="text-gray-subtle">Tokenlaringizni real walletga o'tkazing</p>
      </div>

      {/* Wallet Status */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-neon-cyan/20">
        {!isConnected ? (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-yellow-400">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Wallet ulanmagan</span>
            </div>
            <p className="text-gray-subtle text-sm">
              TON wallet ulang va tokenlaringizni claim qiling
            </p>
            <Button
              onClick={handleConnect}
              className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan text-dark-future font-semibold px-6 py-3 rounded-full transition-all duration-300"
            >
              TON Wallet ulash
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Wallet ulangan</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDisconnect}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                Uzish
              </Button>
            </div>
            
            <div className="bg-dark-future/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-subtle font-mono">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-neon-cyan hover:text-white"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-neon-cyan hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Balance & Claim */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-neon-purple/20">
        <h3 className="text-lg font-bold text-white mb-4">Token Balance</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 rounded-lg">
            <div>
              <div className="text-sm text-gray-subtle">Game Coins</div>
              <div className="text-2xl font-bold gradient-text">{coins.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-subtle">Claim miqdori</div>
              <div className="text-xl font-bold text-neon-cyan">{claimAmount} FUT</div>
            </div>
          </div>

          <div className="text-center">
            {canClaim ? (
              <Button
                className="bg-gradient-to-r from-green-400 to-neon-cyan hover:from-neon-cyan hover:to-green-400 text-dark-future font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                disabled={!isConnected}
              >
                {claimAmount} FUT Claim qilish
              </Button>
            ) : (
              <div className="text-center">
                <div className="text-red-400 font-medium mb-2">
                  Minimum 10,000 coin kerak
                </div>
                <div className="text-gray-subtle text-sm">
                  Yana {(10000 - coins).toLocaleString()} coin yig'ing
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-neon-cyan/10">
        <h4 className="text-sm font-medium text-white mb-2">Ma'lumot</h4>
        <ul className="text-xs text-gray-subtle space-y-1">
          <li>• 1000 game coin = 1 FUT token</li>
          <li>• Minimum claim: 10,000 coin</li>
          <li>• TON network commission: ~0.05 TON</li>
          <li>• Tokenlar 24 soat ichida yetkaziladi</li>
        </ul>
      </div>
    </div>
  );
};

export default WalletPanel;
