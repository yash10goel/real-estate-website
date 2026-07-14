export default function Layout({ children }) {
  return (
    <div className="app-bg min-h-screen transition-all duration-300">
      {children}
    </div>
  );
}