import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, FileText } from "lucide-react";

const videoHistory = [
  {
    id: 1,
    title: "The Basics of Quantum Physics",
    channel: "Physics Academy",
    date: "April 12, 2026",
    thumbnail: "https://img.youtube.com/vi/7u_UQG1La1o/mqdefault.jpg",
    notes: [
      { time: "0:45", text: "What is quantum mechanics" },
      { time: "2:10", text: "Wave particle duality" },
      { time: "5:30", text: "Uncertainty principle" },
    ],
  },
  {
    id: 2,
    title: "Introduction to Machine Learning",
    channel: "AI Simplified",
    date: "April 10, 2026",
    thumbnail: "https://img.youtube.com/vi/ukzFI9rgwfU/mqdefault.jpg",
    notes: [
      { time: "1:20", text: "Types of machine learning" },
      { time: "4:15", text: "Supervised vs unsupervised" },
    ],
  },
  {
    id: 3,
    title: "Organic Chemistry Fundamentals",
    channel: "Chem Central",
    date: "April 8, 2026",
    thumbnail: "https://img.youtube.com/vi/bka20Q9TN6M/mqdefault.jpg",
    notes: [
      { time: "0:30", text: "Carbon bonding basics" },
      { time: "3:00", text: "Functional groups overview" },
      { time: "6:45", text: "Naming conventions" },
    ],
  },
];

const allNotes = videoHistory.flatMap((v) =>
  v.notes.map((n) => ({ ...n, videoTitle: v.title, date: v.date }))
);

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
};

const Dashboard = () => {
  const [tab, setTab] = useState<"videos" | "notes">("videos");

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-24 md:pb-12">
      <motion.div {...fadeUp}>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Your learning history and saved notes.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1 w-fit mb-8">
        <button
          onClick={() => setTab("videos")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "videos" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Play className="w-4 h-4 inline mr-1.5 -mt-0.5" />
          Videos Watched
        </button>
        <button
          onClick={() => setTab("notes")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "notes" ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4 inline mr-1.5 -mt-0.5" />
          Notes List
        </button>
      </div>

      {tab === "videos" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoHistory.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="bg-card rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              <div className="aspect-video bg-muted relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  style={{ outline: "1px solid rgba(0,0,0,0.08)", outlineOffset: "-1px" }}
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-1">{video.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Notes taken on {video.date}
                </p>
                <div className="space-y-1.5 mb-4">
                  {video.notes.map((note, j) => (
                    <div key={j} className="flex gap-2 items-start text-sm">
                      <span className="font-mono-timestamp text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        {note.time}
                      </span>
                      <span className="text-muted-foreground">{note.text}</span>
                    </div>
                  ))}
                </div>
                <button className="h-9 px-4 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15 transition-colors w-full">
                  View Notes
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "notes" && (
        <div className="space-y-3 max-w-2xl">
          {allNotes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-xl shadow-card p-4 flex gap-4 items-start"
            >
              <span className="font-mono-timestamp text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-md whitespace-nowrap mt-0.5">
                {note.time}
              </span>
              <div>
                <p className="text-sm">{note.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{note.videoTitle} • {note.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
