import Footer from '../components/footer';
import Header from '../components/header';
import './globals.css';

export const metadata = {
  title: '2FA Authenticator',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='h-screen'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
