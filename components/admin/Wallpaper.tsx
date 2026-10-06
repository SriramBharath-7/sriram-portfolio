import Image from "next/image";
import wallpaper from "@/public/assets/wallpaper/kali-ferrofluid.jpg";

/**
 * The public desktop's wallpaper behind the admin: clear on the sign-in
 * screen, blurred and dimmed behind the working windows.
 */
export default function Wallpaper({ variant }: { variant: "desk" | "login" }) {
  const desk = variant === "desk";
  return (
    <div className="adm-wallpaper" data-variant={variant} aria-hidden="true">
      <Image
        src={wallpaper}
        alt=""
        fill
        placeholder="blur"
        priority={!desk}
        // Heavily blurred behind the dashboard, so a small rendition is enough.
        sizes={desk ? "40vw" : "100vw"}
        quality={desk ? 45 : 75}
      />
    </div>
  );
}
