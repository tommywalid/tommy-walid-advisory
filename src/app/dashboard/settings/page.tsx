import { company } from "@/config/company";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Input
        disabled
        value={value ?? ""}
        placeholder={value ? undefined : "Not set"}
        className="disabled:opacity-70"
      />
    </div>
  );
}

/**
 * Reads real values from src/config/company.ts — the single source of
 * truth this whole site already uses (see config/company.ts). Read-only
 * until persistence exists; editing here today would have nowhere to save.
 */
export default function DashboardSettingsPage() {
  return (
    <>
      <DashboardPageHeader
        title="Settings"
        description="Business information, currently sourced from src/config/company.ts. Editable here once the backend is connected."
      />

      <Card className="max-w-2xl bg-white">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Name" value={company.name} />
          <Field label="Email" value={company.email} />
          <Field label="Phone" value={company.phone} />
          <Field label="WhatsApp" value={company.whatsapp} />
          <Field label="Calendly URL" value={company.calendlyUrl} />
          <Field label="Google Maps URL" value={company.googleMapsUrl} />
          <Field label="City" value={company.address.city} />
          <Field label="Country" value={company.address.country} />
          <Field label="Currency" value={company.currency} />
          <Field label="Timezone" value={company.timezone} />
          <Field label="LinkedIn" value={company.social.linkedin} />
          <Field label="Instagram" value={company.social.instagram} />
          <Field label="Facebook" value={company.social.facebook} />
          <Field label="TikTok" value={company.social.tiktok} />
          <Field label="YouTube" value={company.social.youtube} />
        </div>
      </Card>
    </>
  );
}
