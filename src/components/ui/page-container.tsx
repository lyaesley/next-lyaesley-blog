import { ReactNode } from 'react';
import { cn, containerStyles } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  withPadding?: boolean;
}

export function PageContainer({ 
  children, 
  className,
  withPadding = true 
}: PageContainerProps) {
  return (
    <div className={cn(
      containerStyles,
      withPadding && "py-8",
      className
    )}>
      {children}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}