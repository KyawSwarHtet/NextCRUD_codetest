import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Image
        src="assets/icons/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain block"
      />
    </div>
  );
};

export default Loading;
