"use client"
import React, { ChangeEvent, useEffect, useState } from "react";


const SelectBox: React.FC<InputControlProps> = (props) => {
  const [list, setList] = useState<any[]>();

  const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const text = event.target.value;
    if (props.callback !== undefined) {
      props.callback(props.name, text, props.index);

    }
  };


  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (props.callback !== undefined) {
      props.callback(props.name, text, props.index);
    }
  };


  useEffect(() => {

    async function fetchData() {
      if (props.dataset) {
        setList(props.dataset);
      }
      // else if (props.dataSource && props.dataSource != "" && props.serviceClient) {

      //   let dataSource = props.dataSource;
      //   let response: QueryResponse<any>;
      //   if (props.dataSourceDependsOn) {
      //     if (props.dependentValue) {
      //       dataSource = dataSource.replace(`{${props.dataSourceDependsOn}}`, props.dependentValue)
      //       response = await props.serviceClient!.get(dataSource);
      //       setList(response.result);
      //     }
      //     else {
      //       setList([]);
      //     }
      //   }
      //   else {
      //     response = await props.serviceClient!.get(dataSource);
      //     setList(response.result);
      //   }
      // }
      // else {
      //   setList([]);
      // }
    }
    fetchData();
  }, [props.dataSource, props.dependentValue, props.dataset]);






  let value = "";
  if (props.value !== undefined && props.value !== null) {
    value = props.value;
  }
  const autoFocus = props?.attributes?.autoFocus || false;
  return (
    <React.Fragment>
      <label className="block mb-1">
        <span className="text-sm font-medium text-slate-700">
          {props?.attributes?.label}
        </span>

        {list && list.length <= 0 && (
          <input
            type="text"
            name={props.name}
            id={props.name}
            value={value}
            autoFocus={autoFocus}
            onChange={textChangeHandler}
            required={props?.attributes?.required}
            placeholder={props?.attributes?.placeholder}
            maxLength={props?.attributes?.maxLength}
            pattern={props?.attributes?.pattern}
            disabled={props?.attributes?.readOnly}
            minLength={props?.attributes?.minLength}
            className="peer mt-1 py-1.5 block w-full rounded border border-body-500 shadow-sm focus:border-primary-700 focus:ring focus:ring-primary-900 focus:ring-opacity-50"
          />
        )}

        {list && list.length > 0 && (
          <select
            name={props.name}
            id={props.name}
            value={value}
            autoFocus={autoFocus}
            onChange={selectChangeHandler}
            required={props?.attributes?.required}
            disabled={props?.attributes?.readOnly}
            className={`peer mt-1 py-1.5 block w-full rounded border-2 border-primary-900 shadow-sm focus:border-primary-500 transition-all duration-300 ease-in-out ${props.className}`}
          >
            <option className="" value="">
              {props?.attributes?.placeholder || "Select"}
            </option>

            {list &&
              list.map((item, i) => {
                return (
                  <option
                    key={item[props!.dataKeyFieldName!]}
                    className="fac-select-option"
                    value={item[props!.dataKeyFieldName!]}
                  >
                    {item[props!.dataTextFieldName!]}
                  </option>
                );
              })}
          </select>
        )}

        <p className="text-start hidden group-[.validated]:peer-invalid:block mt-1 text-alert text-sm">
          {props?.attributes?.errorMessage ? props.attributes.errorMessage : ""}
        </p>
      </label>
    </React.Fragment>

  )
}

export default SelectBox;
