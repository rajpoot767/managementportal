"use client"
import MatchService from "@/core/clients/MatchService";
import TemplateService from "@/core/clients/TemplateService";
import DataForm2 from "@/core/components/DataForm";
import { InputControlType } from "@/core/controls/edit/InputControlType";
import { FormState } from "@/core/forms/FormReducer";
import Icon from "@/core/icons/Icon";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const CloseMatchEdit: React.FC<WidgetProps> = (props) => {
    const matchId = Number(props.params?.matchId);

    const [match, setMatch] = useState<MatchData>();
    const [categories, setCategories] = useState<CategoryData[]>();
    const [matchStatus, setMatchStatus] = useState<boolean>();

    const sections: DataFormSection[] = [
        {
            sectionRows: [
                {
                    grow: true,
                    elements: [
                        {
                            name: "matchName",
                            controlType: InputControlType.lineTextInput,
                            attributes: {
                                label: "Match name",
                                readOnly: true
                            },
                        },
                        {
                            name: "matchType.matchTypeTitle",
                            controlType: InputControlType.lineTextInput,                  
                            attributes: {
                                label: "Match Type",
                                readOnly: true
                            },
                        },
                    ]
                },
                {
                    grow: true,
                    elements: [
                        {
                            name: "styxSportsMatchId",
                            controlType: InputControlType.lineTextInput,
                            attributes: {
                                label: "Styxsports Match Id",
                                readOnly: true
                            },
                        },
                        {
                            name: "providerMatchId",
                            controlType: InputControlType.lineTextInput,
                            attributes: {
                                label: "Entity Sports Match Id",
                                readOnly: true
                            },
                        },
                    ]
                },
            ],
            childSections: [{
                name: "matchQuestions",
                sectionRows: [
                    {
                        grow: true,
                        elements: [
                            {
                                name: "categoryId",
                                controlType: InputControlType.select,
                                dataset: categories,
                                dataKeyFieldName: "categoryId",
                                dataTextFieldName: "categoryTitle",
                                attributes: {
                                    label: "Category",
                                    required: true,
                                    errorMessage: "This is a required field"
                                },
                            },

                            {
                                name: "questionText",
                                controlType: InputControlType.lineTextInput,
                                attributes: {
                                    label: "Question",
                                    required: true,
                                    errorMessage: "This is a required field"
                                },
                            },

                            {
                                name: "value1",
                                controlType: InputControlType.numberInput,
                                attributes: {
                                    label: "ODD 1",
                                },
                            },
                            {
                                name: "value2",
                                controlType: InputControlType.numberInput,
                                attributes: {
                                    label: "ODD 2",
                                },
                            },
                            {
                                name: "isActive",
                                controlType: InputControlType.checkboxInput,
                                attributes: {
                                    label: "Is Active",
                                },
                            },
                        ]
                    },
                ]
            }],
        },
    ]

    const toggleMatchStatus = useCallback(async (formState: FormState<ToggleMatchStatusRequest>): Promise<ActionResponse<any>> => {
        const request: ToggleMatchStatusRequest = {
            matchId: matchId
        };
        let response = await new MatchService().toggleMatchStatus(request);
        setMatchStatus(response.result?.isClosed);
        if (response.isSuccessful) {
            setMatch((prev) => {
                if (!prev) return undefined; 
                return {
                    ...prev,
                    isClosed: response.result?.isClosed ?? prev.isClosed,
                };
            });
            setMatchStatus(response.result?.isClosed);
        }
        return redirect("/dashboard/matches");
    }, [matchStatus]);

    const fetchInitialData = async (matchId?: number) => {
        if (!matchId) return;
        let response = await new MatchService().getMatchById(matchId);
            if (response.isSuccessful) {
                setMatch(response.result);
            }
        
        let categoriesResponse = await new TemplateService().getAllCategories();
        if (categoriesResponse.isSuccessful) {
            setCategories(categoriesResponse.result);
        }
    }

    useEffect(() => {   
        fetchInitialData(matchId);
    }, [matchId]);

    return (
        <div className="h-full container  p-4 bg-white  max-h-full overflow-y-scroll">
            <div className="flex items-center justify-start">
                <Link className='text-xl  font-normal text-body-500 hover:text-body-300' href='/dashboard/matches'>
                    Matches
                </Link>
                <Icon name='rightArrowIcon' className="size-5" />
                <h3 className="text-xl font-semibold text-start text-body-950 ">
                    Edit Match
                </h3>
            </div>
            <div className="h-full rounded-md  mb-3 bg-white">

                <DataForm2
                    sections={sections}
                    dataItem={match}
                    onDelete={toggleMatchStatus}
                    onDeleteClassname="flex items-center justify-center px-6 py-3 text-white  bg-success-600 hover:bg-success-500  rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-success-400 focus:ring-offset-2 transition-transform duration-300"
                    deleteButtonTitle="Open Match"
                    onDeleteConfirmationMessage="Are you sure to open this match again?"
                />
            </div>
        </div>
    );
};

export default CloseMatchEdit;
