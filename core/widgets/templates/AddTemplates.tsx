"use client"
import TemplateService from '@/core/clients/TemplateService'
import DataForm2 from '@/core/components/DataForm'
import { InputControlType } from '@/core/controls/edit/InputControlType'
import { FormState } from '@/core/forms/FormReducer'
import Icon from '@/core/icons/Icon'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'


const AddTemplates: React.FC<WidgetProps> = (props) => {

    const [matchTypes, setMatchTypes] = useState<MatchTypeData[]>();
    const [categories, setCategories] = useState<CategoryData[]>();


    const sections: DataFormSection[] = [
        {
            sectionRows: [
                {
                    grow: true,
                    elements: [
                        {
                            name: "templateTitle",
                            controlType: InputControlType.lineTextInput,
                            attributes: {
                                label: "Template Name",
                                required: true,
                                errorMessage: "This is a required field"
                            },
                        },
                        {
                            name: "matchTypeId",
                            controlType: InputControlType.select,
                            dataset: matchTypes,
                            dataKeyFieldName: "matchTypeId",
                            dataTextFieldName: "matchTypeTitle",
                            attributes: {
                                label: "Match Type",
                                required: true,
                                errorMessage: "This is a required field"
                            },
                        },
                    ]
                },
            ],
            childSections: [{
                name: "PredictionTemplateQuestions",
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
                        ]
                    },
                ]
            }],
        },
    ]

    const onUpdateClick = useCallback(async (formState: FormState<AddPredictionTemplateRequest>) => {
        let response = await new TemplateService().addPredictionTemplate(formState.inputValues);
        return redirect('/dashboard/templates')
    }, []);

    const fetchInitialData = async () => {

        const [matchTypeResponse, categoriesResponse] = await Promise.all([
            new TemplateService().getAllMatchType(), new TemplateService().getAllCategories()
        ])

        if (matchTypeResponse.isSuccessful) {
            setMatchTypes(matchTypeResponse.result);
        }

        if (categoriesResponse.isSuccessful) {
            setCategories(categoriesResponse.result);
        }
    }

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <div className='h-full p-4 bg-white max-h-full overflow-y-scroll'>
            <div className='h-full  rounded-lg  bg-white'>
                <div className="flex items-center justify-start">
                    <Link className='text-xl  font-normal text-body-500 hover:text-body-300' href='/dashboard/templates'>
                        Template
                    </Link>
                    <Icon name='rightArrowIcon' className="size-5" />
                    <h3 className="text-xl font-semibold text-start text-body-950 ">
                        Add Template
                    </h3>
                </div>
                <DataForm2
                    sections={sections}
                    dataItem={{}}
                    onClick={onUpdateClick}
                />

            </div>
        </div>
    )
}

export default AddTemplates
