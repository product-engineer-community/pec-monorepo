interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SubTitle = ({ children, className }: SubTitleProps) => {
  return (
    <div className={`text-2xl font-semibold ${className}`}>{children}</div>
  );
};
