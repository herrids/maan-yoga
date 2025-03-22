import { ReactSVG } from "react-svg";
import { useTheme } from "next-themes";

export default function PoseImage({
  name,
  poseId,
}: {
  name: string;
  poseId: string;
}) {
  const { theme } = useTheme();

  return (
    <ReactSVG
      aria-label={name || "Yoga Pose"}
      beforeInjection={(svg) => {
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.querySelectorAll("*").forEach((element) => {
          element.removeAttribute("fill");
        });
        svg.setAttribute(
          "class",
          theme === "light" ? "fill-black" : "fill-white",
        );
      }}
      className="w-full h-full"
      src={`https://kbmjjri0rfvoollc.public.blob.vercel-storage.com/poses/${poseId}.svg`}
      wrapper="div"
    />
  );
}
