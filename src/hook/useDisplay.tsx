import { useMediaQuery } from "react-responsive";

export default function useDisplay() {
  const isDesktop = useMediaQuery({
    query: "(min-width : 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width : 1024px) and (min-width:768px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width : 768px)",
  });

  return { isDesktop, isTablet, isMobile };
}
