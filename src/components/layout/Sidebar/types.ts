import type { ComponentType } from 'react';
import type { SVGProps } from 'react';

export interface SidebarLink {
  label: string;
  path: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface SidebarLinkProps extends SidebarLink {
  active: boolean;
}