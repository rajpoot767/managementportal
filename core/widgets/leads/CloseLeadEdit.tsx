"use client";
import LeadService from "@/core/clients/LeadService";
import DataForm2 from "@/core/components/DataForm";
import { InputControlType } from "@/core/controls/edit/InputControlType";
import Icon from "@/core/icons/Icon";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const EditLead: React.FC<WidgetProps> = ({ params }) => {
  const leadId = Number(params?.leadId);
  const [lead, setLead] = useState<Lead>();

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!leadId) return;
      const response = await new LeadService().getLeadbyId(leadId);
      if (response.isSuccessful) {
        setLead(response.result);
      }
    };
    fetchInitialData();
  }, [leadId]);

  const toggleMatchStatus = useCallback(async (): Promise<ActionResponse<ToggleLeadStatusResult>> => {
    if (!leadId) return { isSuccessful: false, result: { isClosed: false } };

    const response = await new LeadService().toggleLeadStatus({ leadId });

    if (response.isSuccessful) {
      setLead((prev) => prev ? { ...prev, isClosed: response.result?.isClosed ?? false } : prev);
      redirect("/dashboard/leads/closeLeads")
    }

    return response;
  }, [leadId]);

  const sections: DataFormSection[] = [
    {
      sectionRows: [
        {
          grow: true,
          elements: [
            { name: "leadId", controlType: InputControlType.lineTextInput, attributes: { label: "Lead Id", readOnly: true } },
            { name: "name", controlType: InputControlType.lineTextInput, attributes: { label: "Name", readOnly: true } },
          ],
        },
        {
          grow: true,
          elements: [
            { name: "email", controlType: InputControlType.lineTextInput, attributes: { label: "Email", readOnly: true } },
            { name: "phone", controlType: InputControlType.lineTextInput, attributes: { label: "Phone No", readOnly: true } },
          ],
        },
        {
          grow: true,
          elements: [
            { name: "message", controlType: InputControlType.lineTextInput, attributes: { label: "Message", readOnly: true } },
          ],
        },
        {
          grow: true,
          elements: [{ name: "comment", controlType: InputControlType.lineTextInput, attributes: { label: "Comment",readOnly:true } }],
        },
      ],
    },
  ];

  return (
    <div className="h-full container p-4 bg-white max-h-full overflow-y-scroll">
      <div className="flex items-center">
        <Link className="text-xl font-normal text-body-500 hover:text-body-300" href="/dashboard/leads">
          Leads
        </Link>
        <Icon name="rightArrowIcon" className="size-5" />
        <h3 className="text-xl font-semibold text-body-950">Edit Lead</h3>
      </div>
      <div className="h-full rounded-md mb-3 bg-white">
        <DataForm2
          sections={sections}
          dataItem={lead}
          onDelete={toggleMatchStatus}
          onDeleteClassname="flex items-center justify-center px-6 py-3 text-white bg-success-700 hover:bg-success-600 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-success-400 focus:ring-offset-2 transition-transform duration-300"
          deleteButtonTitle="Open Lead"
          onDeleteConfirmationMessage="Are you sure to open this lead?"
        />
      </div>
    </div>
  );
};

export default EditLead;
