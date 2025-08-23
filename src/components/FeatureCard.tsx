import { ReactNode } from "react"

type Props = {
  icon: ReactNode
  title: string
  children: ReactNode
}

export default function FeatureCard({ icon, title, children }: Props) {
  return (
    <div className="card transition hover:shadow-xl">
      <div className="mb-3 text-2xl">{icon}</div>
      <h3 className="mb-1 text-xl font-semibold">{title}</h3>
      <p className="text-white/80">{children}</p>
    </div>
  )
}
