import { GradientCard } from "@/components/ui/gradient-card"

export const Demo = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-black">
            <GradientCard 
                title="AI-Powered Inbox Sorting"
                description="OpenMail revolutionizes email management with AI-driven sorting, boosting productivity and accessibility"
                cta="Learn More"
            />
        </div>
    )
}