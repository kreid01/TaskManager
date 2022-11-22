interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className="header">
      <h1 className="title">{title}</h1>
    </header>
  );
};
