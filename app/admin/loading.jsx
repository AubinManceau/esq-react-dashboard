import { Skeleton } from "@/components/ui/skeleton";

export default function Loading({ className }) {
  return (
    <div className={className}>
      <Skeleton className="w-full h-full" />
    </div>
  );
}
