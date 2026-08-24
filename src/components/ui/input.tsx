import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full rounded-lg border border-beige-dark bg-white px-4 text-sm text-ink placeholder:text-ink-soft/60 transition-colors outline-none focus:border-gold",
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full resize-none rounded-lg border border-beige-dark bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors outline-none focus:border-gold",
        className,
      )}
      {...props}
    />
  );
}

function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(
          "h-11 w-full appearance-none rounded-lg border border-beige-dark bg-white px-4 pe-10 text-sm text-ink transition-colors outline-none focus:border-gold",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 end-4 size-4 -translate-y-1/2 text-ink-soft" />
    </div>
  );
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-xs font-semibold tracking-[0.1em] text-forest uppercase",
        className,
      )}
      {...props}
    />
  );
}

export { Input, Textarea, Select, Label };
