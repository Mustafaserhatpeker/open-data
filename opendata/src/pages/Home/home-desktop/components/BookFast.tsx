import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function BookFast() {
  return (
    <div className="w-full flex flex-col gap-4  p-8 rounded-lg border bg-accent">
      <span className="text-3xl font-semibold font-sans text-center">
        Bilgilerinizi Doldurun, Sizi Arayalım!
      </span>

      <div className="flex flex-row items-center justify-center gap-2">
        <Input type="text" placeholder="Adınız" />
        <Input type="text" placeholder="Soyadınız" />
        <Input type="text" placeholder="Telefon Numarası" />
        <Button>Gönder</Button>
      </div>

      <div>
        <span className="text-sm text-gray-500">
          Randevu almak için lütfen yukarıdaki bilgileri doldurun. En kısa
          sürede sizinle iletişime geçeceğiz.
        </span>
      </div>

      {/* Sosyal Kanıt Bileşeni */}
      <div className="flex flex-row items-center gap-4 mt-2 bg-white dark:bg-gray-700 p-2 rounded">
        <div className="flex -space-x-3">
          <Avatar className="w-8 h-8 border-2 border-white dark:border-gray-800">
            <AvatarImage src="/avatars/user1.jpeg" alt="User 1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border-2 border-white dark:border-gray-800">
            <AvatarImage src="/avatars/user1.jpeg" alt="User 2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border-2 border-white dark:border-gray-800">
            <AvatarImage src="/avatars/user1.jpeg" alt="User 3" />
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border-2 border-white dark:border-gray-800">
            <AvatarImage src="/avatars/user1.jpeg" alt="User 4" />
            <AvatarFallback>U4</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-start ">
          <div className="text-sm font-semibold text-lime-500">13B+</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Üzerinde Mutlu Müşteri
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookFast;
