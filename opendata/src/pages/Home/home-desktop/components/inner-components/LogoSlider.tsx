export default function LogoCarousel({ organizations }: { organizations: any[] }) {
    const itemCount = organizations?.length;
    const duration = 30; // saniye
    const itemWidth = 200;

    return (
        <div className="wrapper">
            {organizations?.map((org, index) => {
                const animationDelay = `calc(${duration}s / ${itemCount} * (${itemCount - index - 1}) * -1)`;
                const left = `max(calc(${itemWidth}px * ${itemCount}), 100%)`;

                return (
                    <div
                        key={index}
                        className="item"
                        style={{ animationDelay, left }}
                    >
                        <img
                            src={org.logoUrl}
                            alt={`logo-${index}`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                );
            })}
        </div>
    );
}
