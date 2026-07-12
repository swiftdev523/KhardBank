export default function PageContainer({ children, className = "" }) {
  return (
    <div
      className={`px-4 md:px-8 pb-24 md:pb-10 max-w-6xl mx-auto ${className}`}>
      {children}
    </div>
  );
}
