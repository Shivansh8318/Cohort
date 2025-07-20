import { 
  Video, 
  Users, 
  Shield, 
  Zap, 
  Globe,
  Github,
  Twitter,
  Mail,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Video,
      title: 'Ultra-Low Latency',
      description: 'Sub-100ms latency for real-time interactions'
    },
    {
      icon: Users,
      title: 'Scalable',
      description: 'Support for thousands of concurrent participants'
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'End-to-end encryption and enterprise-grade security'
    },
    {
      icon: Zap,
      title: 'Fast',
      description: 'Lightning-fast connection and seamless experience'
    },
    {
      icon: Globe,
      title: 'Global',
      description: 'Optimized routing worldwide with 99.9% uptime'
    }
  ];

  const techStack = [
    { name: 'React', version: '18.x', description: 'Frontend framework' },
    { name: 'Vite', version: '5.x', description: 'Build tool and dev server' },
    { name: 'Tailwind CSS', version: '3.x', description: 'Styling framework' },
    { name: '100ms SDK', version: 'Latest', description: 'Video streaming platform' },
    { name: 'Node.js', version: '18.x', description: 'Backend runtime' },
    { name: 'Express', version: '4.x', description: 'Backend framework' },
  ];

  const team = [
    {
      name: 'Shivansh Agrawal',
      role: 'Lead Developer',
      description: 'Full-stack developer passionate about creating seamless user experiences',
      avatar: '/api/placeholder/avatar/1'
    }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
            <Video className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
          About shivansh CP Cohort
        </h1>
        <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
          A modern live streaming platform built for educational cohorts, powered by 100ms technology 
          to deliver exceptional video conferencing experiences.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 -mx-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            To create seamless, interactive, and engaging learning experiences through cutting-edge 
            streaming technology. We believe that distance should never be a barrier to quality education 
            and meaningful connections.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Community First
              </h3>
              <p className="text-secondary-600">
                Building tools that bring people together and foster collaborative learning
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Innovation
              </h3>
              <p className="text-secondary-600">
                Leveraging the latest technology to create superior streaming experiences
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Reliability
              </h3>
              <p className="text-secondary-600">
                Ensuring consistent, high-quality service that you can depend on
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
          Powered by 100ms Technology
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-secondary-50 py-16 -mx-4 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
            Built With Modern Technology
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {tech.name}
                  </h3>
                  <span className="text-sm text-primary-600 font-medium">
                    {tech.version}
                  </span>
                </div>
                <p className="text-secondary-600 text-sm">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
          Meet the Team
        </h2>
        
        <div className="flex justify-center">
          {team.map((member, index) => (
            <div key={index} className="card text-center max-w-sm">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-1">
                {member.name}
              </h3>
              <p className="text-primary-600 font-medium mb-3">
                {member.role}
              </p>
              <p className="text-secondary-600 text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 -mx-4 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
            How It Works
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Join or Create a Session
                </h3>
                <p className="text-secondary-600">
                  Enter your name and join an existing session or start your own live stream as a host.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Interactive Live Experience
                </h3>
                <p className="text-secondary-600">
                  Participate in real-time discussions, share screens, and engage with other cohort members.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Access Recordings
                </h3>
                <p className="text-secondary-600">
                  Review past sessions, download recordings, and catch up on missed content anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-secondary-900 mb-6">
          Get in Touch
        </h2>
        <p className="text-lg text-secondary-600 mb-8">
          Have questions or feedback? We'd love to hear from you!
        </p>
        
        <div className="flex justify-center gap-6">
          <a 
            href="mailto:contact@shivansh-cohort.com" 
            className="btn btn-primary"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Us
          </a>
          <a 
            href="https://github.com/shivansh-cp/cohort-streaming" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <Github className="w-5 h-5 mr-2" />
            View Source
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-secondary-200 text-secondary-600">
        <p>&copy; 2024 shivansh CP Cohort. Built with ❤️ using 100ms technology.</p>
      </footer>
    </div>
  );
} 