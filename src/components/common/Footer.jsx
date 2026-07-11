import Profile from "./Profile";

const Footer = () => {
  return (
    <div className="fixed left-0 bottom-0 z-50 px-4 py-2 flex justify-between text-white bg-black w-full">
      <button className="flex flex-col items-center">
        <img
          className="w-8 h-8"
          src="https://img.icons8.com/material-sharp/24/FFFFFF/home.png"
          alt="homes"
        />
        <p>Home</p>
      </button>
      <button className="flex flex-col items-center">
        <img
          className="w-8 h-8"
          src="https://img.icons8.com/ios-glyphs/30/FFFFFF/video-playlist.png"
          alt="new"
        />
        <p>New & Hot</p>
      </button>
      <div className="flex flex-col items-center">
        <Profile screen="small" />
        <p>My Profile</p>
      </div>
    </div>
  );
};

export default Footer;
