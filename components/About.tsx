const About = () => {
  return (
    <div className="bg-slate-300 p-5 flex flex-col gap-3 mt-[8px]">
      <h2 className="text-xl font-bold mb-3">Welcome to the Community Cork</h2>
      <p>
        This site was designed to be a social media app to help you stay
        connected to your friends and family without keeping you addicted. Think
        of your posts as pinned notes on a cork bulletin board. Your feed will
        consist of all of your pinned notes as well as all of the pinned notes
        of people you follow. There is no news feed or adds injected into your
        feed, only the folks you follow will appear there. The idea is that{" "}
        <strong>you are limited to 12 pinned notes at a time.</strong> But don't
        worry. You can still make more than 12 pins thanks to the archive. Pins
        in your archive can still be viewed when people look in your profile,
        but archived pins will never show up in your feed. And of course you can
        delete posts that you don't want to keep around.
      </p>
      <h3 className="text-xl font-bold mb-3">Like the sound of that?</h3>
      <p>
        Thrilled to hear it. You can create an account with your gmail account
        by clicking the button at the top right corner. You'll be prompted to
        create a unique display name and then you're ready to go. You can start
        searching for users, following other users, and creating pinned posts.
      </p>
    </div>
  );
};

export default About;
