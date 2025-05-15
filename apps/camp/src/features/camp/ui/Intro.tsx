export const Intro = () => {
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="mx-auto max-w-[440px] md:max-w-[700px]">
        <video
          className="h-auto w-full"
          poster="https://vz-127031db-d43.b-cdn.net/53b2fddd-2047-4f69-823f-2130b82f13bb/thumbnail.jpg"
          playsInline
          tabIndex={-1}
          loop
          autoPlay
          src="/pec-intro.mp4"
          muted
        />
      </div>
    </div>
  );
};
