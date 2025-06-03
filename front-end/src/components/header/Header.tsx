import "./css/Header.css";

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return <div className="header">{children}</div>;
}
