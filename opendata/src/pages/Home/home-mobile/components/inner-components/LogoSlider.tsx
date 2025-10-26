import LogoLoop from '@/components/LogoLoop';

export default function LogoCarousel({ organizations }: { organizations: any }) {

    const orgList = organizations?.data ?? organizations ?? [];

    const techLogos = orgList.map((org: any) => ({
        src: org.logoUrl,
        alt: org.organizationName,
        href: "organizations/" + org._id,
    }));

    return (
        <div className="h-[200px] relative overflow-hidden">
            <LogoLoop
                logos={techLogos}
                speed={120}
                direction="left"
                logoHeight={60}
                gap={40}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="#6A60F2"
                ariaLabel="Organization partners"
            />
        </div>
    );
}
