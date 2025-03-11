import React, { useState, useEffect, useCallback, useReducer, useRef, useMemo } from 'react';
import FormReducer, { FORM_INITIAL_UPDATE, FORM_INPUT_UPDATE, FormState } from '@/core/forms/FormReducer';
import Button from "./Button";
import InputControl from "../controls/edit/InputControl";
import { InputControlType } from '../controls/edit/InputControlType';
import ServiceClient from '../clients/ServiceClient';
import { ButtonTypes } from './ButtonTypes';
import * as ChildForm from '../forms/GridFormReducer';
import DataFormChildSection from './DataFormChildSection';
interface DataFormConfiguration {
    dataItem: any,
    onClick?: (formState: FormState<any>) => Promise<ActionResponse<any>>;
    onDelete?: (formState: FormState<any>) => Promise<ActionResponse<any>>;
    sections?: DataFormSection[];
    onDeleteConfirmationMessage?:string
    onDeleteClassname?:string
    deleteButtonTitle?:string
}



const DataForm2: React.FC<DataFormConfiguration> = (props) => {
    const formRef = useRef<HTMLFormElement>(null);

    const initialState: FormState<any> = {
        inputValues: {
        },
    };

    const childInitialState: ChildForm.GridFormState<any> = {
        inputValues: []
    };

    const [formState, dispatch] = useReducer(FormReducer<any>, initialState);
    const handleInputChange: InputChangeCallback<any> = useCallback((name, value, identifier) => {
        dispatch({ type: FORM_INPUT_UPDATE, name, value });
    }, [dispatch]);



    const handleChildSectionChangeCallback: ChildItemsChangeCallback = useCallback((params) => {
        dispatch({ type: params.actionType, name: params.name, value: params.value, childName: params.sectionName, rowIndex: params.rowIndex });
    }, [dispatch]);


    const onValidate = async () => {
        if (formRef.current && !formRef.current.checkValidity()) {
            formRef.current.classList.add("validated");
            return false;
        } else {
            return true;
        }
    };

    const onClick = useCallback(async () => {
        if (props.onClick) {
            return await props.onClick(formState);
        }
        else {
            return { isSuccessful: true };
        }

    }, [formState, props]);

    const onDelete = useCallback(async () => {
        if (props.onDelete) {
            return await props.onDelete(formState);
        }
        else {
            return { isSuccessful: true }
        }
    }, [formState, props]);

    useEffect(() => {
        if (props.dataItem) {
            dispatch({
                type: FORM_INITIAL_UPDATE,
                values: props.dataItem,
                name: "all"
            });
        }
    }, [props.dataItem]);


    function getNestedProperty<T>(obj: T, path: string): any {
        if (path.includes('.')) {
            return path.split('.').reduce((prev: any, curr: string) => prev ? prev[curr] : null, obj);
        } else {
            return obj[path as keyof T];
        }
    }




    function evaluateVisibility(context: any, expression?: string): boolean {
        if (expression === null || expression === undefined) {
            return true;
        }
        try {
          
            const evaluator = new Function('context', `return ${expression};`);
            return evaluator(context);
        } catch (error) {
            console.error("Error evaluating expression:", error);
            return false;
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault(); 
                onClick(); 
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClick]);

    return (
        <React.Fragment>
            <div className="flex-grow flex flex-col justify-between mt-4  ">
                <form className="group space-y-6 pb-6 "  noValidate ref={formRef}>
                    <div className='flex flex-col gap-6'>
                        {props.sections?.map((section, sectionIndex) => {
                            return (
                                <React.Fragment key={sectionIndex}>
                                    {!section.isChildSection && <div className=' rounded-lg bg-white shadow border-neutral-200 border px-8 py-6 '>
                                        {section.sectionTitle && <div className='mb-4 text-lg font-medium text-body-950'>{section.sectionTitle}</div>}

                                        {section.sectionRows?.map((sectionRow, sectionRowIndex) => {
                                            const elementsCount = sectionRow.elements.length;
                                            let isVisible = true;
                                            if (sectionRow.visible) {
                                                isVisible = evaluateVisibility(formState.inputValues, sectionRow.visible);
                                            }

                                            return (
                                                <React.Fragment key={sectionRowIndex}>
                                                    {isVisible && <div className='lg:flex gap-14 flex-1 mb-4 '>
                                                        {sectionRow.elements.map((field, index) => {

                                                            return (
                                                                <div key={field.name} className={sectionRow.grow ? "grow" : ""}>
                                                                    <InputControl
                                                                        name={field.name}
                                                                        controlType={field.controlType}
                                                                        value={getNestedProperty(formState.inputValues, field.name)}
                                                                        callback={handleInputChange}
                                                                        dataSourceDependsOn={field.dataSourceDependsOn}
                                                                        dependentValue={field.dataSourceDependsOn ? formState.inputValues[field.dataSourceDependsOn] : ""}
                                                                        dataSource={field.dataSource}
                                                                        dataset={field.dataset}
                                                                        dataKeyFieldName={field.dataKeyFieldName}
                                                                        dataTextFieldName={field.dataTextFieldName}
                                                                        attributes={field.attributes}
                                                                        //serviceClient={props.serviceClient}
                                                                        assetsUploadPath={props.dataItem ? props.dataItem["assetsUploadPath"] : null}
                                                                    />
                                                                </div>
                                                            )
                                                        })}



                                                    </div>}
                                                </React.Fragment>
                                            )
                                        })
                                        }
                                        <div>
                                            {section.childSections?.map((childSection, childSectionIndex) => {
                                                return (
                                                    <div key={childSectionIndex}>
                                                        {childSection.name &&
                                                            evaluateVisibility(formState.inputValues, childSection.visible) &&
                                                            <DataFormChildSection
                                                                section={childSection}
                                                                childItems={formState.inputValues[childSection.name]}
                                                                callback={handleChildSectionChangeCallback} />}
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    </div>}
                                    {/* {section.isChildSection && section.name && evaluateVisibility(formState.inputValues, section.visible) && <div>
                                       <DataForm2ChildSection section={section} childItems={formState.inputValues[section.name]} callback={handleChildSectionChangeCallback}/>
                                    </div>} */}
                                </React.Fragment>
                            )
                        })}
                    </div>

                </form>
                <div className="flex px-6 py-3 mt-2 mb-2 justify-end  items-center gap-10">
                    <div>
                        {props.onDelete && <Button
                            ButtonType={ButtonTypes.Delete}
                            onClick={onDelete}
                            showToast={true}
                            className={props.onDeleteClassname || ""}
                            confirm={true}
                            confirmationMessage={props.onDeleteConfirmationMessage}
                        >
                            {props.deleteButtonTitle || "Delete"}
                        </Button>
                        }
                    </div>
                    <div>
                        {props.onClick && <Button
                            onValidate={onValidate}
                            onClick={onClick}
                            showToast={true}
                        >Save Changes</Button>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DataForm2;
