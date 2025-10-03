import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CommentSlider() {
  return (
    <div className="flex flex-col gap-2 w-full items-start justify-center mt-12">
      <span className="text-2xl font-semibold">
        Hastalarımızdan Gelen Yorumlar
      </span>
      <span className="text-sm text-muted-foreground">
        Hastalarımızın deneyimlerini ve geri bildirimlerini okuyarak, sağlıklı
        yaşam yolculuğunuzda nasıl yardımcı olabileceğimizi keşfedin.
      </span>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="lg:basis-1/4">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
