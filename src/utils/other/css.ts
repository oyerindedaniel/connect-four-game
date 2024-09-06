import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { ClassValue } from "clsx";

/**
 * Combines class names using clsx and merges Tailwind classes using tailwind-merge.
 *
 * @param classes - An array or list of class names to be combined and merged.
 * @returns A single string with the combined and merged class names.
 */
export function classNames(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
