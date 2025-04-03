import { MessageSquare, Users, Bot, Video, PersonStanding, Group } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

const featureData = [
  {
    icon: <MessageSquare className="h-8 w-8 text-[#f97966]" />,
    title: "Real-time Messaging",
    description: "Instant communication with team members. Messages are delivered and updated in real-time"
  },
  {
    icon: <Users className="h-8 w-8 text-[#f97966]" />,
    title: "Team Collaboration",
    description: "Create dedicated spaces for teams, projects, or topics. Organize conversations and keep everyone in sync."
  },
  {
    icon: <Group className="h-8 w-8 text-[#f97966]" />,
    title: "Channel messaging",
    description: "Members of workspace can make a group disscussion with each other"
  },
  {
    icon: <PersonStanding className="h-8 w-8 text-[#f97966]" />,
    title: "Direct messaging",
    description: "make communication with member of the workspace through texting"
  },
  {
    icon: <Video className="h-8 w-8 text-[#f97966]" />,
    title: "Video and voice communication",
    description: "talk with peer to peer with member of workspace"
  },
  {
    icon: <Bot className="h-8 w-8 text-[#f97966]" />,
    title: "AI chatbot assistant",
    description: "AI chatbot assistant that helps with how the application works "
  }
];

export default function Features() {
  return (
    <section className="w-full py-16 text-white">
      <div className="container mx-auto px-6 md:px-8 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-foreground">
            Why choose <span className="text-[#f97966]">BuzzNet</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-foreground">
            Designed for modern teams that need powerful communication tools without the complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 justify-center">
          {featureData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
