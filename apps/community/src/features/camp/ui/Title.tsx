interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Title = ({ children, className }: TitleProps) => {
  return (
    <div className={`text-center text-3xl font-semibold ${className}`}>
      {children}
    </div>
  );
};
