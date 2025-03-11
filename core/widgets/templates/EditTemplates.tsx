"use client"
import TemplateService from '@/core/clients/TemplateService'
import DataForm2 from '@/core/components/DataForm'
import { InputControlType } from '@/core/controls/edit/InputControlType'
import { FormState } from '@/core/forms/FormReducer'
import Icon from '@/core/icons/Icon'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'


const EditTemplate: React.FC<WidgetProps> = (props) => {

    const predictionTemplateId = props.params?.predictionTemplateId;
    const [predictionTemplate, setPredictionTemplate] = useState<PredictionTemplateData>();
    const [categories, setCategories] = useState<CategoryData[]>();
    const [matchTypes, setMatchTypes] = useState<MatchTypeData[]>();

    const sections: DataFormSection[] = [
        {
            sectionRows: [
                {
                    grow: true,
                    elements: [
                        {
                            name: "predictionTemplateId",
                            controlType: InputControlType.lineTextInput,
                            attributes: {
                                label: "Id",
                                readOnly: true
                            },
                        },
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
                name: "predictionTemplateQuestions",
                sectionRows: [
                    {
                        grow: true,
                        elements: [
                            {
                                name: "categoryId",
                                controlType: InputControlType.select,
                                dataset: categories,
                                dataKeyFieldName: "categoryId",
                                dataTextFieldName: "categoryTitle", attributes: {
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

    const onUpdateClick = useCallback(async (formState: FormState<UpdatePredictionTemplateRequest>) => {
        let response = await new TemplateService().updatePredictionTemplate(formState.inputValues);
        return redirect('/dashboard/templates')
    }, []);

    const templateDelete = useCallback(
        async (formState: FormState<DeletePredictionTemplateRequest>): Promise<ActionResponse<any>> => {
            const request: DeletePredictionTemplateRequest = {
                predictionTemplateId: Number(predictionTemplateId),
            };
            const response = await new TemplateService().deletePredictionTemplate(request);
            if (response.isSuccessful) {
                return redirect('/dashboard/templates');
            }
            return response;

        },
        [predictionTemplateId]
    );

    const fetchInitialData = async (templateId?: any) => {
        if (templateId) {

            const [templateResponse, matchTypeResponse, categoriesResponse] = await Promise.all([
                new TemplateService().getPredictionTemplateById(templateId),
                new TemplateService().getAllMatchType(),
                new TemplateService().getAllCategories()

            ])
            if (templateResponse.isSuccessful) {
                setPredictionTemplate(templateResponse.result);
            }
            if (matchTypeResponse.isSuccessful) {
                setMatchTypes(matchTypeResponse.result);
            }
            if (categoriesResponse.isSuccessful) {
                setCategories(categoriesResponse.result);
            }
        }
    }

    useEffect(() => {
        fetchInitialData(predictionTemplateId);
    }, [predictionTemplateId, onUpdateClick]);


    return (

        <div className='h-full shadow-lg rounded-lg p-4 mb-4 bg-white max-h-full overflow-y-scroll'>
            <div className="flex items-center justify-start">
                <Link className='text-xl  font-normal text-body-500 hover:text-body-300' href='/dashboard/templates'>
                    Template
                </Link>
                <Icon name='rightArrowIcon' className="size-5" />
                <h3 className="text-xl font-semibold text-start text-body-950 ">
                    Edit Template
                </h3>
            </div>
            <DataForm2
                sections={sections}
                dataItem={predictionTemplate}
                onClick={onUpdateClick}
                onDelete={templateDelete}
                onDeleteConfirmationMessage='Are you sure you want to delete this template?'
            />
        </div>
    )
}

export default EditTemplate
