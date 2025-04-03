interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
  }
  
export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
      <div className="p-6 rounded-lg border border-gray-800 hover:border-[#f97966]/30 transition-all hover:shadow-lg hover:shadow-[#f97966]/5">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-medium mb-2 text-foreground">{title}</h3>
        <p className="text-foreground">{description}</p>
      </div>
    )
  }