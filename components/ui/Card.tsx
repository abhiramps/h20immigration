import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card = ({ children, className, hoverEffect = true }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300',
        hoverEffect && 'hover:shadow-xl hover:-translate-y-1 hover:border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};
