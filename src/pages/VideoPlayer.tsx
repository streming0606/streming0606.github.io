
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Heart, Share2, Download, MoreVertical } from "lucide-react";

// Mock video data
const videoData = {
  1: {
    id: 1,
    title: "Epic Mountain Adventure",
    description: "Experience the breathtaking beauty of mountain landscapes in this stunning adventure video. Join us as we explore remote peaks and capture nature's most incredible moments.",
    duration: "2:45",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    views: "12.5K",
    likes: "1.2K",
    category: "Adventure"
  },
  2: {
    id: 2,
    title: "City Lights Timelapse",
    description: "Watch the city come alive as day turns to night in this mesmerizing timelapse of urban life and movement.",
    duration: "1:30",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    views: "8.3K",
    likes: "892",
    category: "Urban"
  },
  3: {
    id: 3,
    title: "Ocean Waves Relaxation",
    description: "Relax and unwind with the soothing sounds of ocean waves crashing against pristine beaches.",
    duration: "5:20",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    views: "25.1K",
    likes: "2.1K",
    category: "Nature"
  }
};

const suggestedVideos = [
  {
    id: 4,
    title: "Street Food Documentary",
    duration: "3:15",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
    views: "15.2K"
  },
  {
    id: 5,
    title: "Modern Architecture",
    duration: "4:10",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop",
    views: "9.8K"
  },
  {
    id: 6,
    title: "Wildlife Safari",
    duration: "6:30",
    thumbnail: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=300&h=200&fit=crop",
    views: "18.7K"
  },
  {
    id: 7,
    title: "Cooking Masterclass",
    duration: "8:45",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
    views: "22.3K"
  },
  {
    id: 8,
    title: "Space Exploration",
    duration: "12:30",
    thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop",
    views: "35.6K"
  },
  {
    id: 9,
    title: "Art Gallery Tour",
    duration: "5:55",
    thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop",
    views: "11.4K"
  }
];

const VideoPlayer = () => {
  const { id } = useParams();
  const [video] = useState(videoData[id as keyof typeof videoData]);
  const [isLiked, setIsLiked] = useState(false);
  const [visibleSuggestions, setVisibleSuggestions] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.offsetHeight;
      
      if (scrollTop + windowHeight >= docHeight - 100) {
        setVisibleSuggestions(prev => Math.min(prev + 3, suggestedVideos.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Video not found</h1>
          <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:bg-white/10 rounded-lg p-2 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Xshiver
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative bg-black rounded-xl overflow-hidden mb-6 shadow-2xl">
              <video
                controls
                className="w-full aspect-video"
                poster={`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop`}
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-gray-300">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span className="bg-purple-500/20 px-2 py-1 rounded text-purple-300">
                    {video.category}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isLiked 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{isLiked ? parseInt(video.likes) + 1 : video.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">{video.description}</p>
            </div>
          </div>

          {/* Suggestions Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-6">Suggested Videos</h2>
            <div className="space-y-4">
              {suggestedVideos.slice(0, visibleSuggestions).map((suggested, index) => (
                <Link
                  key={suggested.id}
                  to={`/video/${suggested.id}`}
                  className="group block bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-102 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex">
                    <div className="relative w-32 h-20 flex-shrink-0">
                      <img
                        src={suggested.thumbnail}
                        alt={suggested.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/70 px-1 py-0.5 rounded text-xs">
                        {suggested.duration}
                      </div>
                    </div>
                    <div className="p-3 flex-1">
                      <h3 className="font-medium text-sm mb-1 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {suggested.title}
                      </h3>
                      <p className="text-xs text-gray-400">{suggested.views} views</p>
                    </div>
                  </div>
                </Link>
              ))}
              
              {visibleSuggestions < suggestedVideos.length && (
                <div className="text-center py-4">
                  <div className="animate-pulse text-gray-400">Loading more videos...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
