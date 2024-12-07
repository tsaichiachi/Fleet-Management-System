// import { Helmet } from 'react-helmet';
import { Helmet, HelmetProvider } from 'react-helmet-async';


type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <HelmetProvider>
    <div>
      <Helmet>
        <title>智慧車載系統</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/images/logos/I-TRUCK-LOGO2.svg" />
      </Helmet>
      {children}
    </div>
  </HelmetProvider>
);

export default PageContainer;
