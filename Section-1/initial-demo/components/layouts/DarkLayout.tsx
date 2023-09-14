interface DarkLayoutProps {
  children: React.ReactNode;
}

export const DarkLayout = ({ children }: DarkLayoutProps) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(182, 19, 19, 0.3)",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
        <h3>DarkLayout</h3>
      {children}
    </div>
  );
};
