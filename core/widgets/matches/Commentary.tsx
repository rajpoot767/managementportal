"use client";

import MatchService from "@/core/clients/MatchService";
import Icon from "@/core/icons/Icon";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const specialCommentary = [
  { label: "Wicket", value: "Wicket", color: "bg-alternate-700" },
  { label: "Free Hit", value: "Free Hit", color: "bg-success-600" },
  { label: "No Ball", value: "No Ball", color: "bg-alternate-500" },
  { label: "Wide", value: "Wide", color: "bg-body-500" },
];

const buttonData = [
  { title: 'Runs', values: [0, 1, 2, 3, 4, 6], cssClass: '' },
  { title: 'Wide', values: ['Wd1', 'Wd2', 'Wd3', 'Wd4'], cssClass: ' ' },
  { title: 'Byes', values: ['B1', 'B2', 'B3', 'B4'], cssClass: ' ' },
  { title: 'Leg Byes', values: ['LB1', 'LB2', 'LB3', 'LB4'], cssClass: ' ' },
];

const Commentary: React.FC<WidgetProps> = (props) => {

  const matchId = Number(props.params?.matchId);
  const [liveCommentary, setLiveCommentary] = useState<string | number  >("");
  const [commentaryId, setCommentaryId] = useState<number | undefined>();
  const [match, setMatch] = useState<CommentaryMatchData>();
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [formCommentary, setFormCommentary] = useState<string>("");
  const [formHasText, setFormHasText] = useState(false);



  const keyMap = useMemo(() => new Map([
    ['n+1', 'N1'],
    ['n+2', 'N2'],
    ['n+3', 'N3'],
    ['n+4', 'N4'],
    ['n+6', 'N6'],
    ['f', 'Free hit'],
    ['o', 'Wicket'],
    ['0', '0'],
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['6', '6'],
    ['w+1', 'Wd1'],
    ['w+2', 'Wd2'],
    ['w+3', 'Wd3'],
    ['w+4', 'Wd4'],
    ['l+1', 'LB1'],
    ['l+2', 'LB2'],
    ['l+3', 'LB3'],
    ['l+4', 'LB4'],
    ['b+1', 'B1'],
    ['b+2', 'B2'],
    ['b+3', 'B3'],
    ['b+4', 'B4'],
  ]), []);

 


  const handleCommantary = useCallback(async (input: string | number) => {
    
    const commentaryTextValue = input.toString();
    const request: UpdateCommentaryRequest = {
      matchId: matchId,
      matchCommentaries: [
        {
          commentaryId: commentaryId ?? 0,
          commentaryText: commentaryTextValue,
        },
      ],
    };

    const response = await new MatchService().addOrUpdateCommentaries(request);
    if (response.isSuccessful) {
      setLiveCommentary(commentaryTextValue);
    }

  }, [matchId, commentaryId, liveCommentary]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {



      if (formHasText == true) return;

      setPressedKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.add(e.key.toLowerCase());
        const keyCombination = Array.from(newKeys).join("+");
        const scoreValue = keyMap.get(keyCombination) || keyMap.get(e.key.toLowerCase());
        if (scoreValue) {

          handleCommantary(scoreValue);
        }
        return newKeys;
      });
    },
    [keyMap, handleCommantary, formHasText]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      setPressedKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.delete(e.key.toLowerCase());
        return newKeys;
      });
    },
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);


  const fetchInitialData = useCallback(async (matchId?: number) => {
    if (!matchId) return;

    const commentaryResponse = await new MatchService().getCommentaryByMatchId(matchId);
    if (commentaryResponse.isSuccessful) {
      const result = commentaryResponse?.result;
      setMatch(result);

      if (result?.commentaries?.length === 0) {
        setCommentaryId(0);
      } else {
        setCommentaryId(result?.commentaries[0]?.commentaryId);
      }

    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formValue = e.target.value;
    const trimValue = formValue.replace(/^\s+/, '');
    setFormCommentary(trimValue);
    setFormHasText(formValue.length >= 0);
  };

  const handleOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormHasText(true);
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormHasText(false);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formCommentary === "") {
        setFormHasText(false);
        return
      }
      await handleCommantary(formCommentary);
      setFormCommentary("");
      setFormHasText(false);

    },
    [formCommentary, handleCommantary]
  );


  useEffect(() => {
    fetchInitialData(matchId);

  }, [liveCommentary]);



  return (
    <div className="p-4 space-y-3  ">

      {/* Title Section */}
      <div className="flex items-center justify-start">
        <Link className='text-lg font-normal text-body-500 hover:text-body-300' href='/dashboard/matches'>
          Matches
        </Link>
        <Icon name='rightArrowIcon' className="size-5" />
        <h3 className="text-lg font-semibold text-start text-body-950">
          Commentary
        </h3>
      </div>

      {/* Match Info Section */}
      <div className="flex px-2 items-center justify-between rounded-md">
        <h3 className="text-lg font-semibold text-body-600">
          Match Name : <span className="font-normal text-body-800">{match?.matchName}</span>
        </h3>
        <h3 className="text-lg font-semibold text-body-600">
          Match Type : <span className="font-normal text-body-800">{match?.matchTypeTitle}</span>
        </h3>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col space-y-2">
        <div className="grid grid-cols-2   gap-2">
          {/* Live Commentary */}
          <div className=" bg-white p-4 rounded-md shadow-lg drop-shadow-2xl">
            <h3 className="text-lg font-semibold text-body-800 mb-4 border-b pb-2 border-body-200">
              Live Commentary
            </h3>
            <div className="flex">
              {/* Live Commentary */}
              <div className="flex justify-center items-center w-full  bg-body-100 rounded-md  text-center p-2   ">
                {/* <h3 className="text-lg font-semibold text-body-800  ">Live Commentary</h3> */}
                <div className="font-sans font-semibold text-2xl text-primary-900 antialiased tracking-wide leading-relaxed">
                  {liveCommentary ? liveCommentary : match?.commentaries[0]?.commentaryText || "-"}
                </div>
              </div>
              {/* Previous Commentary */}
              {/* <div className="flex-1 bg-body-100 text-center p-2 rounded-md  ">
                <h3 className="text-lg font-semibold text-body-800 mb-2">Previous Commentary</h3>
                <span className=" font-normal text-lg text-body-900">{prevCommentary || 'No commentary available'}</span>
              </div> */}
            </div>
            {/* <p className="text-base text-body-900 mt-2 text-right">
              modified: {modefiedDate?.toLocaleString() || 'N/A'}
            </p> */}
          </div>

          {/* Input Form */}
          <div className="bg-white p-4 rounded-md shadow-lg drop-shadow-2xl  ">
            <h3 className="text-lg font-semibold text-body-800 mb-4 border-b pb-2 border-body-200">
              Add Commentary
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  name="commentaryField"
                  placeholder="Write commentary here..."
                  value={formCommentary}
                  onChange={handleChange}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm text-body-700 focus:outline-none focus:ring focus:ring-primary-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-6 mt-4 bg-primary-600 text-white font-medium py-2 rounded-lg hover:bg-primary-700 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Commentary
              </button>
            </form>
          </div>
        </div>


        {/* Select Ball Type and Runs */}

        <div className="w-full bg-body-100  p-4 rounded-md shadow-lg ">

          <div className="grid grid-cols-2  gap-2">
            {/* Common Buttons */}

            <div className="space-y-1  p-2 rounded-md ">


              {buttonData.map((button) => (
                <div key={button.title} className="flex px-4 flex-col space-y-1">
                  <h3 className="text-base font-semibold text-body-800">{button.title}</h3>
                  <div className="flex space-x-4">
                    {button.values.map((button) => (
                      <button
                        key={button}
                        onClick={() => handleCommantary(button)}
                        className="size-10 text-sm font-normal drop-shadow-lg bg-primary-600 text-body-50 rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 hover:bg-primary-700 antialiased tracking-wide leading-relaxed"
                      >
                        {button}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Special Buttons */}
            <div className="space-y-2 p-2 rounded-md" >
              {/* <h3 className="text-lg px-2 text-body-700 font-semibold mb-2">Special Commentary</h3> */}
              <div className="grid grid-cols-4 gap-4 py-2 ">
                {specialCommentary.map((button) => (
                  <button
                    key={button.value}
                    onClick={() => handleCommantary(button.value)}
                    className={`py-2 drop-shadow-lg  rounded-md text-body-50 text-base  shadow-md ${button.color} hover:opacity-90`}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
export default Commentary




