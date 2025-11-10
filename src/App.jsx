import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function Portfolio() {
  const [lang, setLang] = useState('zh');

  const t = {
    zh: {
      title: 'zk',
      subtitle: 'Web3 投资者 / 空投玩家',
      about: '实战玩家，专注二级市场、空投策略、DeFi。',
      results: '战绩',
      tools: '工具',
      notes: '10秒理解：我对今天市场的一句话',
      contact: '联系',
      email: '邮箱',
      telegram: '电报'
    },
    en: {
      title: 'zk',
      subtitle: 'Web3 Investor / Airdrop Hunter',
      about: 'Hands-on player focusing on secondary market, airdrops and DeFi.',
      results: 'Results',
      tools: 'Tools',
      notes: '10s Insight: My take on today’s market',
      contact: 'Contact',
      email: 'Email',
      telegram: 'Telegram'
    }
  };

  const L = t[lang];

  const [prices, setPrices] = useState({
    btc: null,
    eth: null,
  });

  const fetchPrices = async () => {
    try {
      const url =
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true";

      const res = await fetch(url);
      const data = await res.json();
      setPrices({
        btc: {
          price: data.bitcoin.usd,
          change: data.bitcoin.usd_24h_change,
        },
        eth: {
          price: data.ethereum.usd,
          change: data.ethereum.usd_24h_change,
        },
      });
    } catch (err) {
      console.log("行情获取失败:", err);
    }
  };

  useEffect(() => {
    fetchPrices();
    const timer = setInterval(fetchPrices, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className=\"relative min-h-screen bg-black text-white flex items-center justify-center px-6 py-20\">
      {/* Tech Background */}
      <div className=\"pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25),rgba(0,0,0,0))]\" />
      <div className=\"pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]\" />
      <div className=\"pointer-events-none absolute inset-0 opacity-20\" style={{backgroundImage:\"url('https://grainy-gradients.vercel.app/noise.svg')\"}} />

      {/* Language Switch */}
      <button className=\"absolute top-6 right-6 text-xs px-3 py-1 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 transition\"
        onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}>
        {lang === 'zh' ? 'EN' : '中文'}
      </button>

      <div className=\"relative z-10 max-w-2xl w-full text-center space-y-10\">
        {/* Hero Section Animated */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=\"space-y-3\">
          <motion.h1
            className=\"text-5xl font-bold tracking-tight text-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]\"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}>
            {L.title}
          </motion.h1>
          <motion.p
            className=\"text-lg opacity-80\"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}>
            {L.subtitle}
          </motion.p>
        </motion.header>

        {/* ===== Market ===== */}
        <section className=\"bg-white/5 border border-white/10 rounded-2xl p-6 transition hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]\">
          <h2 className=\"text-xl font-semibold mb-4\">Market</h2>
          <div className=\"grid grid-cols-2 gap-4\">

            {/* ===== BTC ===== */}
            <div className=\"flex flex-col items-center\">
              <p className=\"text-lg font-semibold text-yellow-400\">BTC</p>

              <AnimatePresence mode=\"popLayout\">
                <motion.p
                  key={prices.btc?.price}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className=\"text-2xl font-bold\">
                  {prices.btc?.price ? `$${prices.btc.price.toLocaleString()}` : "--"}
                </motion.p>
              </AnimatePresence>

              <motion.p
                key={prices.btc?.change}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={\`text-sm \${prices.btc?.change >= 0 ? "text-green-400" : "text-red-400"}\`}>
                {prices.btc ? prices.btc.change.toFixed(2) + "%" : ""}
              </motion.p>
            </div>

            {/* ===== ETH ===== */}
            <div className=\"flex flex-col items-center\">
              <p className=\"text-lg font-semibold text-blue-400\">ETH</p>

              <AnimatePresence mode=\"popLayout\">
                <motion.p
                  key={prices.eth?.price}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className=\"text-2xl font-bold\">
                  {prices.eth?.price ? `$${prices.eth.price.toLocaleString()}` : "--"}
                </motion.p>
              </AnimatePresence>

              <motion.p
                key={prices.eth?.change}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={\`text-sm \${prices.eth?.change >= 0 ? "text-green-400" : "text-red-400"}\`}>
                {prices.eth ? prices.eth.change.toFixed(2) + "%" : ""}
              </motion.p>
            </div>
          </div>
        </section>

        {/* About */}
        <section className=\"bg-white/5 border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition\">
          <h2 className=\"text-xl font-semibold mb-2\">About</h2>
          <p className=\"opacity-80 leading-relaxed\">{L.about}</p>
        </section>

        {/* Results */}
        <section className=\"bg-white/5 border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition\">
          <h2 className=\"text-xl font-semibold mb-2\">{L.results}</h2>
          <ul className=\"opacity-90 space-y-1 list-disc list-inside\">
            <li>2023 OP Airdrop ✅</li>
            <li>2024 ARB Airdrop ✅</li>
            <li>2025 Linea Airdrop ✅</li>
          </ul>
        </section>

        {/* Tools */}
        <section className=\"bg-white/5 border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition\">
          <h2 className=\"text-xl font-semibold mb-2\">{L.tools}</h2>
          <p className=\"opacity-80\">我在用的工具（钱包 / 资讯 / 数据）</p>
        </section>

        {/* Notes */}
        <section className=\"bg-white/5 border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition\">
          <h2 className=\"text-xl font-semibold mb-2\">Notes</h2>
          <p className=\"opacity-80\">{L.notes}</p>
        </section>

        {/* Contact */}
        <section className=\"bg-white/5 border border-white/10 rounded-2xl p-6 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition\">
          <h2 className=\"text-xl font-semibold mb-4\">{L.contact}</h2>
          <div className=\"flex items-center justify-center gap-4\">
            <a
              href=\"mailto:btclyb@gmail.com\"
              className=\"flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition\">
              <Mail size={18} /> {L.email}
            </a>
            <a
              href=\"https://t.me/btclyb\"
              target=\"_blank\"
              rel=\"noreferrer\"
              className=\"flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition\">
              <Send size={18} /> {L.telegram}
            </a>
          </div>
        </section>

        <footer className=\"pt-4 opacity-60 text-sm text-center\">
          少即是多，信息本质就是优势。
        </footer>
      </div>
    </main>
  );
}
