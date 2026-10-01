import DesktopRoot from "@/components/DesktopRoot";
import { getPortfolioContent } from "@/lib/content/repository";

export default async function Home() {
  const content = await getPortfolioContent();
  return <DesktopRoot content={content} />;
}
