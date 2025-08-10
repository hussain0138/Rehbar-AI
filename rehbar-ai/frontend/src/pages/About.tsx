import { motion } from 'framer-motion'
import { Users, Award, Globe, MapPin, Heart, Zap } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "Pioneering AI-powered conversation assistance technology for real-time communication enhancement."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Privacy First",
      description: "Local processing ensures your conversations remain private and secure on your device."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "Delivering superior voice recognition and AI assistance for professional conversations."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Impact",
      description: "Empowering professionals worldwide with intelligent conversation assistance."
    }
  ]

  const team = [
    {
      name: "Ahmed Ali",
      role: "CEO & Founder",
      bio: "Visionary leader with expertise in AI technology and business development, driving Rehbar AI's mission.",
      location: "Islamabad, Pakistan"
    },
    {
      name: "Bisma Ijaz",
      role: "CTO & Co-Founder",
      bio: "Technical expert specializing in voice recognition and real-time AI systems development.",
      location: "Kuala Lumpur, Malaysia"
    },
    {
      name: "Development Team",
      role: "Engineering",
      bio: "Talented engineers from Pakistan and Malaysia working together to build cutting-edge AI solutions.",
      location: "Pakistan & Malaysia"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black pt-16"
    >
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-satoshi font-black text-white mb-6">
              About <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Rehbar AI</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing conversation assistance through advanced AI technology.
              Developed across Pakistan and Malaysia, sponsored by Egenie AI,
              we're building the future of intelligent communication support.
            </p>
            <div className="flex items-center justify-center space-x-6 text-white/60">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Blue Area, Islamabad</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Made with passion</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-satoshi font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                To empower professionals worldwide with intelligent, real-time conversation assistance
                that enhances communication effectiveness while maintaining complete privacy and security.
              </p>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Our desktop application processes conversations locally on your device, providing
                instant AI-powered suggestions, follow-up questions, and contextual assistance
                without compromising your privacy.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Built by a passionate team spanning Pakistan and Malaysia, we combine local
                innovation with global standards to deliver world-class AI technology.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                "To create the world's most trusted AI conversation assistant that understands
                context, respects privacy, and empowers every professional to communicate with confidence."
              </p>
              <div className="border-l-4 border-blue-400 pl-4 bg-blue-500/10 rounded-r-lg p-4">
                <p className="text-blue-300 font-semibold text-lg">
                  "Your Voice, Enhanced by AI"
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Sponsored by Egenie AI • Developed in Pakistan & Malaysia
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at Rehbar AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white-5 backdrop-blur border border-gray-700 rounded-xl p-6 text-center hover:bg-white-10 transition duration-300"
              >
                <div className="text-purple-400 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The brilliant minds behind Rehbar AI's innovative technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white-5 backdrop-blur border border-gray-700 rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-purple-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and user satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white-5 backdrop-blur border border-gray-700 rounded-xl p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">1M+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="bg-white-5 backdrop-blur border border-gray-700 rounded-xl p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-400">Countries</div>
            </div>
            <div className="bg-white-5 backdrop-blur border border-gray-700 rounded-xl p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-400">Accuracy Rate</div>
            </div>
            <div className="bg-white-5 backdrop-blur border border-gray-700 rounded-xl p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default About
