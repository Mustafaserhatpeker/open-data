const logos = [
    "/vite.svg",
    "/vite.svg",
    "/vite.svg",
    "/vite.svg",
    "/vite.svg",
    "/vite.svg",
    "/vite.svg",
    "/vite.svg",
];

export default function LogoCarousel() {
    return (
        <div className="wrapper">
            {logos.map((logo, index) => (
                <div key={index} className={`item item${index + 1}`}>
                    <img src={logo} alt={`logo-${index}`} className="w-full h-full object-contain" />
                </div>
            ))}
        </div>
    );
}