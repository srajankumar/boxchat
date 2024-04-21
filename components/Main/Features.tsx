import Image from "next/image";

const stats = [
  {
    id: 1,
    img: "/avatars/2.png",
    name: "Anonymous Chat",
    description:
      "Share your thoughts and feelings without revealing your identity.",
    link: "/customer/login",
  },
  {
    id: 2,
    img: "/box.png",
    name: "Private Boxes",
    description:
      "Create a private chat room for you and your friends to discuss sensitive topics.",
    link: "/producer/login",
  },
  {
    id: 3,
    img: "/globe.png",
    name: "Open Box",
    description:
      "Connect with others worldwide and engage in anonymous conversations.",
    link: "/shipment-provider/login",
  },
];

export default function Features() {
  return (
    <div className="mx-auto max-w-5xl mb-48 px-6 lg:px-8">
      <h1 className="w-full text-center max-w-6xl lg:mb-10 mb-5 text-3xl font-semibold">
        Features
      </h1>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 text-center lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col justify-center items-center"
          >
            <div className="w-40 h-40 flex justify-center items-center">
              <Image
                src={stat.img}
                alt={stat.name}
                className="w-full"
                width={500}
                height={500}
              ></Image>
            </div>
            <h1 className="text-xl font-semibold mb-2">{stat.name}</h1>
            <div className="text-base leading-7 text-gray-600">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
