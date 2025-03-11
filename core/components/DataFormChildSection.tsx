import React, { useCallback } from 'react';

import InputControl from "../controls/edit/InputControl";

import { ButtonTypes } from './ButtonTypes';
import ClientButton from './ClientButton';
// import Icon from '../svg/Icon';
import { FORM_CHILD_INPUT_UPDATE, FORM_CHILD_ROW_ADD } from '@/core/forms/FormReducer';
import Icon from '../icons/Icon';
interface ChildFormConfiguration {
    section: DataFormSection;
    childItems: any[];
    callback: ChildItemsChangeCallback;
}


const DataForm2ChildSection: React.FC<ChildFormConfiguration> = (props) => {

    const handleChildInputChange: InputChangeCallback<any> = useCallback((name, value, index) => {
        props.callback({
            sectionName: props.section.name!,
            actionType: FORM_CHILD_INPUT_UPDATE,
            name: name,
            value: value,
            rowIndex: index!
        });
    }, [props]);




    const onAddRow = useCallback(() => {
        props.callback({
            sectionName: props.section.name!,
            actionType: FORM_CHILD_ROW_ADD,
            name: "all",
            value: null,
            rowIndex: -1
        });

    }, [props]);



    const onDeleteRow = useCallback((index: number) => {
        props.callback({
            sectionName: props.section.name!,
            actionType: FORM_CHILD_INPUT_UPDATE,
            name: "isDeleted",
            value: true,
            rowIndex: index
        });

    }, [props]);


    return (
        <React.Fragment>
            <div className=' rounded  border-neutral-200 border px-6 py-4 '>
                {props.section.sectionTitle && <div className='mb-4 text-lg font-medium text-body-950'>{props.section.sectionTitle}</div>}
                <div className="flex-grow flex flex-col justify-between ">
                    <div className="flex flex-col  justify-between gap-2 ">
                        <div >
                            <table className="w-full border-separate divide-y divide-gray-200  ">
                                <thead className="">
                                    {props.section.sectionRows.map((sectionRow, sectionRowIndex) => {
                                        return (
                                            <tr key={sectionRowIndex} className=''>

                                                {sectionRow.elements.map((field, index) => {

                                                    return (
                                                        <th key={field.name} className={"py-3 font-normal text-left "}>
                                                            {field.attributes?.label}
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </thead>

                                <tbody className="divide-y divide-gray-200   ">
                                    {props.childItems?.map((item, rowIndex) => {
                                        return (
                                            <React.Fragment key={rowIndex}>
                                                {!item.isDeleted &&
                                                    props.section.sectionRows.map((sectionRow, sectionRowIndex) => {
                                                        return (
                                                            <tr key={sectionRowIndex} className=''>
                                                                {sectionRow.elements.map((field, index) => {
                                                                    return (
                                                                        <td key={field.name}><div className="flex-1">
                                                                            <div className='w-11/12'>
                                                                                <InputControl
                                                                                    index={rowIndex}
                                                                                    name={field.name}
                                                                                    controlType={field.controlType}
                                                                                    value={item[field.name]}
                                                                                    callback={handleChildInputChange}
                                                                                    attributes={{ ...field.attributes, label: "" }}
                                                                                    dataset={field.dataset}
                                                                                    dataKeyFieldName={field.dataKeyFieldName}
                                                                                    dataTextFieldName={field.dataTextFieldName}



                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        </td>
                                                                    )
                                                                })}
                                                                <td>
                                                                    
                                                                        <button
                                                                            className="bg-alternate-700 text-white p-2 rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 active:bg-red-700 transition duration-300 ease-in-out"
                                                                            onClick={() => {
                                                                                onDeleteRow(rowIndex);
                                                                            }}
                                                                        >
                                                                            <Icon name="deleteIcon" className="w-5 h-5" />
                                                                        </button>
                                                                       
                                                                

                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </React.Fragment>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='ml-1 '>
                            <ClientButton
                                ButtonType={ButtonTypes.Link}
                                onClick={onAddRow}
                                className='text-primary-950 hover:text-primary-700'
                            >Add new</ClientButton>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}

export default DataForm2ChildSection;
