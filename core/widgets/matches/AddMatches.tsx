"use client";
import LiveScoreService from "@/core/clients/LiveScoreService";
import LiveStreamingService from "@/core/clients/LiveStreamingService";
import MatchService from "@/core/clients/MatchService";
import TemplateService from "@/core/clients/TemplateService";
import DataForm2 from "@/core/components/DataForm";
import { InputControlType } from "@/core/controls/edit/InputControlType";
import { FormState } from "@/core/forms/FormReducer";
import Icon from "@/core/icons/Icon";
import RouteBuilder from "@/core/utilities/RouteBuilder";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";


const AddMatches = () => {

  const router = useRouter();
  const [dataset, setDataset] = useState<any>();
  const [liveStreamMatches, setLiveStreamMatches] = useState<StreamRecord[]>();
  const [liveScoreMatches, setLiveScoreMatches] = useState<LiveMatch[]>();


  const matchSections: DataFormSection[] = [
    {
      sectionRows: [
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

          ],
        },
        {
          grow: true,
          elements: [
            {
              name: "providerMatchId",
              controlType: InputControlType.select,
              dataset: liveScoreMatches,
              dataKeyFieldName: "match_id",
              dataTextFieldName: "name",
              attributes: {
                label: "live Score Match Id ",
              },
            },

          ],
        },

        {
          grow: false,
          elements: [
            {
              name: "predictionTemplateId",
              controlType: InputControlType.select,
              dataset: dataset,
              dataKeyFieldName: "predictionTemplateId",
              dataTextFieldName: "templateTitle",
              attributes: {
                label: "Template Name",
                required: true,
                errorMessage: "The Provider Match ID field is required.",
              },
            },
          ],
        },
      ],
    },
  ];




  const onUpdateClick = useCallback(async (formState: FormState<CreateMatchFromPredictionTemplateRequest>) => {

    if(!formState.inputValues.providerMatchId && !formState.inputValues.styxSportsMatchId)
    {
      return {isSuccessful:false, message:"Please provide either Syxsports match or Entity Sports Match"}
    }


    let request = { ...formState.inputValues };
    const liveMatchDetail = liveStreamMatches?.find(x => x.id == request.styxSportsMatchId);
    const liveScoreMatch = liveScoreMatches?.find(x=>x.match_id?.toString()==request.providerMatchId)
    

    if (liveMatchDetail && request.styxSportsMatchId ) {
      console.log("First Block")
      request.teamAtitle = liveMatchDetail.team_a.name;
      request.teamBtitle = liveMatchDetail.team_b.name;
    }
    else if(liveScoreMatch && request.providerMatchId){
      console.log("Second Block");
      
      request.teamAtitle = liveScoreMatch.team_a?.name;
      request.teamBtitle = liveScoreMatch.team_b?.name;
    }
    let response = await new MatchService().createMatchFromPredictionTemplate(request);
    router.replace(RouteBuilder.returnToAllMatches());
    return response;
  }, [liveStreamMatches,liveScoreMatches]);


  function sortArrayByProperty(array:any[], property:string) {
    return array.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  }

  const fetchData = async () => {
    //fetching Templates
    const templateService = new TemplateService();
    let response = await templateService.getAllPredictionTemplates();
    setDataset(response.result);
    
    //fetching streaming matches
    const liveStreamService = new LiveStreamingService();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let matchesResponse = await liveStreamService.getLiveStreamingMatches({
      is_limit: 1,
      timezone: timezone
    });
    const sortedLiveStreamMatches = sortArrayByProperty(matchesResponse.data,"name")
    setLiveStreamMatches(sortedLiveStreamMatches);
  
    //fetching live score
    const liveScoreResponse = await new LiveScoreService().getLiveScore();
    const sortedLiveScoreMatches = sortArrayByProperty(liveScoreResponse.data,"name")
    setLiveScoreMatches(sortedLiveScoreMatches);
    console.log(liveScoreResponse.data);

  }


  useEffect(() => {
    fetchData();
  }, [])

  return (

    <div className="h-full shadow-lg rounded-lg p-4 mb-4 bg-white ">
      <div className="flex items-center justify-start">
        <Link className='text-xl  font-normal text-body-500 hover:text-body-300' href='/dashboard/matches'>
          Matches
        </Link>
        <Icon name='rightArrowIcon' className="size-5" />
        <h3 className="text-xl font-semibold text-start text-body-950 ">
          Add Match
        </h3>
      </div>
      <DataForm2
        sections={matchSections}
        dataItem={{}}
        onClick={onUpdateClick}
        
      />
    </div>

  );
};

export default AddMatches;
