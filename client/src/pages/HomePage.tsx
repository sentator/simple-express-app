import { Link } from '@tanstack/react-router';

const HomePage = () => {
  return (
    <div>
      <p>Home page</p>
      <div>
        <Link to="/projects">Projects</Link>
      </div>
    </div>
  );
};

export default HomePage;
