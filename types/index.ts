import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type YogaFlow = {
  id: string;
  name: string;
  created_at: Date;
  description?: string;
  poses?: string[];
};
