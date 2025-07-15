import { Link } from 'react-router-dom';
import { 
  Video, 
  Users, 
  PlayCircle, 
  Shield, 
  Code, 
  Globe,
  ArrowRight,
  Star
} from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: Video,
      title: 'Live CP Classes',
      description: 'Join live competitive programming sessions with ultra-low latency streaming via 100ms technology.'
    },
    {
      icon: Code,
      title: 'Expert Problem Solving',
      description: 'Learn DSA and CP techniques from Navneet, a Codeforces Expert and 6-star Codechef coder.'
    },
    {
      icon: PlayCircle,
      title: 'Session Recordings',
      description: 'Access past CP sessions to master algorithms and problem-solving at your own pace.'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Join Navneet’s Telegram group with 5000+ CP enthusiasts for peer support and mentorship.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security ensures a safe and reliable learning environment.'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Connect with coders worldwide through optimized, high-performance streaming.'
    },
  ];

  const stats = [
    { value: '5000+', label: 'Community Members' },
    { value: '799+', label: 'Problems Solved' },
    { value: '6★', label: 'Codechef Rating' },
    { value: 'Expert', label: 'Codeforces Rank' },
  ];

  return (
    <div className="space-y-20 bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-100 leading-tight">
              Navneet’s CP
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Cohort Platform
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Master competitive programming with live classes and recordings, led by Navneet Hingankar, Google SWE and Codeforces Expert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/join"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Users className="w-5 h-5 mr-2" />
                Join Live Class
              </Link>
              <Link
                to="/recordings"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-blue-400 border-2 border-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors duration-200"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                View Recordings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Master CP with Top-Tier Tools
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Learn algorithms, solve problems, and compete with a global community of coders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your CP Journey Today
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join Navneet’s cohort to ace coding interviews and competitions with expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-blue-900 bg-white rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Video className="w-5 h-5 mr-2" />
              Join Now
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              What Our Coders Say
            </h2>
            <p className="text-lg text-gray-400">
              Hear from competitive programmers in Navneet’s community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ankit Sharma',
                role: 'Codeforces Specialist',
                content: 'Navneet’s live classes boosted my Codeforces rating from 1400 to 1600. The interactive format is amazing!',
                rating: 5,
              },
              {
                name: 'Priya Patel',
                role: 'Leetcode Enthusiast',
                content: 'The session recordings helped me master DP and graph problems. Navneet’s explanations are top-notch.',
                rating: 5,
              },
              {
                name: 'Rahul Verma',
                role: 'ICPC Regionalist',
                content: 'The Telegram community and live classes gave me the confidence to tackle tough CP problems.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-100">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}