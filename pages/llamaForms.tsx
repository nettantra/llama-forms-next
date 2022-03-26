import { Fragment, useEffect, useState } from "react"; 
import DropDownField from "../components/Fields/DropDownField";
import InputField from "../components/Fields/InputField";
import RadioField from "../components/Fields/RadioField";
import TextAreaField from "../components/Fields/TextAreaField";
import CheckBoxField from "../components/Fields/CheckBoxField";
import FileUploadField from "../components/Fields/FileUploadField";
import MultipleForm from "../components/Form/multipleForm";
import SingleForm from "../components/Form/singleForm";


export const LlamaForms = (props: any) => {
    const [fields, setFields] = useState({});
    const [fieldList, setFieldList] = useState([])
    const [data, setData] = useState({})
    const [wizardStepSet, setWizardStepSet] = useState({})

    //loop through the fields and set the data
    const customizeData = (fields:any) => {
        let tempData = {} as any
        let list = [] as any
        let wizardSet = {}
        for (let key in fields) {
            tempData[key] = {value:fields[key].value || "", error: false}
            list.push(key)
            try {
                wizardSet[fields[key].step].push(key)
            } catch {
                wizardSet[fields[key].step]=[key]
            }
        }
        setData(tempData)
        setFieldList(list)
        setWizardStepSet(wizardSet)
    }

    const structureData = () => {
        if (!props.schema) return
        let tempFields = {} as any
        const schema = props.schema.properties || {}
        // console.log(schema)
        const options = props.options.fields || {}
        const value = props.data || {}
        //loop in schema object
        for (let key in schema) {
            tempFields[key] = {
                ...options[key],
                step: schema[key].step ? schema[key].step : 1,
                type: options[key] && options[key].type || "",
                values: schema[key].enum || "",
                required: schema[key].required || false,
                value: value[key] || "",
            }
        }
        setFields(tempFields)
        customizeData(tempFields)
    }



    useEffect(() => {
        structureData()
    }, [])


    const formBuilder = () => {
        if (!props.schema) return
        if (props.schema.wizard) {
            return (
                <MultipleForm
                    parentState={data}
                    parentSetState={setData}    
                    fields={fields}
                    wizardStepSet={wizardStepSet}
                    onSubmit={props.onSubmit}
                />
            )
        }
        return (
            <SingleForm
                parentState={data}
                parentSetState={setData}
                renderList={fieldList}
                fields={fields}
                onSubmit={props.onSubmit}
            />
        )

    }

    const renderForm = (type: any, index: any, handleData: any, properties: any, data: any, key: any) => {
        // switch case for the different field types
        switch (type) {
            case 'dropdown': {
                return (
                    <Fragment key={index}>
                        <DropDownField
                            handleData={handleData}
                            properties={properties}
                            parentState={data}
                            name={key}
                        />
                    </Fragment>
                )
            }
            case 'radio': {
                return (
                    <Fragment key={index}>
                        <RadioField
                            handleData={handleData}
                            properties={properties}
                            parentState={data}
                            name={key}
                        />
                    </Fragment>
                )
            }
            case 'checkbox': {
                return (
                    <Fragment key={index}>
                        <CheckBoxField
                            handleData={handleData}
                            properties={properties}
                            parentState={data}
                            name={key}
                        />
                    </Fragment>
                )
            }
            case 'file': {
                return (
                    <Fragment key={index}>
                        <FileUploadField
                            handleData={handleData}
                            properties={properties}
                            parentState={data}
                            name={key}
                        />
                    </Fragment>
                )
            }
            case 'textarea': {
                return (
                    <Fragment key={index}>
                        <TextAreaField
                            key={key}
                            handleData={handleData}
                            properties={properties}
                            parentState={data}
                            name={key}
                        />
                    </Fragment>
                )
            }
            default: {
                return (
                    <Fragment key={index}>
                        <InputField
                            handleData={handleData}
                            properties={properties}
                            parentState={data}
                            name={key}
                        />
                    </Fragment>
                )
            }
        }
    }

    return (
        <>
            <div style={{ backgroundColor: "#FAFAFA", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
                <h1 style={{fontFamily:'Nunito Sans', margin:"20px 0px"}}>{props.schema?.title}</h1>
                <h2 style={{fontFamily:'Nunito Sans', fontWeight:"400", margin:"0px 0px 30px 0px"}}>{props.schema?.description}</h2>
                <form onSubmit={(e) => { e.preventDefault()}} style={{minWidth:'100%', padding:"0px 20px"}}>
                    {formBuilder()}
                </form>
            </div>
        </>
    )
}
