"use client"
import LiveScoreService from "@/core/clients/LiveScoreService";
import LiveStreamingService from "@/core/clients/LiveStreamingService";
import MatchService from "@/core/clients/MatchService";
import TemplateService from "@/core/clients/TemplateService";
import DataForm2 from "@/core/components/DataForm";
import { InputControlType } from "@/core/controls/edit/InputControlType";
import { FormState } from "@/core/forms/FormReducer";
import Icon from "@/core/icons/Icon";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const MatchesPrediction: React.FC<WidgetProps> = (props) => {
    const matchId = Number(props.params?.matchId);
    const [isLoading, setIsLoading] = useState(false);
    const [match, setMatch] = useState<MatchData | null>();
    const [categories, setCategories] = useState<CategoryData[]>();
    const [matchStatus, setMatchStatus] = useState<boolean>(false);
    const [liveStreamMatches, setLiveStreamMatches] = useState<StreamRecord[]>();
    const [liveScoreMatches, setLiveScoreMatches] = useState<LiveMatch[]>();

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
                            //dataKeyFieldName:'',
                            //dataTextFieldName:''
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
                            controlType: InputControlType.select,
                            dataset: liveStreamMatches,
                            dataKeyFieldName: "id",
                            dataTextFieldName: "name",
                            attributes: {
                                label: "Styx Sports Match - Live Streaming",
                            },
                        },
                        {
                            name: "providerMatchId",
                            controlType: InputControlType.select,
                            dataset: liveScoreMatches,
                            dataKeyFieldName: "match_id",
                            dataTextFieldName: "name",
                            attributes: {
                                label: "Entity Sports Match",
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

    const toggleMatchStatus = useCallback(
        async (formState: FormState<ToggleMatchStatusRequest>): Promise<ActionResponse<any>> => {
            const request: ToggleMatchStatusRequest = {
                matchId: matchId
            };
            const response = await new MatchService().toggleMatchStatus(request);
            if (response.isSuccessful) {
                const updatedStatus = response.result?.isClosed ?? matchStatus;
                setMatch((prev) => {
                    if (!prev) return undefined;
                    return {
                        ...prev,
                        isClosed: updatedStatus,
                    };
                });
                setMatchStatus(updatedStatus);
            }
            return redirect("/dashboard/matches");
        },
        []
    );

    const onUpdateClick = useCallback(
        async (formState: FormState<UpdateMatchQuestionsRequest>): Promise<ActionResponse<any>> => {
            if (!formState.inputValues.providerMatchId && !formState.inputValues.styxSportsMatchId) {
                return { isSuccessful: false, message: "Please provide either Syxsports match or Entity Sports Match" }
            }
            const response = await new MatchService().updateMatchQuestion(formState.inputValues);
            setMatch(response.result?.matchData);
            return response;
        },
        []
    );

    const fetchInitialData = async (matchId?: number) => {
        if (!matchId) return;

        const [matchResponse, categoriesResponse] = await Promise.all([
            new MatchService().getMatchById(matchId), new TemplateService().getAllCategories()
        ])

        if (matchResponse.isSuccessful) {
            setMatch(matchResponse.result);
        }

        if (categoriesResponse.isSuccessful) {
            setCategories(categoriesResponse.result);
        }
    }

    useEffect(() => {
        fetchData();
        fetchInitialData(matchId);
    }, [matchId, onUpdateClick]);

    function sortArrayByProperty(array: any[], property: string) {
        return array.sort((a, b) => {
            if (a[property] < b[property]) return -1;
            if (a[property] > b[property]) return 1;
            return 0;
        });
    }

    const fetchData = async () => {


        //fetching streaming matches
        const liveStreamService = new LiveStreamingService();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let matchesResponse = await liveStreamService.getLiveStreamingMatches({
            is_limit: 1,
            timezone: timezone
        });
        const sortedLiveStreamMatches = sortArrayByProperty(matchesResponse.data, "name")
        setLiveStreamMatches(sortedLiveStreamMatches);

        //fetching live score
        const liveScoreResponse = await new LiveScoreService().getLiveScore();
        const sortedLiveScoreMatches = sortArrayByProperty(liveScoreResponse.data, "name")
        setLiveScoreMatches(sortedLiveScoreMatches);
        console.log(liveScoreResponse.data);

    }


    useEffect(() => {

    }, [])







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
                    onClick={onUpdateClick}
                    onDelete={toggleMatchStatus}
                    deleteButtonTitle="Close Match"
                    onDeleteConfirmationMessage="Are you sure to close this match?"
                />
            </div>
        </div>
    );
};

export default MatchesPrediction;
