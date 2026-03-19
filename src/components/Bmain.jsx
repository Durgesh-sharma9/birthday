import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Bmain() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(3);
  const [showMsg, setShowMsg] = useState(false);
  const [wishIndex, setWishIndex] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

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

  // 🎥 VIDEO + MUSIC CONTROL
  useEffect(() => {
    if (page !== 3) {
      audioRef.current?.play().catch(() => {});
      videoRef.current?.pause();
    }
  }, [page]);

  // ❤️ HEARTS
  const spawnHearts = () => {
    const batch = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i,
      size: ["text-xl", "text-2xl", "text-4xl"][i],
      left: Math.random() * 90,
    }));

    setHearts((prev) => [...prev, ...batch]);

    setTimeout(() => {
      setHearts((prev) =>
        prev.filter((h) => !batch.find((b) => b.id === h.id))
      );
    }, 2500);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-300 via-rose-300 to-purple-400 text-white font-[cursive] overflow-hidden">

      {/* MUSIC */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* PAGE 1 */}
      {page === 1 && (
        <div className="text-center">
          <motion.h1 animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl font-bold">
            Something Special is Loading... ✨
          </motion.h1>

          <button onClick={startMusic} className="mt-10 px-6 py-3 bg-white text-pink-500 rounded-full shadow-lg">
            Click to Begin 💖
          </button>
        </div>
      )}

      {/* PAGE 2 */}
      {page === 2 && (
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            let's celebrate your precious day 🫶🏻🎀🎂🎉
          </h1>
          <div className="mt-8 text-8xl">{count > 0 ? count : "🎂"}</div>
        </div>
      )}

      {/* PAGE 3 */}
      {page === 3 && (
        <div className="text-center space-y-6">

          <div className="w-full rounded-2xl overflow-hidden shadow-xl">
            <video
              ref={videoRef}
              autoPlay
              loop
              className="w-full h-48 object-cover"
              onPlay={() => audioRef.current?.pause()}
            >
              <source src="/celebrate.mp4" type="video/mp4" />
            </video>
          </div>

          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-[180px]">
            🎂
          </motion.div>

          <button onClick={() => setPage(4)} className="px-6 py-3 bg-pink-500 rounded-full shadow-lg">
            Open Your Gift 🎁
          </button>
        </div>
      )}

      {/* PAGE 4 */}
      {page === 4 && (
        <div className="text-center bg-white/20 p-8 rounded-3xl shadow-2xl max-w-md">
          <h2 className="text-4xl">A Message for You 💌</h2>
          <p className="mt-4">You make the world brighter ✨</p>

          <button onClick={() => setPage(5)} className="mt-6 bg-pink-500 px-5 py-2 rounded-full shadow">
            One Last Surprise 🎁
          </button>
        </div>
      )}

      {/* PAGE 5 */}
      {page === 5 && (
        <div className="text-center">
          <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-[200px]">
            🎂
          </motion.div>
          <p>Click on Cake 🎂</p>
          <div className="absolute inset-0" onClick={() => setPage(6)} />
        </div>
      )}

      {/* PAGE 6 */}
      {page === 6 && (
        <div className="w-full h-full flex justify-center items-start overflow-y-auto">
          <div className="max-w-md w-full space-y-6 p-4">

            {/* GALLERY */}
            <div className="bg-white/20 p-6 rounded-2xl shadow-xl text-center">
              <button onClick={() => setShowGallery(true)} className="bg-pink-500 px-6 py-3 rounded-full shadow">
                📸 Open Gallery
              </button>
            </div>

            <AnimatePresence>
              {showGallery && (
                <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded-xl relative">

                    {/* FIXED CROSS */}
                    <button
                      onClick={() => setShowGallery(false)}
                      className="absolute top-2 right-2 z-[100] bg-red-500 text-white px-3 py-1 rounded-full shadow-lg"
                    >
                      ✖
                    </button>

                    <div className="overflow-hidden w-72 h-52 rounded-lg">
                      <motion.div
                        className="flex"
                        animate={{ x: [0, -288, -576, -864, -1152, -1440, 0] }}
                        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                      >
                        {["/img1.jpeg","/img2.jpeg","/img3.jpeg","/img4.jpeg","/img5.jpeg","/img6.jpeg"].map((src,i)=>(
                          <img key={i} src={src} className="w-72 h-52 object-cover flex-shrink-0"/>
                        ))}
                      </motion.div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MESSAGE */}
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

            {/* WISH */}
            <div className="grid grid-cols-2 gap-4">
              {["Love 💖","Smile 😊","Success 🚀","Joy 🎉"].map((w,i)=>(
                <button key={i} onClick={()=>setWishIndex(i)} className="bg-pink-400 p-5 rounded-xl shadow">
                  {w}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {wishIndex !== null && (
                <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-white text-black p-6 rounded-xl relative">
                    <button onClick={()=>setWishIndex(null)} className="absolute top-2 right-2">❌</button>
                    <p>
                      {[
                        "You are the cutest one I have ever meet .",
                        "May you got everything that you want ❤️",
                        "You achieve all your goals . And become successful in life 🤗",
                        "Always be happy and in joy mood . Don't be sad in any situation.🎀"
                      ][wishIndex]}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SEND LOVE */}
            <div className="bg-white/20 p-6 rounded-2xl shadow-xl text-center">
              <button onClick={spawnHearts} className="bg-red-500 px-6 py-3 rounded-full shadow">
                ❤️ Send Love
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ❤️ FIXED HEART LAYER (BOTTOM → TOP) */}
<div className="fixed inset-0 pointer-events-none overflow-hidden">
  {hearts.map((h) => (
    <motion.div
      key={h.id}
      initial={{ y: "100vh", opacity: 1 }}   // 👈 start from bottom
      animate={{ y: "-20vh", opacity: 0 }}   // 👈 go above screen
      transition={{ duration: 2, ease: "easeOut" }}
      style={{ position: "absolute", left: `${h.left}%` }}
      className={h.size}
    >
      ❤️
    </motion.div>
  ))}
</div>
{/* 🎈 BALLOONS */}
<div className="fixed bottom-0 left-0 w-full pointer-events-none">
  {[1, 2, 3, 4, 5].map((i) => (
    <motion.div
      key={i}
      initial={{ y: 100, opacity: 1 }}
      animate={{ y: -600, opacity: 0 }}
      transition={{
        duration: 6 + Math.random() * 3,
        repeat: Infinity,
        delay: i * 0.5,
      }}
      style={{
        position: "absolute",
        left: `${Math.random() * 90}%`,
      }}
      className="text-4xl"
    >
      🎈
    </motion.div>
  ))}
</div>

    </div>
  );
}