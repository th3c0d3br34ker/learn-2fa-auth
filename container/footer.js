import Image from "next/image";

const Footer = () => (
  <footer className="text-center static bottom-0">
    <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-center space-x-6">
          <a
            className="text-gray-900 hover:text-opacity-75"
            href="https://github.com/th3c0d3br34ker/learn-2fa-auth"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only"> GitHub </span>

            <Image
              src="/icons/github.svg"
              width={42}
              height={42}
              alt="github"
            />
          </a>
        </div>

        <p className="max-w-lg mx-auto text-xs text-gray-500"></p>

        <p className="text-sm font-medium">Made with 🖤 by Jainam Desai</p>
      </div>
    </div>
  </footer>
);

export default Footer;
