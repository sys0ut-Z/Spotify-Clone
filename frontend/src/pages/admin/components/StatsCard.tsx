import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  label: string;
  icon: React.ElementType; // all type of components/intrinsic elements
  value: string;
  bgColor: string;
  iconColor: string;
};

const StatsCard = (
  {label, icon: Icon, value, bgColor, iconColor}: StatsCardProps
) => {
  return (
    <Card className="bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
      <CardContent className="p-4 lg:p-5">
        <div className="flex items-center gap-4">
          <div className={`${bgColor} p-2.5 lg:p-3 rounded-lg mr-1`}>
            <Icon className={`size-6 lg:size-6.5 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm text-zinc-400">
              {label}
            </p>
            <p className="text-2xl font-bold">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard