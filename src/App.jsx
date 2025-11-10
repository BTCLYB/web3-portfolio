
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState('zh');
  return (
    <main className="text-white">
      <h1>Web3 Portfolio Works</h1>
    </main>
  );
}
