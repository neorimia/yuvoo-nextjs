"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateLeadStatusAction } from "@/app/actions/leads";
import type { LeadStatus } from "@/types/leads";
import { LeadStatus as LeadStatusEnum } from "@/types/leads";

interface LeadDetailActionsProps {
  leadId: string;
  status: LeadStatus;
  parentEmail: string;
  parentPhone?: string | null;
}

export default function LeadDetailActions({
  leadId,
  status,
  parentEmail,
  parentPhone,
}: LeadDetailActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const updateStatus = (newStatus: LeadStatus) => {
    startTransition(async () => {
      const result = await updateLeadStatusAction({ leadId, status: newStatus });
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "Eroare la actualizarea statusului");
      }
    });
  };

  return (
    <div className="d-flex flex-wrap gap-2 mt-3">
      <a href={`mailto:${parentEmail}`} className="btn btn-yuvoo-primary btn-sm">
        <i className="bi bi-envelope me-1" aria-hidden="true" />
        Contactează părintele
      </a>
      {parentPhone && (
        <a href={`tel:${parentPhone}`} className="btn btn-outline-primary btn-sm">
          <i className="bi bi-telephone me-1" aria-hidden="true" />
          Sună
        </a>
      )}
      {status !== LeadStatusEnum.ACCEPTAT && (
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          disabled={isPending}
          onClick={() => updateStatus(LeadStatusEnum.ACCEPTAT)}
        >
          Marchează acceptat
        </button>
      )}
      {status === LeadStatusEnum.NOU && (
        <button
          type="button"
          className="btn btn-outline-warning btn-sm"
          disabled={isPending}
          onClick={() => updateStatus(LeadStatusEnum.IN_ASTEPTARE)}
        >
          Marchează contactat
        </button>
      )}
    </div>
  );
}
