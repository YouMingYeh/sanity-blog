import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <h1>Welcome to the Home Page</h1>
      <Link href="/about">
        go to about page
      </Link>
    </>
  );
};

const AboutPage = () => {
  return (
    <>
      <h1>About Page</h1>
      <p>This is the about page content.</p>
    </>
  );
};

const IndexPage = () => {
  return (
    <>
      <HomePage />
      <AboutPage />
    </>
  );
};

export default IndexPage;
