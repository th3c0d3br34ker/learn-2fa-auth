import Footer from '../components/footer';
import Header from '../components/header';
import './globals.css';

export const metadata = {
  title: '2FA Authenticator',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      </head>
      <body className='h-screen'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
