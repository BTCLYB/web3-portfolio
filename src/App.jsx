import { useEffect, useState } from 'react';

function Badge({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/15">
      {children}
    </span>
  );
}

export default function App() {
  const [btc, setBtc] = useState(null);

  async function fetchPrice() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
      const data = await res.json();
      setBtc({
        price: data.bitcoin.usd,
        change: data.bitcoin.usd_24h_change,
      });
    } catch (e) {
      console.log('行情获取失败', e);
    }
  }

  useEffect(() => {
    fetchPrice();
    const t = setInterval(fetchPrice, 30000);
    return () => clearInterval(t);
  }, []);

  const changeClass = btc?.change >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <main className="relative min-h-screen text-white px-6 py-14 flex flex-col items-center">
      {/* Tech grid layer */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Container */}
      <div className="relative z-10 max-w-4xl w-full space-y-10 fade-in">
        {/* Hero */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-purple-200">zk</h1>
          <p className="opacity-90">Crypto Trader | Focus on Airdrops & DeFi</p>
        </header>

        {/* BTC Card */}
        <section className="neon-soft rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">BTC Market</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div className="text-center">
              <p className="text-sm opacity-70 mb-1">Price</p>
              <p className="text-3xl font-bold">{btc ? `$${btc.price.toLocaleString()}` : '--'}</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-70 mb-1">24h Change</p>
              <p className={`text-2xl font-semibold ${changeClass}`}>{btc ? `${btc.change.toFixed(2)}%` : ''}</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-70 mb-2">Updated</p>
              <p className="opacity-80 text-sm">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </section>

        {/* Airdrop Achievements */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Airdrop Achievements</h2>
          <div className="flex flex-wrap gap-3">
            <Badge>OP ✅</Badge>
            <Badge>ARB ✅</Badge>
            <Badge>Linea ✅</Badge>
          </div>
        </section>

        {/* Tools */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <a className="btn text-center" href="https://debank.com/" target="_blank" rel="noreferrer">DeBank</a>
            <a className="btn text-center" href="https://dexscreener.com/" target="_blank" rel="noreferrer">Dexscreener</a>
            <a className="btn text-center" href="https://solscan.io/" target="_blank" rel="noreferrer">Solscan</a>
            <a className="btn text-center" href="https://www.okx.com/" target="_blank" rel="noreferrer">OKX</a>
            <a className="btn text-center" href="https://www.binance.com/" target="_blank" rel="noreferrer">Binance</a>
          </div>
        </section>

        {/* TradingView BTC Chart */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-0 md:p-0 overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4">BTC Chart</h2>
          </div>
          <div className="h-[420px] w-full">
            <iframe
              title="BTCUSDT Chart"
              src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_123&symbol=BINANCE%3ABTCUSDT&interval=60&hidesidetoolbar=1&hidetoptoolbar=1&symboledit=1&saveimage=0&toolbarbg=rgba(0,0,0,1)&studies=[]&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&allow_symbol_change=1&hideideas=1"
              style={{ width: '100%', height: '100%', border: '0' }}
              loading="lazy"
            ></iframe>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <div className="flex items-center justify-center gap-4">
            <a className="btn" href="mailto:btclyb@gmail.com">📩 Email</a>
            <a className="btn" href="https://t.me/btclyb" target="_blank" rel="noreferrer">🚀 Telegram</a>
          </div>
        </section>

        <footer className="opacity-60 text-sm text-center pt-2 pb-4">
          © {new Date().getFullYear()} zk — Less is more.
        </footer>
      </div>
    </main>
  );
}
