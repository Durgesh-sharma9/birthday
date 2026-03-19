import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Bmain() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(3);
  const [showGirl, setShowGirl] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [wishIndex, setWishIndex] = useState(null);
  const [hearts, setHearts] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const audioRef = useRef(null);

  const startMusic = () => {
    audioRef.current?.play().catch(() => {});
    setPage(2);
  };

  useEffect(() => {
    if (page === 2 && count > 0) {
      const t = setTimeout(() => setCount((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
    if (page === 2 && count === 0) {
      setTimeout(() => setPage(3), 1000);
    }
  }, [page, count]);

  const spawnHearts = () => {
    const batch = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i,
      size: ["text-xl", "text-2xl", "text-4xl"][i],
      left: Math.random() * 90,
    }));
    setHearts((prev) => [...prev, ...batch]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !batch.find((b) => b.id === h.id)));
    }, 2500);
  };

  const spawnConfetti = () => {
    const batch = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      size: ["text-xl", "text-2xl", "text-3xl"][i % 3],
      left: Math.random() * 90,
    }));
    setConfetti((prev) => [...prev, ...batch]);
    setTimeout(() => {
      setConfetti((prev) => prev.filter((c) => !batch.find((b) => b.id === c.id)));
    }, 2500);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-300 via-rose-300 to-purple-400 text-white font-[cursive] overflow-hidden">

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* PAGE 1 */}
      {page === 1 && (
        <div className="text-center">
          <motion.h1 animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl font-bold">
            Something Special is Loading... ✨
          </motion.h1>
          <button onClick={startMusic} className="mt-10 px-6 py-3 bg-white text-pink-500 rounded-full shadow-lg">Click to Begin 💖</button>
        </div>
      )}

      {/* PAGE 2 */}
      {page === 2 && (
        <div className="text-center">
          <h1 className="text-5xl font-bold">Your Special Day is Here 🎉</h1>
          <div className="mt-8 text-8xl">{count > 0 ? count : "🎂"}</div>
        </div>
      )}

      {/* PAGE 3 */}
      {page === 3 && (
        <div className="text-center">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-[180px]">🎂</motion.div>
          <button onClick={() => setPage(4)} className="mt-10 px-6 py-3 bg-pink-500 rounded-full shadow-lg">Open Your Gift 🎁</button>
        </div>
      )}

      {/* PAGE 4 */}
      {page === 4 && (
        <div className="text-center bg-white/20 p-8 rounded-3xl shadow-2xl max-w-md">
          <h2 className="text-4xl">A Message for You 💌</h2>
          <p className="mt-4">You make the world brighter ✨</p>
          <button onClick={() => setPage(5)} className="mt-6 bg-pink-500 px-5 py-2 rounded-full shadow">One Last Surprise 🎁</button>
        </div>
      )}

      {/* PAGE 5 */}
      {page === 5 && (
        <div className="text-center">
          <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-[200px]">🎂</motion.div>
          <p>Click on Cake 🎂</p>
          <div className="absolute inset-0" onClick={() => setPage(6)} />
        </div>
      )}

      {/* PAGE 6 */}
      {page === 6 && (
        <div className="w-full h-full flex justify-center items-start overflow-y-auto">
          <div className="max-w-md w-full space-y-6 p-4">

            {/* SECTION 1 */}
            <div className="bg-white/20 p-6 rounded-2xl shadow-xl text-center">
              <div className="text-[100px]">🎂</div>
              <button onClick={() => setShowGirl(true)} className="bg-pink-500 px-4 py-2 rounded-full shadow">Blow Candle 🕯️</button>
            </div>

            {/* POPUP */}
            <AnimatePresence>
              {showGirl && (
                <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-white text-black p-6 rounded-xl relative text-center">
                    <button onClick={() => setShowGirl(false)} className="absolute top-2 right-2">❌</button>

                    <div className="grid grid-cols-2 gap-3">
                      <img src="/img1.jpeg" className="w-32 h-32 object-cover rounded-lg rotate-[-5deg]" />
                      <img src="/img2.jpeg" className="w-32 h-32 object-cover rounded-lg rotate-[5deg]" />
                      <img src="/img3.jpeg" className="w-32 h-32 object-cover rounded-lg rotate-[-5deg]" />
                      <img src="/img4.jpeg" className="w-32 h-32 object-cover rounded-lg rotate-[5deg]" />
                    </div>

                    <p className="mt-3">You are the most beautiful gift 💖</p>

                    <button
                      onClick={() => {
                        spawnConfetti();
                        setShowGirl(false);
                      }}
                      className="mt-4 bg-pink-500 px-4 py-2 rounded-full"
                    >
                      Celebrate 🎉
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CONFETTI */}
            {confetti.map((c) => (
              <motion.div key={c.id} initial={{ y: -50, opacity: 1 }} animate={{ y: 500, opacity: 0 }} transition={{ duration: 2 }} style={{ position: "absolute", left: `${c.left}%` }} className={c.size}>
                🎉
              </motion.div>
            ))}

            {/* SECTION 2 */}
            <div className="bg-white/20 p-6 rounded-2xl shadow-xl text-center">
              <button onClick={() => setShowMsg(true)}>Birthday Message 💌</button>
            </div>

            <AnimatePresence>
              {showMsg && (
                <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-white text-black p-6 rounded-xl relative">
                    <button onClick={() => setShowMsg(false)} className="absolute top-2 right-2">❌</button>
                    <p>Sending you the warmest birthday wishes for today. I can't be there in person, but I’m cheering you on from here.</p>

                        <p>Wishing you a day filled with the same love, joy, and laughter you bring..</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SECTION 3 */}
            <div className="grid grid-cols-2 gap-4">
              {["Love 💖","Smile 😊","Success 🚀","Joy 🎉"].map((w,i)=>(
                <button key={i} onClick={()=>setWishIndex(i)} className="bg-pink-400 p-5 rounded-xl shadow">{w}</button>
              ))}
            </div>

            <AnimatePresence>
              {wishIndex !== null && (
                <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-white text-black p-6 rounded-xl relative">
                    <button onClick={()=>setWishIndex(null)} className="absolute top-2 right-2">❌</button>
                    <p>{["You are the cutest one I have ever meet.","May you got everything that you want  ❤️","You achieve all your goals . And become successful in life 🤗","Always be happy and in joy mood . Don't be sad in any situation.🎀"][wishIndex]}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SECTION 4 */}
            <div className="bg-white/20 p-6 rounded-2xl shadow-xl text-center">
              <button onClick={spawnHearts} className="bg-red-500 px-6 py-3 rounded-full shadow">❤️ Send Love</button>
            </div>

            {hearts.map((h) => (
              <motion.div key={h.id} initial={{ y: 200, opacity: 1 }} animate={{ y: -200, opacity: 0 }} transition={{ duration: 2 }} style={{ position: "absolute", left: `${h.left}%` }} className={h.size}>
                ❤️
              </motion.div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}
